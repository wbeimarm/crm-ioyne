const { obtenerUsuarios, crearUsuario } = require('../models/usuarioModel');

// Obtener todos los usuarios
const listarUsuarios = async(req, res) => {
    try {
        const usuarios = await obtenerUsuarios();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error.message, error.stack);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
};

// Crear un nuevo usuario
const registrarUsuario = async(req, res) => {
    try {
        const { nombre, email, contraseña } = req.body;

        // Validación básica
        if (!nombre || !email || !contraseña) {
            return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
        }

        const nuevoUsuario = await crearUsuario({ nombre, email, contraseña });
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        // ✅ Agregado para mostrar mejor el error
        console.error('Error al crear usuario:', error.message, error.stack);
        res.status(500).json({ mensaje: 'Error al crear el usuario' });
    }
};

module.exports = {
    listarUsuarios,
    registrarUsuario,
};