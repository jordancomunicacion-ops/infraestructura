#!/bin/bash
set -e

echo "=== Configurando Servidor CRM (Debugging Mode) ==="

echo "-> Asegurando redes..."
docker network create proxy-net || true
docker network create crm-internal-net || true

echo "-> Deteniendo CRM antiguo..."
docker stop crm-web crm-api crm-engine crm-db || true
docker rm crm-web crm-api crm-engine crm-db || true

echo "-> Desplegando CRM (usando Servidor SOTOdelPRIOR context)..."
cd ~/SOTOdelPRIOR/Infraestructure/apps/crm
docker compose up -d --build --remove-orphans

echo "=== CRM DESPLEGADO ==="
