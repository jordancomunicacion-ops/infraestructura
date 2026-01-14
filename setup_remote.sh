#!/bin/bash
set -e

echo "=== Configurando Servidor (INTENTO 3 - Con SWAP) ==="

# 0. Crear Swap para evitar falta de RAM (CRITICAL en 1GB Servidores)
if [ ! -f /swapfile ]; then
    echo "-> Creando memoria Swap de 4GB (Aumentada)..."
    fallocate -l 4G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
else
    echo "-> Swap ya existe."
fi

# 0.1. Limpieza de conflictos y espacio en disco (CRITICAL)
echo "-> Limpiando contenedores y liberando espacio..."
docker stop traefik || true
docker rm traefik || true
docker stop traefik_proxy || true
docker rm traefik_proxy || true
# Limpieza agresiva de Docker para recuperar espacio (pero SIN borrar volumenes de datos)
docker system prune -a -f
docker builder prune -f

# ... [Keep intervening lines] ...

# 3. Desplegar Apps
echo "-> Desplegando Cocina..."
cd /root/SOTOdelPRIOR/Infraestructure/apps/cocina
docker compose build
docker compose up -d

echo "-> Desplegando Ganaderia..."
cd /root/SOTOdelPRIOR/Infraestructure/apps/ganaderia-soto
docker compose build
docker compose up -d

echo "-> Desplegando Reservas..."
cd /root/SOTOdelPRIOR/Infraestructure/apps/reservas
docker compose build
docker compose up -d

echo "-> Desplegando CRM (Paso a paso para evitar crash)..."
cd /root/SOTOdelPRIOR/Infraestructure/apps/crm
# Construir uno a uno para no saturar RAM
docker compose build crm-api
docker compose build crm-engine
docker compose build crm-web
docker compose up -d

echo "-> Desplegando Web..."
cd /root/SOTOdelPRIOR/Infraestructure/apps/web-soto
docker compose up -d --build

echo "=== ¡DESPLIEGUE FINALIZADO! ==="
