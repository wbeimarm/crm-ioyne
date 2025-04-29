const { pool } = require('pg');
require('dotenv').config();

const pool = new pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    databe: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

module.exports = pool;