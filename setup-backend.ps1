# PowerShell script to set up backend locally on Windows
# Run from project root: .\setup-backend.ps1
param(
  [string]$Bucket = "your-project-id.appspot.com",
  [string]$Python = "python"
)

Set-Location -Path "$(Split-Path -Parent $MyInvocation.MyCommand.Definition)\backend"

if (-Not (Test-Path -Path ".venv")) {
  Write-Host "Creating virtual environment..."
  & $Python -m venv .venv
}

Write-Host "Activating virtual environment..."
. .\.venv\Scripts\Activate

Write-Host "Upgrading pip and installing requirements..."
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

Write-Host "Setting environment variables for local run (only for this session)..."
$env:GCS_BUCKET = $Bucket
$env:FRONTEND_URL = "http://localhost:3000"

Write-Host "To run the backend now: python -m uvicorn app.main:app --host 0.0.0.0 --port 8080 --reload"
Write-Host "Health check available at http://localhost:8080/health"
