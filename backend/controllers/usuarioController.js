const { obtenerUsuarios, crearUsuarios } = require('../models/usuarioModel');

//obtener todos los usuarios (GET)

const listarUsuarios = async(res, req) => {
    try {
        const usuarios = await obtenerUsuarios();
        res.json(usuarios); //responde con la lista de usuarios en formato JSON
    } catch (error) {
        console.error('Error al obtener usuarios', error);
        res.status(500).json({ mensaje: 'Error del servidor' })
    }
};


//crear un usuario (POST)
const registrarUsuario = async(req, res) => {
    try {
        const { nombe, email, contraseña } = req.body;

        // validacion basica
        if (!nombre || !email || !contraseña) {
            return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
        }

        const nuevoUsuario = crearUsuario({ nombre, email, contraseña });
        res.status(201).json(nuevoUsuario) //responde con el nuevo usuario creado
    } catch (error) {
        console.error('Error al crear usuario', error);
        res.status(500).json({ mensaje: 'Error al crear el usuario' });
    }
};

module.exports = {
    listarUsuarios,
    registrarUsuario,
};