param(
  [Parameter(Mandatory=$false)] [string]$DevUrl = 'http://localhost:3000',
  [Parameter(Mandatory=$false)] [string]$ApiBase = 'http://localhost:8080'
)

function Test-Url($url) {
  try {
    $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10
    Write-Host "[OK] $url -> $($resp.StatusCode)"
    return $true
  } catch {
    Write-Host "[FAIL] $url -> $($_.Exception.Message)" -ForegroundColor Yellow
    return $false
  }
}

Write-Host "Running frontend smoke tests..."
$frontendOk = Test-Url $DevUrl

Write-Host "Checking backend health endpoint: $ApiBase"
$backendHealth = "$ApiBase/health"
$backendOk = Test-Url $backendHealth

if ($frontendOk -and $backendOk) {
  Write-Host "Smoke tests PASSED: Frontend and backend reachable." -ForegroundColor Green
  exit 0
} elseif ($frontendOk) {
  Write-Host "Frontend reachable, backend did not respond. If you expect mock responses, that's OK." -ForegroundColor Yellow
  exit 2
} else {
  Write-Host "Frontend not reachable. Ensure dev server is running (npm start) and re-run this script." -ForegroundColor Red
  exit 3
}
