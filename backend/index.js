const expres = require('express');
const cors = require('cors');
require('dotenv').config;

const app = expres();
app.use(cors());
app.use(expres.json());

app.get('/', (req, res) => {
    res.send('¡Servidor CRM IOYNE funcionando!')
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost: ${PORT}`)
})