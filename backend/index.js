// backend/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // ✅ ejecutar la función correctamente

const app = express();

// Importamos las rutas de usuarios
const usuarioRoutes = require('./routes/usuarioRoutes');

const loginRoutes = require('./routes/loginRoutes')

// importamos ruta clientes
const clienteRoutes = require('./routes/clientesRoutes');

// Activamos middlewares
app.use(cors());
app.use(express.json()); // ✅ corregido

// Ruta base
app.get('/', (req, res) => {
    res.send('¡Servidor CRM IOYNE funcionando!');
});

// Usamos las rutas de usuarios
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/login', loginRoutes);

// rutas de cliente
app.use('/api/clientes', clienteRoutes);

// Encendemos el servidor en el puerto configurado
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});