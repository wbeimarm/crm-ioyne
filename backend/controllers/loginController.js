const {
    buscarUsuarioPorEmail,
    aumentarIntentos,
    bloquearUsuario,
    resetearIntentos
} = require('../models/loginModel');

const loginUsuario = async(req, res) => {
    const { email, contraseña } = req.body;

    try {
        const usuario = await buscarUsuarioPorEmail(email);
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Email o contraseña incorrectos' });
        }

        // Si está bloqueado, comprobamos el tiempo
        if (usuario.bloqueado) {
            const ahora = new Date();
            const bloqueo = usuario.fecha_bloqueo;
            const dosHoras = 2 * 60 * 60 * 1000; // ms
            if (bloqueo && (ahora - bloqueo) < dosHoras) {
                // Menos de 2 horas: sigue bloqueado
                return res
                    .status(403)
                    .json({ mensaje: 'Cuenta bloqueada. Inténtalo más tarde.' });
            }
            // Ya pasaron 2 horas: desbloquear y continuar
            await resetearIntentos(email);
            usuario.bloqueado = false;
            usuario.intentos_fallidos = 0;
        }

        // Contraseña incorrecta
        if (usuario.contraseña !== contraseña) {
            await aumentarIntentos(email);
            const actualizado = await buscarUsuarioPorEmail(email);
            if (actualizado.intentos_fallidos >= 3) {
                await bloquearUsuario(email);
                return res
                    .status(403)
                    .json({ mensaje: 'Cuenta bloqueada por 3 intentos fallidos.' });
            }
            return res.status(401).json({ mensaje: 'Email o contraseña incorrectos' });
        }

        // Login exitoso
        await resetearIntentos(email);
        res.json({ mensaje: 'Inicio de sesión exitoso', usuario });

    } catch (error) {
        console.error('Error en login', error);
        res.status(500).json({ mensaje: 'Error del servidor en login' });
    }
};

module.exports = {
    loginUsuario
};