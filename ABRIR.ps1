# IA Generativa - Plataforma Educativa
# Ejecutable para abrir la aplicación localmente

Write-Host "========================================" -ForegroundColor Green
Write-Host "  IA GENERATIVA - PLATAFORMA EDUCATIVA" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$htmlFile = Join-Path $scriptDir "landing.html"

Write-Host "Iniciando la aplicacion en tu navegador..." -ForegroundColor Cyan
Write-Host ""

if (Test-Path $htmlFile) {
    Invoke-Item $htmlFile
    Write-Host "Abierto: $htmlFile" -ForegroundColor Green
} else {
    Write-Host "Error: No se encontro landing.html" -ForegroundColor Red
}

Write-Host ""
Write-Host "Presiona cualquier tecla para salir..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
