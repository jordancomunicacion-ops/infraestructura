#!/bin/bash
set -e

echo "=== Configurando Servidor Reservas (Update Mode) ==="

echo "-> Deteniendo Reservas antiguo..."
# Verify container names from docker-compose.yml: reservas-web, reservas-api, reservas-engine, reservas-db
docker stop reservas-web reservas-api reservas-engine reservas-db || true
docker rm reservas-web reservas-api reservas-engine reservas-db || true

echo "-> Desplegando Reservas..."
cd ~/apps/Reservas
docker compose up -d --build --remove-orphans

echo "=== RESERVAS DESPLEGADA ==="
