@echo off
echo ==========================================
echo   DESPLIEGUE WEB SOTO (INDEPENDIENTE)
echo ==========================================
echo.

cd "apps/Web SOTOdelPRIOR"

echo [1/3] Empaquetando sitio web...
tar --exclude="node_modules" --exclude=".next" --exclude=".git" --exclude=".idea" --exclude=".vscode" --exclude="dist" --exclude="build" --exclude="db_data" --exclude="pg_data" --exclude="*.log" --exclude="Deployment/mail" -czvf deploy_web.tar.gz .

echo.
echo [2/3] Subiendo al servidor (164.92.167.42)...
echo * Te va a pedir la contrasena del servidor *
scp deploy_web.tar.gz root@164.92.167.42:/root/deploy_web.tar.gz

echo.
echo [3/3] Instalando WEB...
echo * Te va a pedir la contrasena otra vez *
ssh root@164.92.167.42 "mkdir -p site_web_soto && tar -xzvf deploy_web.tar.gz -C site_web_soto > /dev/null && cd site_web_soto && sed -i 's/\r$//' setup_remote.sh && bash setup_remote.sh"

echo.
echo Limpiando...
del deploy_web.tar.gz
cd ../..

echo.
echo ==========================================
echo   DESPLIEGUE COMPLETADO
echo ==========================================
pause
