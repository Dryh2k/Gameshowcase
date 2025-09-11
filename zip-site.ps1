# zip-site.ps1
# Crea un archivio .zip dell'intero sito (Windows PowerShell)
$ErrorActionPreference = "Stop"
$zipName = "genz-arcade-site.zip"
if (Test-Path $zipName) { Remove-Item $zipName -Force }
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory((Get-Location).Path, (Join-Path (Get-Location).Path $zipName))
Write-Host "Creato $zipName"