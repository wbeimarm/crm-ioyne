const express = require('express');
const router = express.Router();
const { loginUsuario } = require('../controllers/loginController');

//ruta para hacer el login
router.post('/', loginUsuario);

module.exports = router;