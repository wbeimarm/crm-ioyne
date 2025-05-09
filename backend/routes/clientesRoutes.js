const express = require('express');
const router = express.Router();

const {
    crearCliente,
    obtenerClientes,
    actualizarCliente
} = require('../controllers/clienteController');

// POST - Crear cliente
router.post('/', crearCliente);

// GET - Obtener todos los clientes
router.get('/', obtenerClientes);

// PUT - Actualizar cliente por ID
router.put('/:id', actualizarCliente);

module.exports = router;