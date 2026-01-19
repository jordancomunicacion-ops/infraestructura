#!/bin/bash
set -e

echo "=== Configurando Servidor CORE (Cocina, Reservas, Ganaderia, Web) ==="

# 1. Setup inicial y limpieza basica
echo "-> Verificando Swap..."
if [ ! -f /swapfile ]; then
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo "/swapfile none swap sw 0 0" >> /etc/fstab
    echo "Swap creada."
else
    echo "-> Swap ya existe."
fi

echo "-> DETENIENDO CONTENEDORES CORE ANTIGUOS..."
# Stop core containers gently if running
docker stop traefik_proxy cocina-web cocina-api cocina-engine cocina-db reservas-web reservas-api reservas-engine reservas-db ganaderia-web ganaderia-api ganaderia-db web-soto || true
docker rm traefik_proxy cocina-web cocina-api cocina-engine cocina-db reservas-web reservas-api reservas-engine reservas-db ganaderia-web ganaderia-api ganaderia-db web-soto || true

# Prune to save space (optional, maybe skip to save time, but safer for cleaner builds)
# echo "-> Purgando..."
# docker system prune -f

echo "-> Creando redes..."
docker network create proxy-net || true
docker network create cocina-internal-net || true
docker network create reservas-internal-net || true
docker network create ganaderia-internal-net || true
docker network create crm-internal-net || true 

echo "-> Desplegando Proxy (Traefik)..."
cd ~/SOTOdelPRIOR/Infraestructure/proxy
docker compose up -d --build --remove-orphans

echo "-> Desplegando Cocina..."
cd ~/SOTOdelPRIOR/Infraestructure/apps/cocina
docker compose up -d --build --remove-orphans

echo "-> Desplegando Reservas..."
cd ~/SOTOdelPRIOR/Infraestructure/apps/reservas
docker compose up -d --build --remove-orphans

echo "-> Desplegando Ganaderia..."
cd ~/SOTOdelPRIOR/Infraestructure/apps/ganaderia-soto
docker compose up -d --build --remove-orphans

echo "-> Desplegando Web Corporativa..."
cd ~/SOTOdelPRIOR/Infraestructure/apps/web-soto
docker compose up -d --build --remove-orphans

echo "=== CORE DESPLEGADO EXITOSAMENTE ==="
echo "Nota: El CRM no se ha tocado en este despliegue."
