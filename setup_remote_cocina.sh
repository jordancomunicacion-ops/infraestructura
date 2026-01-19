#!/bin/bash
set -e

echo "=== ACTUALIZANDO SOLO APP COCINA ==="

echo "-> DETENIENDO CONTENEDORES COCINA..."
# Stop cocina containers
docker stop cocina-web cocina-api cocina-engine cocina-db || true
docker rm cocina-web cocina-api cocina-engine cocina-db || true

echo "-> Asegurando red..."
docker network create cocina-internal-net || true

echo "-> Desplegando Cocina..."
cd ~/SOTOdelPRIOR/Infraestructure/apps/cocina
docker compose up -d --build --remove-orphans

echo "=== COCINA ACTUALIZADA EXITOSAMENTE ==="
