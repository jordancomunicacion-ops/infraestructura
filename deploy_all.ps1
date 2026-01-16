# Deploy All Apps Script
# Run this from the Infraestructure folder

Write-Host "Starting Deployment..." -ForegroundColor Green

# 1. Create Network if not exists
$net = docker network ls --filter name=^proxy-net$ --format="{{ .Name }}"
if ($net -eq "proxy-net") {
    Write-Host "Network 'proxy-net' already exists." -ForegroundColor Yellow
} else {
    Write-Host "Creating network 'proxy-net'..." -ForegroundColor Cyan
    docker network create proxy-net
}

# 2. Deploy Proxy
Write-Host "Deploying Proxy (Traefik)..." -ForegroundColor Cyan
Set-Location -Path "proxy"
docker-compose up -d --remove-orphans
Set-Location -Path ".."

# 3. Deploy Apps
$apps = @("cocina", "reservas", "ganaderia-soto")

foreach ($app in $apps) {
    Write-Host "Deploying App: $app..." -ForegroundColor Cyan
    $appPath = Join-Path "apps" $app
    if (Test-Path $appPath) {
        Set-Location -Path $appPath
        # Build is important because we changed build contexts
        docker-compose up -d --build --remove-orphans
        Set-Location -Path "..\.."
    } else {
        Write-Host "Error: App folder $app not found!" -ForegroundColor Red
    }
}

Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "Check status with: docker ps"
