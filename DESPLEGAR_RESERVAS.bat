@echo off
echo ==========================================
echo   DESPLIEGUE RESERVAS (APP RESERVAS)
echo ==========================================
echo.

cd /d "%~dp0"
cd apps\Reservas SOTOdelPRIOR
echo [1/3] Empaquetando todo el codigo (SOLO RESERVAS + INFRA)...
tar --exclude="node_modules" --exclude=".next" --exclude=".git" --exclude=".idea" --exclude=".vscode" --exclude="dist" --exclude="build" --exclude="db_data" --exclude="pg_data" --exclude="*.log" --exclude="acme" --exclude="letsencrypt" -czvf deploy.tar.gz .

echo.
echo [2/3] Subiendo al servidor (164.92.167.42)...
echo * Te va a pedir la contrasena del servidor *
scp deploy.tar.gz root@164.92.167.42:/root/deploy.tar.gz

echo.
echo [3/3] Instalando Reservas en el servidor...
echo * Te va a pedir la contrasena otra vez *
ssh root@164.92.167.42 "mkdir -p apps/Reservas && tar -xzvf deploy.tar.gz -C apps/Reservas > /dev/null && cd apps/Reservas && sed -i 's/\r$//' ../../setup_remote_reservas.sh && bash ../../setup_remote_reservas.sh"

echo.
echo Limpiando...
del deploy.tar.gz

echo.
echo ==========================================
echo    DESPLIEGUE RESERVAS COMPLETADO
echo ==========================================
pause
