@echo off
echo ==========================================
echo   AUTO-DESPLIEGUE SOTO DEL PRIOR - VPS
echo ==========================================
echo.

cd ..
echo [1/3] Empaquetando todo el codigo (excluyendo node_modules y carpetas pesadas)...
:: Excluyendo 'Servidor SOTOdelPRIOR' porque tiene archivos de sistema (spool) que fallan en Windows
tar --exclude="node_modules" --exclude=".next" --exclude=".git" --exclude="Servidor SOTOdelPRIOR" --exclude=".idea" --exclude=".vscode" --exclude="dist" --exclude="build" --exclude="db_data" --exclude="pg_data" --exclude="*.log" -czvf deploy.tar.gz .

echo.
echo [2/3] Subiendo al servidor (164.92.167.42)...
echo * Te va a pedir la contrasena del servidor *
scp deploy.tar.gz root@164.92.167.42:/root/deploy.tar.gz

echo.
echo [3/3] Instalando en el servidor...
echo * Te va a pedir la contrasena otra vez (o quiza no) *
:: Modificacion para evitar purgado de datos (Persistencia) y errores de sed
ssh root@164.92.167.42 "mkdir -p SOTOdelPRIOR && tar -xzvf deploy.tar.gz -C SOTOdelPRIOR > /dev/null && cd SOTOdelPRIOR/Infraestructure && sed -i 's/\r$//' setup_remote.sh && bash setup_remote.sh"

echo.
echo Limpiando...
del deploy.tar.gz

echo.
echo ==========================================
echo        PROCESO COMPLETADO
echo ==========================================
pause
