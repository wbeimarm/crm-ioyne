// 1. Importamos la clase Pool desde pg
const { Pool } = require('pg');

// 2. Cargamos las variables de entorno desde el archivo .env
require('dotenv').config();

// 3. Creamos una nueva conexión a la base de datos usando los datos del .env
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});


// 4. Exportamos el pool para poder usarlo en otros archivos
module.exports = pool;