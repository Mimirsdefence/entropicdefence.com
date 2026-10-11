@echo off
REM ---------------------------------------------------------------------------
REM  Entropic Defence - hall mejlagenterna levande pa den har datorn.
REM
REM  Startas automatiskt vid inloggning och startar om arbetaren om den dor.
REM  Allt skrivs till agents\logs\worker.log.
REM
REM  LAGE: SKARPT - raden i :loop anvander --send, sa agenterna svarar kunder.
REM        Vill du torrkorning igen: ta bort "-- --send" pa samma rad.
REM        Andra bara pa ett stalle.
REM
REM  Stoppa: kor stop-worker.cmd (den satter logs\STOP och stoppar arbetaren).
REM          Ta bort logs\STOP och kor den har filen igen for att starta om.
REM ---------------------------------------------------------------------------
setlocal
cd /d "%~dp0"

if not exist "logs" mkdir "logs"

where npm >nul 2>&1
if errorlevel 1 (
  echo [%date% %time%] FEL: npm hittades inte i PATH - startar inte >> "logs\worker.log"
  exit /b 1
)

REM Vantan mellan omstarter. Absolut sokvag till System32: annars kan en annan
REM "timeout" (t.ex. Git Bashs) hamna forst i PATH och da blir vantan noll.
:loop
if exist "logs\STOP" (
  echo [%date% %time%] STOP-filen finns - avslutar utan att starta om >> "logs\worker.log"
  exit /b 0
)
echo [%date% %time%] startar arbetaren >> "logs\worker.log"
call npm run worker -- --send >> "logs\worker.log" 2>&1
echo [%date% %time%] arbetaren slutade - startar om om 30 sekunder >> "logs\worker.log"
"%SystemRoot%\System32\ping.exe" -n 31 127.0.0.1 >nul 2>&1
goto loop
