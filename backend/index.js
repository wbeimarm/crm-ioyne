// backend/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // ✅ ejecutar la función correctamente

const app = express();

// Importamos las rutas de usuarios
const usuarioRoutes = require('./routes/usuarioRoutes');

// Activamos middlewares
app.use(cors());
app.use(express.json()); // ✅ corregido

// Ruta base
app.get('/', (req, res) => {
    res.send('¡Servidor CRM IOYNE funcionando!');
});

// Usamos las rutas de usuarios
app.use('/api/usuarios', usuarioRoutes);

// Encendemos el servidor en el puerto configurado
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});