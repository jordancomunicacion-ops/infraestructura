#!/bin/bash
set -e

echo "=== Configurando Servidor WEB SOTO (Independiente) ==="

echo "-> DETENIENDO CONTENEDOR WEB..."
docker stop web-soto || true
docker rm web-soto || true

echo "-> Desplegando Web Corporativa desde 'site_web_soto'..."
# Asegurar que estamos en el directorio correcto (relativo o absoluto)
# El script se ejecuta desde dentro de site_web_soto al ser llamado por ssh
docker compose up -d --build --remove-orphans

echo "=== WEB DESPLEGADA EXITOSAMENTE ==="
