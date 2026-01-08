# CHECKLIST CLOUDFLARE - SOTO-INFRA

## Objetivo
Apuntar subdominios al VPS. No tocar correo (MX/SPF/DKIM).

## 1) Añadir dominio a Cloudflare
- sotodelprior.com
- (luego jordazola.com)

## 2) Cambiar Nameservers en el registrador
- usar los 2 NS que da Cloudflare

## 3) DNS (registros A explícitos, sin wildcard al inicio)
- A  sotodelprior.com              -> IP_VPS
- A  web.sotodelprior.com          -> IP_VPS
- A  reservas.sotodelprior.com     -> IP_VPS
- A  api.reservas.sotodelprior.com -> IP_VPS
- A  crm.sotodelprior.com          -> IP_VPS
- A  api.crm.sotodelprior.com      -> IP_VPS
- A  ganaderia.sotodelprior.com    -> IP_VPS
- A  api.ganaderia.sotodelprior.com-> IP_VPS
(etc. por cada app)

## 4) SSL/TLS
- Mode: Full (strict)
- Always Use HTTPS: ON

## 5) Correo
- NO tocar MX existentes
- Verificar que MX apunta a: *.mail.protection.outlook.com
