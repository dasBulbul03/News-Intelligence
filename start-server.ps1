# News Intelligence Server Startup Script
Write-Host "Starting News Intelligence Server..." -ForegroundColor Green
Write-Host ""

# Check if node is installed
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Node.js is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Check if dependencies are installed
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
}

# Kill any existing server on port 3000
Write-Host "Checking for existing server on port 3000..." -ForegroundColor Yellow
$existing = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($existing) {
    $pids = $existing | Select-Object -ExpandProperty OwningProcess -Unique
    foreach ($pid in $pids) {
        try {
            $proc = Get-Process -Id $pid -ErrorAction Stop
            Write-Host "Stopping existing server (PID: $pid, Name: $($proc.ProcessName))..." -ForegroundColor Yellow
            Stop-Process -Id $pid -Force -ErrorAction Stop
            Write-Host "✅ Process $pid stopped" -ForegroundColor Green
        } catch {
            Write-Host "⚠️  Could not stop process $pid: $_" -ForegroundColor Yellow
        }
    }
    Start-Sleep -Seconds 2
    # Verify port is free
    $stillRunning = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
    if ($stillRunning) {
        Write-Host "⚠️  Port 3000 is still in use. The server will attempt to handle this automatically." -ForegroundColor Yellow
    } else {
        Write-Host "✅ Port 3000 is now free" -ForegroundColor Green
    }
}

# Start the server
Write-Host ""
Write-Host "🚀 Starting server..." -ForegroundColor Green
Write-Host ""
npm start

