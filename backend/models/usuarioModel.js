const pool = require('../db');

// Obtener todos los usuarios
const obtenerUsuarios = async() => {
    const resultado = await pool.query('SELECT * FROM usuarios');
    return resultado.rows;
};

// Crear un nuevo usuario
const crearUsuario = async({ nombre, email, contraseña }) => {
    console.log('Datos recibidos para crear usuario:', { nombre, email, contraseña });

    const resultado = await pool.query(
        'INSERT INTO usuarios (nombre, email, contraseña) VALUES ($1, $2, $3) RETURNING *', [nombre, email, contraseña]
    );

    return resultado.rows[0];
};

module.exports = {
    obtenerUsuarios,
    crearUsuario
};