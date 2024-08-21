require('dotenv').config();

// IMPORTS
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// VARIABLES
const corsOptions = { origin: true, optionSuccessStatus: 200 };

// APPLICATION
const app = express();

// MIDLEWARES
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


// ROUTES
app.get('/', async (_, res) => {
    return res.status(200).json({ msg: 'CodeCamp - Optima Tecnologica - José Alvarado.' });
});

app.use('/estados', require('./routes/estados.routes'));
app.use('/roles', require('./routes/roles.routes'));
app.use('/usuarios', require('./routes/usuarios.routes'));
app.use('/categorias', require('./routes/categorias.routes'));
app.use('/ordenes', require('./routes/ordenes.routes'));
app.use('/productos', require('./routes/productos.routes'));

module.exports = app;