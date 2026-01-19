@echo off
echo ==========================================
echo   DESPLIEGUE GANADERIA (APP GANADERA)
echo ==========================================
echo.

cd /d "%~dp0"
cd apps\ganaderia-soto
echo [1/3] Empaquetando App Ganaderia (MODO INDEPENDIENTE)...
tar --exclude="node_modules" --exclude=".next" --exclude=".git" --exclude=".idea" --exclude=".vscode" --exclude="dist" --exclude="build" --exclude="db_data" --exclude="pg_data" --exclude="*.log" -czvf deploy.tar.gz .

echo.
echo [2/3] Subiendo al servidor (164.92.167.42)...
echo * Te va a pedir la contrasena del servidor *
scp deploy.tar.gz root@164.92.167.42:/root/SOTOdelPRIOR/Infraestructure/apps/ganaderia-soto/deploy.tar.gz

echo.
echo [3/3] Instalando Ganaderia en el servidor...
echo * Te va a pedir la contrasena otra vez *
ssh root@164.92.167.42 "cd ~/SOTOdelPRIOR/Infraestructure && sed -i 's/\r$//' setup_remote_ganaderia.sh && bash setup_remote_ganaderia.sh"

echo.
echo Limpiando...
del deploy.tar.gz

echo.
echo ==========================================
echo    DESPLIEGUE GANADERIA COMPLETADO
echo ==========================================
pause
