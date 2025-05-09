const clienteModel = require('../models/clienteModel');

// Crear cliente
const crearCliente = async(req, res) => {
    try {
        const nuevoCliente = await clienteModel.crearCliente(req.body);
        res.status(201).json({ mensaje: 'Cliente creado exitosamente', cliente: nuevoCliente });
    } catch (error) {
        console.error('Error al crear cliente', error);
        res.status(500).json({ mensaje: 'Error del servidor al crear cliente' });
    }
};

// Obtener todos los clientes
const obtenerClientes = async(req, res) => {
    try {
        const clientes = await clienteModel.obtenerClientes();
        res.status(200).json(clientes);
    } catch (error) {
        console.error('Error al obtener clientes', error);
        res.status(500).json({ mensaje: 'Error del servidor al obtener clientes' });
    }
};

// Actualizar cliente
const actualizarCliente = async(req, res) => {
    try {
        const id = req.params.id;
        const clienteActualiado = await clienteModel.actualizarCliente(id, req.body);
        res.status(200).json({ mensaje: 'Cliente actualizado', cliente: clienteActualiado });
    } catch (error) {
        console.error('Error al actualizar cliente', error);
        res.status(500).json({ mensaje: 'Error del servidor al actualizar cliente' });
    }
};

module.exports = {
    crearCliente,
    obtenerClientes,
    actualizarCliente
};