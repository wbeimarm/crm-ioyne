// backend/index.js


// IMPORTACIONES

const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Carga variables de entorno desde .env

// Rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const loginRoutes = require('./routes/loginRoutes');
const clienteRoutes = require('./routes/clientesRoutes');
const productosRoutes = require('./routes/productosRoutes');


//  CONFIGURACIÓN INICIAL

const app = express();


//  MIDDLEWARES

app.use(cors()); // Habilitamos CORS (permite conexiones entre servidores)
app.use(express.json()); // Permite recibir datos en formato JSON


//  RUTA BASE

app.get('/', (req, res) => {
    res.send('¡Servidor CRM IOYNE funcionando!');
});


//  USO DE RUTAS

app.use('/api/usuarios', usuarioRoutes); // Ruta para usuarios
app.use('/api/login', loginRoutes); // Ruta para login
app.use('/api/clientes', clienteRoutes); // Ruta para clientes
app.use('/api/productos', productosRoutes); // Ruta para productos


//  SERVIDOR

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
});