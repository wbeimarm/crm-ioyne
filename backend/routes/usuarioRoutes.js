const express = require('express');
const router = express.Router();
const { listarUsuarios, registrarUsuario } = require('../controllers/usuarioController');

//ruta para obtener los usuarios
router.get('/', listarUsuarios);

//ruta para registrar un nuevo usuario
router.post('/', registrarUsuario);


module.exports = router