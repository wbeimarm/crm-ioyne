const pool = require('../db');

//obtener tods los usuarios de la base de datos
const obtenerUsuarios = async() => {
    const resultado = await pool.query('SELECT * FROM  usuarios');
    return resultado.rows;
};


//crear un nuevo usuario
const crearUsuario = async({ nombre, email, contraseña }) => {
    const resultado = await pool.query('INSERT INTO usuarios(nombre, email, contraseña) VALUES ($1, $2, $3) RETURNING * [nombre, email, contraseña]');
    return resultado.rows[0];
};

module.exports = {
    obtenerUsuarios,
    crearUsuario
};