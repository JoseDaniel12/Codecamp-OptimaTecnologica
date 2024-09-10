# CODECAMP - Optima Tecnología

Autor |
---
José Daniel Alvarado Fajardo |


# Intrucciónes de Ejecución
## Base de Datos:
1. Restaurar la base de datos de Sql Server con el archivo llamado 'db-codecamp-optimatecnologica.bak'
que se encuentra en la ruta:
`
/database
`

## Backend:
1. Colocarse en el siguiente direcctorio:
 `
/backend
 `

2. Crear el siguiente archivo:
 `
.env
 `

2.1. Su contendio debera ser el siguiente:
Clave               | Descripción de Valor                              | Ejemplo
---                 | ---                                               | ---
BACKEND_PORT        | Número del puerto en que corre el backend.        | 5000
SQL_SERVER_DATABASE | Nombre de la base de datos a conectarse.          |'db-codecamp-optimatecnologica'
SQL_SERVER_USER     | Usuario para acceder a Sql Server.                | 'sa'
SQL_SERVER_PASSWORD | Contraseña del usuario de Sql Server.             | 12345
SQL_SERVER_HOST     | IP del servidor de la base de datos.              | 'localhost'
SQL_SERVER_PORT     | Puerto en el que esta corriendo la base de datos. | 1433
ACCESS_TOKEN_SECRET | Texto secreto para generar tokens                 | 'secret'

3. Colocarse y abrir una terminal  en el siguiente direcctorio:
 `
/backend/src
 `

4. Ejecutar el comando: 
`
npm install
`

5. Ejecutar el comando: 
`
npm run dev
`

## Frotend:
1. Colocarse en el siguiente direcctorio:
 `
/frontend/src
 `

2. Ejecutar el comando: 
`
npm run dev
`