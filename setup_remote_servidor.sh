#!/bin/bash
set -e

echo "=== ACTUALIZANDO SERVIDOR CENTRAL (PANEL + CORREO) ==="

echo "-> DETENIENDO SERVICIOS CENTRALES..."
# Stop server containers
docker stop soto_nginx soto_mailserver || true
docker rm soto_nginx soto_mailserver || true

echo "-> Asegurando red..."
docker network create soto_net || true

echo "-> Desplegando Servidor Central..."
# La ruta puede variar segun donde lo descomprima el tar, 
# pero asumiendo la estructura estandar dentro de SOTOdelPRIOR
cd ~/SOTOdelPRIOR/Servidor\ SOTOdelPRIOR/apps/web/Deployment
docker compose up -d --build --remove-orphans

echo "=== SERVIDOR CENTRAL ACTUALIZADO EXITOSAMENTE ==="
