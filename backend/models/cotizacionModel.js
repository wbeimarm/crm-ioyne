const pool = require('../db')

// Crear una nueva cotización
const crearCotizacion = async(cotizacion, productos) => {
    const client = await pool.connect(); // conectamos directamente al cliente de PostgreSQL
    try {
        await client.query('BEGIN'); //Iniciamos una transaccion

        //Insertamos la cotizacion
        const insertCotizacionText = `
        INSERT INTO cotizaciones (numero, 
        id_cliente, 
        id_usuario, 
        envio, 
        descuento_tipo, 
        descuento_valor, 
        subtotal, 
        total)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`;

        const values = [
            cotizacion.numero,
            cotizacion.id_cliente,
            cotizacion.id_usuario,
            cotizacion.envio || 0,
            cotizacion.descuento_tipo || '',
            cotizacion.descuento_valor || 0,
            cotizacion.subtotal,
            cotizacion.total
        ];

        const result = await client.query(insertCotizacionText, values);
        const nuevaCotizacion = result.rows[0]; // guardamos la cotización insertada

        // Insertamos los productos relacionados
        for (const prod of productos) {
            await client.query(
                `INSERT INTO cotizacion_producto (id_cotizacion, id_producto, cantidad, precio_unitario, detalle)
                 VALUES ($1, $2, $3, $4, $5)`, [nuevaCotizacion.id, prod.id_producto, prod.cantidad, prod.precio_unitario, prod.detalle || '']
            );
        }

        await client.query('COMMIT'); // confirmamos la transacción
        return nuevaCotizacion;
    } catch (error) {
        await client.query('ROLLBACK'); // si hay error, deshacemos los cambios
        throw error;
    } finally {
        client.release(); // liberamos la conexión
    }
};


// Obtener todas las cotizaciones con sus productos asociados
const obtenerCotizaciones = async() => {
    const client = await pool.connect();
    try {
        // Primero obtenemos todas las cotizaciones
        const cotizacionesResult = await client.query('SELECT * FROM cotizaciones');
        const cotizaciones = cotizacionesResult.rows;

        // Para cada cotización, obtenemos sus productos relacionados
        for (const cotizacion of cotizaciones) {
            const productosResult = await client.query(
                `SELECT * FROM cotizacion_producto WHERE id_cotizacion = $1`, [cotizacion.id]
            );
            cotizacion.productos = productosResult.rows; // se agrega como propiedad
        }

        return cotizaciones;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
};

// Obtener una cotización por su ID
const obtenerCotizacionPorid = async(idCotizacion) => {
    const client = await pool.connect();
    try {
        // 1. Buscar los datos de la cotización principal
        const cotizacionResult = await client.query(` SELECT * FROM cotizaciones WHERE id = $1`, [idCotizacion]);

        // Si no existe, devolvemos null
        if (cotizacionResult.rows.length === 0) {
            return null;
        }

        const cotizacion = cotizacionResult.rows[0];

        // 2. Buscar los productos asociados a esa cotización

        const productosResult = await client.query(`SELECT * FROM cotizacion_producto WHERE id_cotizacion = $1`, [idCotizacion]);
        cotizacion.productos = productosResult.rows;

        return cotizacion;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

// Editar cotización por ID
const editarCotizacion = async(id, cotizacion) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const updateText = `
        UPDATE cotizaciones SET
            numero = $1,
            id_cliente = $2,
            id_usuario = $3,
            envio = $4,
            descuento_tipo = $5,
            descuento_valor = $6,
            subtotal = $7,
            total = $8
        WHERE id = $9
        RETURNING *`;

        const values = [
            cotizacion.numero,
            cotizacion.id_cliente,
            cotizacion.id_usuario,
            cotizacion.envio || 0,
            cotizacion.descuento_tipo || '',
            cotizacion.descuento_valor || 0,
            cotizacion.subtotal,
            cotizacion.total,
            id
        ];

        const result = await client.query(updateText, values);

        await client.query('COMMIT');

        return result.rows[0]; // Devuelve la cotización actualizada
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

// Función para actualizar los productos de una cotización
const actualizarProductosDeCotizacion = async(id_cotizacion, productos) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN'); // Iniciamos la transacción

        // 1. Eliminar los productos anteriores de esta cotización
        await client.query(
            'DELETE FROM cotizacion_producto WHERE id_cotizacion = $1', [id_cotizacion]
        );

        // 2. Insertar los nuevos productos
        for (const producto of productos) {
            const { id_producto, cantidad, precio_unitario, detalle } = producto;
            await client.query(
                `INSERT INTO cotizacion_producto 
                (id_cotizacion, id_producto, cantidad, precio_unitario, detalle) 
                VALUES ($1, $2, $3, $4, $5)`, [id_cotizacion, id_producto, cantidad, precio_unitario, detalle]
            );
        }

        await client.query('COMMIT'); // Confirmamos la transacción
    } catch (error) {
        await client.query('ROLLBACK'); // Revertimos si hay error
        throw error;
    } finally {
        client.release(); // Cerramos conexión
    }
};


//Eliminar cotizacion y productos asociados
const eliminarCotizacion = async(req, res) => {
    try {
        //Primero eliminamos los productos asociados a esta cotizacion
        await pool.query('DELETE FROM cotizacion_producto WHERE id_cotizacion = $1', [id]);

        //Aqui eliminamos la cotización
        const resultado = await pool.query('DELETE FROM cotizacione WHERE id = $1 RETURNING *', [id]);
        // Si no se encontro y se elimino ninguna fila, retornamos Null
        if (resultado.rowCount === 0) {
            return null;
        }

        // Retornamos la cotización eliminada
        return resultado.rows[0];
    } catch (error) {
        console.error('Error al eliminar cotizacion', error);
        throw error;
    }
}

module.exports = {
    crearCotizacion,
    obtenerCotizaciones,
    obtenerCotizacionPorid,
    editarCotizacion,
    actualizarProductosDeCotizacion,
    eliminarCotizacion
};