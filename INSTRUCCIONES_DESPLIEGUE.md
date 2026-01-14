# Instrucciones de Despliegue en DigitalOcean

Sigue estos pasos para poner en marcha tu infraestructura en la nueva IP: **164.92.167.42**.

## 1. Preparación Local

1.  **Asegura tus cambios**: Confirma que todos los cambios locales están guardados.
    ```powershell
    cd c:\Users\Carlos\SOTOdelPRIOR
    # Si usas git
    git add .
    git commit -m "Preparando despliegue producción"
    git push
    ```

## 2. Conexión al Servidor (VPS)

Conéctate a tu Droplet mediante SSH (usa Putty o Terminal):
```bash
ssh root@164.92.167.42
```

## 3. Preparación del Servidor

Una vez dentro del servidor:

1.  **Instalar Docker** (si no viene instalado):
    *(La mayoría de droplets modernos ya lo traen)*.

2.  **Copiar el Código**:
    Necesitas subir la carpeta `SOTOdelPRIOR` completa (o clonar tu repositorio git) para mantener la estructura de carpetas (`Infraestructure`, `App cocina...`, etc) ya que los Dockerfiles usan rutas relativas.
    
    *Opción A (Git - Recomendada)*:
    ```bash
    git clone <tu-repositorio> SOTOdelPRIOR
    cd SOTOdelPRIOR
    ```
    
    *Opción B (Subir manual)*:
    Sube tu carpeta local via FileZilla o SCP a `/root/SOTOdelPRIOR`.

3.  **Crear Red de Proxy**:
    ```bash
    docker network create proxy-net
    ```

## 4. Desplegar el Proxy (Traefik)

1.  Ve a la carpeta de infraestructura:
    ```bash
    cd /root/SOTOdelPRIOR/Infraestructure/proxy
    ```

2.  Prepara los permisos para certificados (CRUCIAL):
    ```bash
    mkdir -p acme
    touch acme/acme.json
    chmod 600 acme/acme.json
    ```

3.  Arranca el Proxy de Producción:
    ```bash
    docker compose -f docker-compose.prod.yml up -d
    ```
    *Nota: Esto usará el archivo con configuración SSL automática que he creado.*

## 5. Desplegar Aplicaciones

### Cocina
```bash
cd /root/SOTOdelPRIOR/Infraestructure/apps/cocina
docker compose up -d --build
```

### Ganadería
```bash
cd /root/SOTOdelPRIOR/Infraestructure/apps/ganaderia-soto
docker compose up -d --build
```

### Reservas
```bash
cd /root/SOTOdelPRIOR/Infraestructure/apps/reservas
docker compose up -d --build
```

### CRM
```bash
cd /root/SOTOdelPRIOR/Infraestructure/apps/crm
docker compose up -d --build
```

### Web Corporativa
```bash
cd /root/SOTOdelPRIOR/Infraestructure/apps/web-soto
docker compose up -d --build
```

## 6. Verificación DNS

Asegúrate de que tus dominios apuntan a la IP `164.92.167.42` en tu proveedor de DNS (Cloudflare, etc):
- `sotodelprior.com` (Root/Web) -> `164.92.167.42`
- `cocina.sotodelprior.com` -> `164.92.167.42`
- `api.cocina.sotodelprior.com` -> `164.92.167.42`
- `ganaderia.sotodelprior.com` -> `164.92.167.42`
- `api.ganaderia.sotodelprior.com` -> `164.92.167.42` (si aplica)
- `reservas.sotodelprior.com` -> `164.92.167.42`
- `api.reservas.sotodelprior.com` -> `164.92.167.42`
- `crm.sotodelprior.com` -> `164.92.167.42`
- `api.crm.sotodelprior.com` -> `164.92.167.42`

Traefik generará los certificados HTTPS automáticamente en unos segundos.

## Solución de Problemas

- **Error 504**: Si persiste, verifica que el Firewall (UFW) permita tráfico interno de Docker:
  ```bash
  ufw allow from 172.16.0.0/12
  ```
