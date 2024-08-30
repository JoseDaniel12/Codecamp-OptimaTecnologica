const express = require('express');
const { check } = require('express-validator');
const validateAtributes = require('../middlewares/validateAtributes');
const validateToken = require('../middlewares/validateToken');
const rolesUsuario = require('../types/rolesUsuario');
const tiposEstados = require('../types/estados');
const ordenesController = require('../controllers/ordenes.controller');

const router = express.Router();


router.get('/', validateToken(), ordenesController.obtenerOrdenes);
router.get('/orden/:idOrden', validateToken(), ordenesController.obtenerOrdenPorId);

const crearOrdenReqChecks =  [
    check('detallesOrden').isArray({ min: 1 }).withMessage('detallesOrden debe ser un array con al menos un elemento.'),
    check('detallesOrden.*.idProductos').isInt({ min: 1 }).withMessage('idProductos debe ser un número entero positivo.'),
    check('detallesOrden.*.cantidad').isInt({ min: 1 }).withMessage('cantidad debe ser un número entero positivo.'),
    validateAtributes
];
router.post('/orden', [validateToken([rolesUsuario.CLIENTE]), crearOrdenReqChecks], ordenesController.crearOrden);


const procesarOrdenReqChecks = [
    check('idEstado').isIn([tiposEstados.ENTREGADO, tiposEstados.RECHAZADO]).withMessage(`Se reuqiere Id de estado Entregado o Rehcazado.`),
    validateAtributes
];
router.patch('/orden/:idOrden/procesar', [validateToken([rolesUsuario.ADMIN]), procesarOrdenReqChecks], ordenesController.procesarOrden);

module.exports = router;