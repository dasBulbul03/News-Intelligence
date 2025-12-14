# Docker Startup Script for News Intelligence
Write-Host "News Intelligence - Docker Startup Script" -ForegroundColor Green
Write-Host ""

# Check if Docker is running
Write-Host "Checking Docker status..." -ForegroundColor Yellow
try {
    $dockerInfo = docker info 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Docker is running" -ForegroundColor Green
    } else {
        Write-Host "❌ Docker is not running" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please start Docker Desktop and try again." -ForegroundColor Yellow
        Write-Host "You can start it manually or run:" -ForegroundColor Yellow
        Write-Host "  Start-Process 'C:\Program Files\Docker\Docker\Docker Desktop.exe'" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Waiting for Docker to start..." -ForegroundColor Yellow
        Start-Process 'C:\Program Files\Docker\Docker\Docker Desktop.exe' -ErrorAction SilentlyContinue
        Write-Host "Waiting 30 seconds for Docker Desktop to initialize..." -ForegroundColor Yellow
        Start-Sleep -Seconds 30
        
        # Check again
        $dockerInfo = docker info 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Docker still not running. Please start Docker Desktop manually." -ForegroundColor Red
            exit 1
        }
        Write-Host "✅ Docker is now running" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Error checking Docker: $_" -ForegroundColor Red
    Write-Host "Please ensure Docker Desktop is installed and running." -ForegroundColor Yellow
    exit 1
}

# Stop any existing containers
Write-Host ""
Write-Host "Stopping any existing containers..." -ForegroundColor Yellow
docker-compose down 2>&1 | Out-Null

# Build and start containers
Write-Host ""
Write-Host "Building and starting containers..." -ForegroundColor Green
docker-compose up -d --build

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Services started successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Services are running:" -ForegroundColor Cyan
    Write-Host "  📡 API Server: http://localhost:3000" -ForegroundColor White
    Write-Host "  ❤️  Health Check: http://localhost:3000/health" -ForegroundColor White
    Write-Host "  📚 API Docs: http://localhost:3000/api-docs" -ForegroundColor White
    Write-Host "  🗄️  PostgreSQL: localhost:5432" -ForegroundColor White
    Write-Host "  🔴 Redis: localhost:6379" -ForegroundColor White
    Write-Host "  🔵 Qdrant: localhost:6333" -ForegroundColor White
    Write-Host ""
    Write-Host "To view logs: docker-compose logs -f" -ForegroundColor Yellow
    Write-Host "To stop: docker-compose down" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "Failed to start services. Check the errors above." -ForegroundColor Red
    exit 1
}

