const pool = require('../db');

// Buscar usuario por email
const buscarUsuarioPorEmail = async(email) => {
    const result = await pool.query(
        'SELECT * FROM usuarios WHERE email = $1', [email]
    );
    return result.rows[0];
};

// Aumentar intentos fallidos
const aumentarIntentos = async(email) => {
    await pool.query(
        `UPDATE usuarios
       SET intentos_fallidos = intentos_fallidos + 1
     WHERE email = $1`, [email]
    );
};

// Bloquear usuario y anotar fecha de bloqueo
const bloquearUsuario = async(email) => {
    await pool.query(
        `UPDATE usuarios
       SET bloqueado = true,
           fecha_bloqueo = NOW()
     WHERE email = $1`, [email]
    );
};

// Resetear intentos fallidos y limpiar bloqueo
const resetearIntentos = async(email) => {
    await pool.query(
        `UPDATE usuarios
       SET intentos_fallidos = 0,
           bloqueado = false,
           fecha_bloqueo = NULL
     WHERE email = $1`, [email]
    );
};

module.exports = {
    buscarUsuarioPorEmail,
    aumentarIntentos,
    bloquearUsuario,
    resetearIntentos
};