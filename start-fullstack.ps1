# Full Stack Startup Script for News Intelligence
Write-Host "News Intelligence - Full Stack Startup" -ForegroundColor Green
Write-Host ""

# Check if backend is running
Write-Host "Checking backend status..." -ForegroundColor Yellow
$backendRunning = $false
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/health" -TimeoutSec 2 -ErrorAction Stop
    if ($response.StatusCode -eq 200) {
        Write-Host "Backend is already running on port 3000" -ForegroundColor Green
        $backendRunning = $true
    }
} catch {
    Write-Host "Backend is not running. Starting backend..." -ForegroundColor Yellow
}

# Start backend if not running
if (-not $backendRunning) {
    Write-Host "Starting backend server..." -ForegroundColor Cyan
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm start" -WindowStyle Normal
    Write-Host "Waiting for backend to start..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
    
    # Verify backend started
    $retries = 0
    $maxRetries = 10
    while ($retries -lt $maxRetries) {
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:3000/health" -TimeoutSec 2 -ErrorAction Stop
            if ($response.StatusCode -eq 200) {
                Write-Host "Backend started successfully!" -ForegroundColor Green
                $backendRunning = $true
                break
            }
        } catch {
            $retries++
            Start-Sleep -Seconds 2
        }
    }
    
    if (-not $backendRunning) {
        Write-Host "Backend failed to start. Please check the backend window for errors." -ForegroundColor Red
        exit 1
    }
}

# Check if frontend is running
Write-Host ""
Write-Host "Checking frontend status..." -ForegroundColor Yellow
$frontendRunning = $false
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001" -TimeoutSec 2 -ErrorAction Stop
    if ($response.StatusCode -eq 200) {
        Write-Host "Frontend is already running on port 3001" -ForegroundColor Green
        $frontendRunning = $true
    }
} catch {
    Write-Host "Frontend is not running. Starting frontend..." -ForegroundColor Yellow
}

# Start frontend if not running
if (-not $frontendRunning) {
    Write-Host "Starting frontend development server..." -ForegroundColor Cyan
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; npm start" -WindowStyle Normal
    Write-Host "Waiting for frontend to start..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
    
    Write-Host ""
    Write-Host "Services are starting:" -ForegroundColor Green
    Write-Host "  Backend API: http://localhost:3000" -ForegroundColor White
    Write-Host "  Frontend: http://localhost:3001 (will open automatically)" -ForegroundColor White
    Write-Host ""
    Write-Host "The frontend will open in your browser automatically." -ForegroundColor Cyan
    Write-Host "If it doesn't, navigate to http://localhost:3001" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "All services are running:" -ForegroundColor Green
    Write-Host "  Backend API: http://localhost:3000" -ForegroundColor White
    Write-Host "  Frontend: http://localhost:3001" -ForegroundColor White
}

Write-Host ""
Write-Host "Press Ctrl+C to stop all services" -ForegroundColor Yellow

