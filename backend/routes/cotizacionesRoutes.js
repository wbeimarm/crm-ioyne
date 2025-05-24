const express = require('express');
const router = express.Router();

//Función del controlador que va a manejar esta ruta
const {
    postCotizacion,
    getCotizaciones,
    getcotizacionPorId,
    putCotizacion,
    deleteCotizacion
} = require('../controllers/cotizacionController');

//Ruta para crear cotizaciones
router.post('/', postCotizacion);

//Ruta para obtener todas las cotizaciones
router.get('/', getCotizaciones);

// Ruta para obtener una cotización por ID
router.get('/:id', getcotizacionPorId);

// Ruta para editar una cotización por su ID
router.put('/:id', putCotizacion);

//Ruta para eliminar cotizaciones
router.delete('/:id', deleteCotizacion);



//Router para poder usarlo en app.js o index.js
module.exports = router;