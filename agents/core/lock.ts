/**
 * Envakt — bara EN arbetare far vara igang samtidigt.
 *
 * Tva samtidiga processer mot samma brevlåda kan svara tva ganger pa samma
 * kundmejl: kunden far dubbelt svar och vi ser ut som en robot. Lasen i
 * mail.ts skyddar inte mot detta — varje IMAP-anslutning har sin egen las,
 * och den ena processen vet inte om den andra.
 *
 * Filen `logs/worker.pid` innehaller pid for den korande arbetaren. Ar piden
 * dod (krasch, stromavbrott, hard kill) ar filen bara skrap och tas over.
 */

import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const agentsRoot = fileURLToPath(new URL('..', import.meta.url))

/** Var pid-filen ligger. */
export const workerLockFile = resolve(agentsRoot, 'logs', 'worker.pid')

/**
 * Pid for en arbetare som faktiskt lever, annars null.
 * En pidfil fran en kraschad process raknas inte.
 */
export function runningWorker(): number | null {
  if (!existsSync(workerLockFile)) return null

  const pid = Number.parseInt(readFileSync(workerLockFile, 'utf8').trim(), 10)
  if (!Number.isInteger(pid) || pid <= 0) return null
  if (pid === process.pid) return pid

  try {
    // Signal 0 skickar ingenting — den fragar bara om processen finns.
    process.kill(pid, 0)
    return pid
  } catch (error) {
    // EPERM = processen finns, men vi far inte signalera den. Det racker.
    return (error as NodeJS.ErrnoException).code === 'EPERM' ? pid : null
  }
}

/**
 * Tar envakten. Kastar om en levande arbetare redan kor.
 * Returnerar en funktion som slapper den (anropas aven automatiskt vid avslut).
 */
export function acquireWorkerLock(): () => void {
  const alive = runningWorker()
  if (alive !== null && alive !== process.pid) {
    throw new Error(
      `Arbetaren kor redan (pid ${alive}). Stoppa den forst — ` +
        'tva samtidiga arbetare kan svara tva ganger pa samma mejl.',
    )
  }

  mkdirSync(dirname(workerLockFile), { recursive: true })
  writeFileSync(workerLockFile, `${process.pid}\n`, 'utf8')

  let released = false
  const release = (): void => {
    if (released) return
    released = true
    // Stada bara om filen fortfarande ar var egen (en efterfoljare kan ha tagit over).
    try {
      if (Number.parseInt(readFileSync(workerLockFile, 'utf8').trim(), 10) === process.pid) {
        rmSync(workerLockFile, { force: true })
      }
    } catch {
      // Filen kan redan vara borta — ingenting att gora.
    }
  }

  process.once('exit', release)
  process.once('SIGINT', release)
  process.once('SIGTERM', release)
  return release
}
