@echo off
chcp 65001 >nul
title IA Generativa - Plataforma Educativa

echo.
echo ========================================
echo   IA GENERATIVA - PLATAFORMA EDUCATIVA
echo ========================================
echo.
echo Iniciando la aplicacion en tu navegador...
echo.

:: Detectar el navegador predeterminado y abrir landing.html
start "" "landing.html"

echo.
echo Si el navegador no se abrio, busca y abre manualmente:
echo %CD%\landing.html
echo.
pause
