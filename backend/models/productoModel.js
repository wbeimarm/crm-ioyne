const pool = require('../db');

// Crear un producto nuevo
const crearProducto = async({ nombre, descripcion, precio }) => {
    const resultado = await pool.query(
        'INSERT INTO productos (nombre, descripcion, precio) VALUES ($1, $2, $3) RETURNING *', [nombre, descripcion, precio]
    );
    return resultado.rows[0];
};

// Obtener todos los productos
const obtenerProductos = async() => {
    const resultado = await pool.query('SELECT * FROM productos');
    return resultado.rows;
};

// Actualizar un producto por su id
const actualizarProducto = async(id, { nombre, descripcion, precio }) => {
    const resultado = await pool.query(
        'UPDATE productos SET nombre = $1, descripcion = $2, precio = $3 WHERE id = $4 RETURNING *', [nombre, descripcion, precio, id]
    );
    return resultado.rows[0];
};

module.exports = {
    crearProducto,
    obtenerProductos,
    actualizarProducto
};