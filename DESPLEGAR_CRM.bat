@echo off
echo ==========================================
echo   DESPLIEGUE CRM (SOLO CRM - MODO DEBUG)
echo ==========================================
echo.

cd ..
echo [1/3] Empaquetando todo el codigo...
tar --exclude="node_modules" --exclude=".next" --exclude=".git" --exclude=".idea" --exclude=".vscode" --exclude="dist" --exclude="build" --exclude="db_data" --exclude="pg_data" --exclude="*.log" --exclude="acme" --exclude="letsencrypt" --exclude="Servidor SOTOdelPRIOR/node_modules" --exclude="Servidor SOTOdelPRIOR/.next" --exclude="Servidor SOTOdelPRIOR/.git" --exclude="App cocina SOTOdelPRIOR" --exclude="App control ganadero SOTOdelPRIOR" --exclude="Motor reservas SOTOdelPRIOR" --exclude="Campañas marketing SOTOdelPRIOR" --exclude="WEB SOTOdelPRIOR" -czvf deploy.tar.gz .

echo.
echo [2/3] Subiendo al servidor (164.92.167.42)...
echo * Te va a pedir la contrasena del servidor *
scp deploy.tar.gz root@164.92.167.42:/root/deploy.tar.gz

echo.
echo [3/3] Instalando CRM en el servidor...
echo * Te va a pedir la contrasena otra vez *
ssh root@164.92.167.42 "mkdir -p SOTOdelPRIOR && tar -xzvf deploy.tar.gz -C SOTOdelPRIOR > /dev/null && cd SOTOdelPRIOR/Infraestructure && sed -i 's/\r$//' setup_remote_crm.sh && bash setup_remote_crm.sh"

echo.
echo Limpiando...
del deploy.tar.gz

echo.
echo ==========================================
echo        DESPLIEGUE CRM COMPLETADO
echo ==========================================
pause
