@echo off
echo ==========================================
echo   LIMPIEZA DE ARTEFACTOS Y TEMPORALES
echo ==========================================
echo.
echo ESTE SCRIPT BORRARA EN TODA LA CARPETA SOTOdelPRIOR:
echo - Carpetas node_modules (dependencias)
echo - Carpetas .next, dist, build (compilados)
echo - Archivos .log y temporales
echo.
echo NO BORRARA:
echo - Tu codigo fuente
echo - Tus bases de datos locales (db_data)
echo - La carpeta 'Servidor SOTOdelPRIOR' (es otro proyecto/repo)
echo.
pause

cd ..
echo Limpiando en %CD% ...

:: Borrar node_modules
if exist node_modules (
    echo Borrando node_modules raiz...
    rmdir /s /q node_modules
)

:: Borrar recursivamente en subcarpetas
echo Buscando y borrando node_modules en subcarpetas...
for /d /r . %%d in (node_modules) do @if exist "%%d" (
    echo Borrando "%%d"...
    rmdir /s /q "%%d"
)

echo Buscando y borrando .next en subcarpetas...
for /d /r . %%d in (.next) do @if exist "%%d" (
    echo Borrando "%%d"...
    rmdir /s /q "%%d"
)

echo Buscando y borrando dist en subcarpetas...
for /d /r . %%d in (dist) do @if exist "%%d" (
    echo Borrando "%%d"...
    rmdir /s /q "%%d"
)

:: Borrar archivos especificos
del /s /q *.log
del /s /q deploy.tar.gz

echo.
echo ==========================================
echo        LIMPIEZA COMPLETADA
echo ==========================================
echo Ahora tienes mas espacio.
echo Para volver a trabajar, tendras que hacer 'npm install' en cada proyecto.
pause
