// Importamos la función correcta desde el modelo
const {
    crearCotizacion,
    obtenerCotizaciones,
    obtenerCotizacionPorid,
    editarCotizacion,
    actualizarProductosDeCotizacion,
    eliminarCotizacion,
} = require('../models/cotizacionModel');

// Función para manejar la creación de una cotización
const postCotizacion = async(req, res) => {
    try {
        // Extraemos los datos del cuerpo de la solicitud
        const { productos, ...datosCotizacion } = req.body;

        // Creamos la cotización con sus productos
        const nuevaCotizacion = await crearCotizacion(datosCotizacion, productos);

        // Respondemos al cliente
        res.status(201).json({
            mensaje: 'Cotización creada exitosamente',
            cotizacion: nuevaCotizacion
        });
    } catch (error) {
        console.error('Error al crear cotización:', error);
        res.status(500).json({ mensaje: 'Error al crear cotización' });
    }

};

// Función para obtener todas las cotizaciones con sus productos
const getCotizaciones = async(req, res) => {
    try {
        const cotizaciones = await obtenerCotizaciones();
        res.status(200).json(cotizaciones);
    } catch (error) {
        console.error('Error al obtener cotizaciones:', error);
        res.status(500).json({ mensaje: 'Error al obtener cotizaciones' });
    }
};

// Funcion para obtener cotizacion por id
const getcotizacionPorId = async(req, res) => {
    const id = req.params.id;
    try {
        const cotizacion = await obtenerCotizacionPorid(id);
        if (!cotizacion) {
            return res.status(404).json({ mensaje: 'Cotización  no encontrada' });
        }
        res.json(cotizacion);
    } catch (error) {
        console.error('Error al obtener cotización:', error);
        res.status(500).json({ mensaje: 'Error al obtener ctizacion' });
    }
};


// Función para editar una cotización y sus productos
const putCotizacion = async(req, res) => {
    try {
        const { id } = req.params; // Obtenemos el ID desde la URL
        const cotizacionActualizada = req.body.cotizacion; // Datos de la cotización
        const productosActualizados = req.body.productos; // Lista de productos (si viene)

        // Editamos los datos generales de la cotización
        const resultado = await editarCotizacion(id, cotizacionActualizada);

        // Si no se encontró la cotización
        if (!resultado) {
            return res.status(404).json({ mensaje: 'Cotización no encontrada' });
        }

        // Si también vienen productos, los actualizamos
        if (productosActualizados && Array.isArray(productosActualizados)) {
            await actualizarProductosDeCotizacion(id, productosActualizados);
        }

        // Enviamos respuesta
        res.json({ mensaje: 'Cotización actualizada correctamente', cotizacion: resultado });

    } catch (error) {
        console.error('Error al editar cotización:', error);
        res.status(500).json({ mensaje: 'Error al editar cotización' });
    }
};

// Eliminar una cotización por su ID
const deleteCotizacion = async(req, res) => {
    try {
        const { id } = req.params; // Obtenemos el ID de la URL

        // Llamamos al modelo para eliminar la cotización
        const resultado = await eliminarCotizacion(id);

        // Si no se encontró la cotización
        if (!resultado) {
            return res.status(404).json({ mensaje: 'Cotización no encontrada' });
        }

        // Todo salió bien
        res.json({ mensaje: 'Cotización eliminada correctamente', cotizacion: resultado });
    } catch (error) {
        console.error('Error al eliminar cotización:', error);
        res.status(500).json({ mensaje: 'Error al eliminar cotización ' });
    }
};
module.exports = {
    postCotizacion,
    getCotizaciones,
    getcotizacionPorId,
    putCotizacion,
    deleteCotizacion
};