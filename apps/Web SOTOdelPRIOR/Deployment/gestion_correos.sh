#!/bin/bash
# Script para gestionar correos en Docker Mailserver (Linux/VPS)

echo "-----------------------------------------"
echo "  GESTOR DE CORREO (Docker Mailserver)"
echo "-----------------------------------------"
echo "1. Listar cuentas"
echo "2. Crear nueva cuenta"
echo "3. Borrar cuenta"
echo "4. Cambiar contraseña"
echo ""
read -p "Elige una opcion (1-4): " op

if [ "$op" == "1" ]; then
    docker exec -ti soto_mailserver setup email list
elif [ "$op" == "2" ]; then
    read -p "Introduce el email completo (ej: admin@jordazola.com): " email
    read -s -p "Introduce la contraseña: " pass
    echo ""
    docker exec -ti soto_mailserver setup email add "$email" "$pass"
elif [ "$op" == "3" ]; then
    read -p "Email a borrar: " email
    docker exec -ti soto_mailserver setup email del "$email"
elif [ "$op" == "4" ]; then
    read -p "Email: " email
    read -s -p "Nueva contraseña: " pass
    echo ""
    docker exec -ti soto_mailserver setup email update "$email" "$pass"
fi
