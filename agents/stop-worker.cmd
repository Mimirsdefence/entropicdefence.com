@echo off
REM ---------------------------------------------------------------------------
REM  Entropic Defence - stoppa arbetaren pa den har datorn.
REM
REM  1. Satter logs\STOP sa att start-worker.cmd slutar starta om.
REM  2. Stoppar arbetarprocessen direkt (pid ur logs\worker.pid).
REM
REM  Starta igen: ta bort logs\STOP och kor sedan start-worker.cmd.
REM
REM  Obs: delayed expansion behovs - annars laser batchfilen pid-variabeln
REM  innan raden har hunnit kora.
REM ---------------------------------------------------------------------------
setlocal enabledelayedexpansion
cd /d "%~dp0."

if not exist "logs" mkdir "logs"

echo stoppad %date% %time%> "logs\STOP"

if exist "logs\worker.pid" (
  set /p WORKERPID=<"logs\worker.pid"
  taskkill /pid !WORKERPID! /f >nul 2>&1
  del "logs\worker.pid" >nul 2>&1
  echo Stoppade arbetaren ^(pid !WORKERPID!^).
) else (
  echo Ingen pidfil hittades - arbetaren kor formodligen inte.
)

echo.
echo Klart. logs\STOP ligger kvar, sa arbetaren startar inte om av sig sjalv.
echo Starta igen:  del logs\STOP   och kor sedan start-worker.cmd
