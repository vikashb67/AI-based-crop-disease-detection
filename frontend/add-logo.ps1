param(
  [string]$SourcePath
)

if (-not $SourcePath) {
  Write-Host "Usage: .\add-logo.ps1 -SourcePath 'C:\path\to\your\image.png'"
  $SourcePath = Read-Host "Enter full path to your logo image (PNG/JPG)"
}

$dest = Join-Path -Path $PSScriptRoot -ChildPath "public\logo.png"
if (-not (Test-Path $SourcePath)) {
  Write-Error "Source file not found: $SourcePath"
  exit 1
}

Copy-Item -Path $SourcePath -Destination $dest -Force
Write-Host "Logo copied to: $dest"
Write-Host "If your dev server is running, refresh the browser (Ctrl+F5) to see the updated logo."