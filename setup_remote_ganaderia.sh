#!/bin/bash
set -e

echo "=== Configurando Servidor Ganaderia (Update Mode) ==="

# No recreamos la red porque es compartida, pero nos aseguramos que exista si falla algo
# docker network create proxy-net || true
# docker network create ganaderia-internal-net || true

echo "-> Deteniendo Ganaderia antiguo..."
docker stop ganaderia-web ganaderia-api ganaderia-db || true
docker rm ganaderia-web ganaderia-api ganaderia-db || true

echo "-> Desplegando Ganaderia (Modo Independiente)..."
cd ~/SOTOdelPRIOR/Infraestructure/apps/ganaderia-soto
# El archivo ya debe estar aquí subido por SCP
if [ -f "deploy.tar.gz" ]; then
    echo "Extrayendo código..."
    tar -xzvf deploy.tar.gz > /dev/null
    rm deploy.tar.gz
fi

docker compose up -d --build --remove-orphans

echo "=== GANADERIA DESPLEGADA ==="
