::Very basic launcher script to use while bot in running on Windows for testing. Not meant for production use

@echo off
cd /D "%~dp0"
title %~dp0
mode 120, 40
cls

echo [R]un bot
echo [T]rain bot
echo [L]earn based off sent messages
choice /N /C RTL
set "startupChoice=%errorlevel%"

if "%startupChoice%" == "1" (
	cls
	echo Started %date% @ %time% >> log.txt
	echo Started %date% @ %time%
	goto run
)
if "%startupChoice%" == "2" goto train
if "%startupChoice%" == "3" goto learn

echo Unknown selection
pause
exit

:run
	node bot.js >> log.txt & set "exitCode=%errorlevel%"
	if "%exitCode%" == "1234" exit
	echo Restarted %date% @ %time%  with exit code [%exitCode%] >> log.txt
	echo Restarted %date% @ %time%  with exit code [%exitCode%]
	ping 127.1 -n 6 > nul
goto run

:train
	cls
	move "learned.json" "net-backup_%date%_%random%.json"
	type nul > learned.json
	echo Training bot...
	node train.js
	pause
exit

:learn
	cls
	echo Learning based on messages...
	node learn.js >> gatheredTrainingData.json
	ping 127.1 -n 16 > nul
	goto learn
	pause
exit