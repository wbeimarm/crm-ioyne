const {
    buscarUsuarioPorEmail,
    aumentarIntentos,
    bloquearUsuario,
    resetearIntentos,
} = require('../models/loginModel');

// Controlador para el login
const loginUsuario = async(req, res) => {
    const { email, contraseña } = req.body;

    try {
        const usuario = await buscarUsuarioPorEmail(email);
        console.log('Usuario encontrado:', usuario);
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Email o contraseña incorrectos' });
        }

        if (usuario.bloqueado) {
            return res.status(403).json({ mensaje: 'Cuenta bloqueada. Contacta al administrador.' });
        }

        if (usuario.contraseña !== contraseña) {
            //Aumenta intentos fallidos
            await aumentarIntentos(usuario.email);

            // Volver a buscar el usuario actualizado
            const usuarioActualizado = await buscarUsuarioPorEmail(usuario.email);

            if (usuario.intentos_fallidos + 1 >= 3) {
                await bloquearUsuario(usuario.email);
                return res.status(403).json({ mensaje: 'Cuenta bloqueada por 3 intentos fallidos.' });
            }

            return res.status(401).json({ mensaje: 'Email o contraseña incorrectos' });
        }

        // Login exitoso
        await resetearIntentos(usuario.email);
        res.json({ mensaje: 'Inicio de sesión exitoso', usuario });

    } catch (error) {
        console.error('Error en login', error);
        res.status(500).json({ mensaje: 'Error del servidor en login' });
    }
};

module.exports = {
    loginUsuario,
};