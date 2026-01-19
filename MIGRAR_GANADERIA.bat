@echo off
echo ==========================================
echo   MIGRACION APP GANADERIA A INFRAESTRUCTURA
echo ==========================================
echo.
echo Copiando archivos de "App control ganadero SOTOdelPRIOR" a "Infraestructure\apps\ganaderia-soto"...

cd /d "%~dp0"
cd ..

REM Copiar todo EXCLUYENDO carpetas pesadas
robocopy "App control ganadero SOTOdelPRIOR" "Infraestructure\apps\ganaderia-soto" /E /XD node_modules .next .git dist build _legacy temp .vscode .idea

echo.
echo Eliminando carpetas 'backend' y 'frontend' antiguas de ganaderia-soto si existen...
if exist "Infraestructure\apps\ganaderia-soto\backend" rmdir /s /q "Infraestructure\apps\ganaderia-soto\backend"
if exist "Infraestructure\apps\ganaderia-soto\frontend" rmdir /s /q "Infraestructure\apps\ganaderia-soto\frontend"

echo.
echo ==========================================
echo   MIGRACION COMPLETADA
echo ==========================================
echo Ahora puedes trabajar en "Infraestructure\apps\ganaderia-soto" de forma independiente.
pause
