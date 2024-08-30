const express = require('express');
const validateToken = require('../middlewares/validateToken');
const rolesUsuario = require('../types/rolesUsuario');
const estadosController = require('../controllers/estados.controller');

const router = express.Router();

router.post('/estado', validateToken(), estadosController.crearEstado);
router.get('/', validateToken(), estadosController.obtenerEstados);
router.get('/estado/:idEstado', validateToken(), estadosController.obtenerEstadoPorId);
router.put('/estado/:idEstado', validateToken(), estadosController.actualizarEstado);
router.delete('/estado/:idEstado', validateToken(), estadosController.eliminarEstado);

module.exports = router;