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
# ... (Swap logic remains above)

# 0.1. Limpieza TOTAL (Necessario por falta de espacio)
echo "-> DETENIENDO TODO para liberar espacio (Modo Mantenimiento)..."
# Detener todos los contenedores corriendo
if [ "$(docker ps -q)" ]; then
    docker stop $(docker ps -q)
fi
# Borrar todos los contenedores (esto libera las imagenes para ser borradas)
if [ "$(docker ps -a -q)" ]; then
    docker rm $(docker ps -a -q)
fi

# Borrar el archivo comprimido que acabamos de subir para ganar espacio
rm -f /root/deploy.tar.gz

echo "-> Purgando imagenes antiguas..."
# Borrar TODAS las imagenes, cache de build y redes no usadas
# PRECAUCION: Esto obliga a re-descargar imagenes base (postgres, node, traefik), pero es la unica forma de asegurar espacio en 25GB
docker system prune -a -f
docker builder prune -a -f

# Asegurar Red (se borro con el prune si no tenia contenedores)
docker network create proxy-net || true
echo "-> Red 'proxy-net' verificada."

# 1. Desplegar Proxy (Traefik) - CRITICAL
echo "-> Desplegando Proxy (Traefik)..."
cd /root/SOTOdelPRIOR/Infraestructure/proxy
# Asegurar permisos ACME
mkdir -p acme
touch acme/acme.json
chmod 600 acme/acme.json
docker compose up -d --remove-orphans

# 2. Desplegar Apps
echo "-> Desplegando Cocina..."
cd /root/SOTOdelPRIOR/Infraestructure/apps/cocina
docker compose up -d --build --remove-orphans

echo "-> Desplegando Reservas..."
cd /root/SOTOdelPRIOR/Infraestructure/apps/reservas
docker compose up -d --build --remove-orphans

echo "-> Desplegando Ganaderia..."
cd /root/SOTOdelPRIOR/Infraestructure/apps/ganaderia-soto
docker compose up -d --build --remove-orphans

echo "-> Desplegando Web Corporativa..."
cd /root/SOTOdelPRIOR/Infraestructure/apps/web-soto
docker compose up -d --build --remove-orphans

echo "=== ¡DESPLIEGUE FINALIZADO! ==="

