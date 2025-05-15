const express = require('express');
const router = express.Router();

const {
    postProducto,
    getProductos,
    putProducto
} = require('../controllers/productoController');

// Crear producto
router.post('/', postProducto);

// Obtener todos los productos
router.get('/', getProductos);

// Actualizar producto por id
router.put('/:id', putProducto);

module.exports = router;