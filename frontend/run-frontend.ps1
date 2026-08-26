<#
PowerShell helper to prepare and run the frontend locally on Windows.
Usage examples (run from PowerShell):
  # interactive: prompts for Firebase values and runs dev server
  .\run-frontend.ps1 -Mode dev

  # non-interactive: pass values and run build
  .\run-frontend.ps1 -Mode build -ApiBase "http://localhost:8080" -FirebaseProjectId "my-project" -FirebaseApiKey "AAA..." -FirebaseAuthDomain "my-project.firebaseapp.com" -FirebaseStorageBucket "my-project.appspot.com" -FirebaseAppId "1:...:web:..."

Parameters:
  -Mode: dev (start dev server) or build (create production build)
  -ApiBase: backend API base URL (default http://localhost:8080)
  -FirebaseProjectId, -FirebaseApiKey, -FirebaseAuthDomain, -FirebaseStorageBucket, -FirebaseAppId: optional; if omitted script will prompt
#>
param(
  [Parameter(Mandatory=$false)] [ValidateSet('dev','build')] [string]$Mode = 'dev',
  [Parameter(Mandatory=$false)] [string]$ApiBase = 'http://localhost:8080',
  [Parameter(Mandatory=$false)] [string]$FirebaseProjectId,
  [Parameter(Mandatory=$false)] [string]$FirebaseApiKey,
  [Parameter(Mandatory=$false)] [string]$FirebaseAuthDomain,
  [Parameter(Mandatory=$false)] [string]$FirebaseStorageBucket,
  [Parameter(Mandatory=$false)] [string]$FirebaseAppId,
  [Parameter(Mandatory=$false)] [switch]$InstallNode
)

function Test-Command([string]$cmd) {
  $c = Get-Command $cmd -ErrorAction SilentlyContinue
  return $null -ne $c
}

# If Node missing and -InstallNode passed, attempt install via winget

if (-not (Test-Command node)) {
  if ($InstallNode) {
    Write-Host "Node.js not found. Attempting to install Node.js LTS via winget..."
    if (Get-Command winget -ErrorAction SilentlyContinue) {
      winget install OpenJS.NodeJS.LTS -e --source winget
      Write-Host "winget install triggered. After installation, please re-open PowerShell and re-run this script."
      exit 0
    } else {
      Write-Error "winget is not available. Please install Node.js manually from https://nodejs.org/ and re-run."
      exit 1
    }
  } else {
    Write-Error "Node.js is not installed or not in PATH. Install Node.js 16+ and re-run. https://nodejs.org/"
    exit 1
  }
}

if (-not (Test-Command npm)) {
  Write-Error "npm not found. Ensure Node.js and npm are installed and in PATH."
  exit 1
}

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location -Path $scriptDir
Set-Location -Path "$scriptDir"

# Ensure we are in the frontend folder
# If script is placed inside frontend folder (it is), keep it. Otherwise adjust path.
if (-not (Test-Path -Path "$scriptDir\package.json")) {
  # try to find frontend folder
  if (Test-Path -Path "$scriptDir\..\frontend\package.json") {
    Set-Location -Path "$scriptDir\..\frontend"
  } else {
    Write-Error "Could not find frontend package.json. Run this script from the frontend folder or move it to the frontend folder."
    exit 1
  }
}

# Ensure .env.local exists or prompt user to create it
$envFile = Join-Path (Get-Location) ".env.local"
$createEnv = $false
if (-not (Test-Path $envFile)) { $createEnv = $true }

if ($createEnv) {
  Write-Host "Creating a .env.local file for frontend configuration. You can override values later in the file."
  if (-not $FirebaseProjectId) { $FirebaseProjectId = Read-Host "Firebase Project ID (or press Enter to skip)" }
  if (-not $FirebaseApiKey) { $FirebaseApiKey = Read-Host "Firebase API Key (or press Enter to skip)" }
  if (-not $FirebaseAuthDomain) { $FirebaseAuthDomain = Read-Host "Firebase Auth Domain (or press Enter to skip)" }
  if (-not $FirebaseStorageBucket) { $FirebaseStorageBucket = Read-Host "Firebase Storage Bucket (or press Enter to skip)" }
  if (-not $FirebaseAppId) { $FirebaseAppId = Read-Host "Firebase App ID (or press Enter to skip)" }

  $envText = @"
REACT_APP_FIREBASE_API_KEY=$FirebaseApiKey
REACT_APP_FIREBASE_AUTH_DOMAIN=$FirebaseAuthDomain
REACT_APP_FIREBASE_PROJECT_ID=$FirebaseProjectId
REACT_APP_FIREBASE_STORAGE_BUCKET=$FirebaseStorageBucket
REACT_APP_FIREBASE_APP_ID=$FirebaseAppId
REACT_APP_API_BASE_URL=$ApiBase
"@
  Set-Content -Path $envFile -Value $envText -Encoding UTF8
  Write-Host ".env.local created with API base: $ApiBase"
} else {
  Write-Host ".env.local already exists. Using existing file." -ForegroundColor Green
}

# Install dependencies
Write-Host "Installing npm dependencies (this may take a minute)..."
function Run-Npm([string]$args) {
  # On Windows PowerShell the npm shim may be an npm.ps1 which can be blocked by ExecutionPolicy.
  # Use cmd.exe to run npm to avoid that issue when possible.
  if ($IsWindows) {
    $cmd = "npm $args"
    Write-Host "Running via cmd: $cmd"
    $proc = Start-Process -FilePath cmd.exe -ArgumentList "/c", $cmd -NoNewWindow -Wait -PassThru
    return $proc.ExitCode
  } else {
    & npm $args
    return $LASTEXITCODE
  }
}

if (Test-Path "package-lock.json") {
  Write-Host "Found package-lock.json — running npm ci..."
  $exit = Run-Npm "ci"
  if ($exit -ne 0) {
    Write-Host "npm ci failed with exit code $exit. Falling back to npm install..."
    $exit2 = Run-Npm "install"
    if ($exit2 -ne 0) { Write-Error "npm install failed. See output above."; exit 1 }
  }
} else {
  Write-Host "No package-lock.json found — running npm install..."
  $exit = Run-Npm "install"
  if ($exit -ne 0) { Write-Error "npm install failed. See output above."; exit 1 }
}

if ($Mode -eq 'dev') {
  Write-Host "Starting development server (npm start)..."
  npm start
} else {
  Write-Host "Building production bundle (npm run build)..."
  npm run build
  if (Test-Path -Path "build") {
    Write-Host "Build complete. Production assets available in: $(Join-Path (Get-Location) 'build')"
  }
}
