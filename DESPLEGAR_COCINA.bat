@echo off
echo ==========================================
echo   DESPLIEGUE RAPIDO COCINA - SOTO DEL PRIOR
echo ==========================================
echo.

cd ..
echo [1/3] Empaquetando cambio de codigo...
:: Excluyendo 'Servidor SOTOdelPRIOR' (causa errores tar) y otras apps no necesarias para Cocina
tar --exclude="node_modules" --exclude=".next" --exclude=".git" --exclude=".idea" --exclude=".vscode" --exclude="dist" --exclude="build" --exclude="db_data" --exclude="pg_data" --exclude="*.log" --exclude="acme" --exclude="letsencrypt" --exclude="Servidor SOTOdelPRIOR" --exclude="App control ganadero SOTOdelPRIOR" --exclude="Motor reservas SOTOdelPRIOR" --exclude="Campañas marketing SOTOdelPRIOR" -czvf deploy_cocina.tar.gz .

echo.
echo [2/3] Subiendo al servidor...
scp deploy_cocina.tar.gz root@164.92.167.42:/root/deploy.tar.gz

echo.
echo [3/3] Instalando en el servidor...
:: Se usa el mismo flujo de tar pero se llama a setup_remote_cocina.sh
ssh root@164.92.167.42 "mkdir -p SOTOdelPRIOR && tar -xzvf deploy.tar.gz -C SOTOdelPRIOR > /dev/null && cd SOTOdelPRIOR/Infraestructure && sed -i 's/\r$//' setup_remote_cocina.sh && bash setup_remote_cocina.sh"

echo.
echo Limpiando...
del deploy_cocina.tar.gz

echo.
echo ==========================================
echo        COCINA ACTUALIZADA
echo ==========================================
pause
