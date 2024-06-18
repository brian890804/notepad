@echo off
setlocal enableDelayedExpansion

cd %~dp0

SET REMOTE_IP=10.136.219.58
SET /p REMOTE_USER="%REMOTE_IP% User: "

ssh -t %REMOTE_USER%@%REMOTE_IP% -p 8022 /hd2/build/frontend/build.sh dsp-ocf --branch develop -v 0.0.1-20231031
