import type { Persona, PersonaId } from '../core/types.js'
import { support } from './support.js'
import { security } from './security.js'
import { consultant } from './consultant.js'

export const personas: Record<PersonaId, Persona> = {
  support,
  security,
  consultant,
}

export const allPersonas: Persona[] = Object.values(personas)

export function isPersonaId(value: string): value is PersonaId {
  return value === 'support' || value === 'security' || value === 'consultant'
}

/** Hittar rätt persona utifrån mottagaradressen i ett inkommande mejl. */
export function personaForAddress(address: string): Persona | undefined {
  const target = address.trim().toLowerCase()
  return allPersonas.find((persona) => persona.address === target)
}

export { support, security, consultant }
