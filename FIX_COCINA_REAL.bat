@echo off
echo ==========================================
echo   FIX COCINA REAL - SOTO DEL PRIOR
echo ==========================================
echo.
echo [1/3] Detectando esquema y aplicando cambios (Prisma Push)...
echo Esto forzara la actualizacion de columnas ('password' en vez de 'passwordHash').
ssh root@164.92.167.42 "docker exec -i cocina-web npx -y prisma@5.22.0 db push --schema=/app/node_modules/.prisma/client/schema.prisma --accept-data-loss"

echo.
echo [2/3] Generando hash de contrasena (123456)...
ssh root@164.92.167.42 "docker exec -i cocina-web node -e \"const b = require('bcryptjs'); console.log(b.hashSync('123456', 10));\" > /tmp/pass_hash.txt"

echo.
echo [3/3] Actualizando usuario 'gerencia' con nueva columna 'password'...
ssh root@164.92.167.42 "export HASH=$(cat /tmp/pass_hash.txt) && docker exec -i cocina-db psql -U cocina_user -d cocina -c \"UPDATE \\\"User\\\" SET \\\"password\\\" = '\$HASH' WHERE email = 'gerencia@sotodelprior.com';\""

echo.
echo ==========================================
echo   PROCESO TERMINADO - PRUEBA LOGIN AHORA
echo ==========================================
pause
