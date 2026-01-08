# CHECKLIST VPS (Ubuntu) - SOTO-INFRA

## 1) Crear VPS
- Ubuntu 22.04 LTS
- 2 vCPU / 4 GB RAM mínimo
- IP pública fija
- Acceso SSH con clave (no password)

## 2) Endurecimiento básico
- actualizar sistema
- UFW: permitir 22, 80, 443
- desactivar login root por password

## 3) Docker
- instalar docker + docker compose
- crear red: docker network create proxy-net

## 4) Copiar estructura
- /opt/soto-infra/proxy
- /opt/soto-infra/apps/...

## 5) Arranque
- levantar traefik primero
- levantar apps después (una a una)

## 6) Validación
- curl a cada dominio y api
- revisar logs traefik y logs app
