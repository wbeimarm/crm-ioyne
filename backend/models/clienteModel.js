const pool = require('../db');

// Crear cliente
const crearCliente = async(datos) => {
    const { nombre, email, telefono, direccion } = datos;
    const resultado = await pool.query(
        'INSERT INTO clientes (nombre, email, telefono, direccion) VALUES ($1, $2, $3, $4) RETURNING *', [nombre, email, telefono, direccion]
    );

    return resultado.rows[0];
};

// Obtener todos los clientes
const obtenerClientes = async() => {
    const resultado = await pool.query('SELECT * FROM clientes');
    return resultado.rows;
};

// Actualizar cliente
const actualizarCliente = async(id, datos) => {
    const { nombre, email, telefono, direccion } = datos;
    const resultado = await pool.query(
        `UPDATE clientes 
         SET nombre = $1, email = $2, telefono = $3, direccion = $4 
         WHERE id = $5 
         RETURNING *`, [nombre, email, telefono, direccion, id]
    );
    return resultado.rows[0];
};

module.exports = {
    crearCliente,
    obtenerClientes,
    actualizarCliente
};