const expres = require('express');
const cors = require('cors');
const app = expres();

// Cargamos variables de entorno desde el archivo .env
require('dotenv').config;

//Importamos las rutas de usuarios
const usuarioRoutes = require('./routes/usuarioRoutes');

// Activamos middlewares
app.use(cors());
app.use(expres.json());

//Ruta base
app.get('/', (req, res) => {
    res.send('¡Servidor CRM IOYNE funcionando!')
});


//Usamos las rutas de usuarios
app.use('/api/usuarios', usuarioRoutes);

//Encendemos el servidor en el puerto configurado
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost: ${PORT}`)
})