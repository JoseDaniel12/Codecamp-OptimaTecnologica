const express = require('express');
const router = express.Router();

router.use('/estados', require('./estados.routes'));
router.use('/usuarios', require('./usuarios.routes'));
router.use('/categorias', require('./categorias.routes'));
router.use('/ordenes', require('./ordenes.routes'));
router.use('/productos', require('./productos.routes'));
router.use('/autenticacion', require('./autenticacion.routes'));
router.use('/roles', require('./roles.routes'));

module.exports = router;
