const {
    crearProducto,
    obtenerProductos,
    actualizarProducto
} = require('../models/productoModel');

// Crear un producto
const postProducto = async(req, res) => {
    try {
        const nuevoProducto = await crearProducto(req.body);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ mensaje: 'Error al crear producto' });
    }
};

// Obtener todos los productos
const getProductos = async(req, res) => {
    try {
        const productos = await obtenerProductos();
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ mensaje: 'Error al obtener los productos' });
    }
};

// Actualizar un producto
const putProducto = async(req, res) => {
    try {
        const { id } = req.params;
        const productoActualizado = await actualizarProducto(id, req.body);
        if (!productoActualizado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json(productoActualizado);
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ mensaje: 'Error al actualizar el producto' });
    }
};

module.exports = {
    postProducto,
    getProductos,
    putProducto
};