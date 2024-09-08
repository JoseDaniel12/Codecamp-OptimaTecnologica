const express = require('express');
const multer  = require('multer');
const { check } = require('express-validator');
const validateAtributes = require('../middlewares/validateAtributes');
const validateToken = require('../middlewares/validateToken');
const rolesUsuario = require('../types/rolesUsuario');
const productosController = require('../controllers/productos.controller');

const router = express.Router();
const upload = multer();

const crearProductoReqChecks = [
    check('CategoriaProductos_idCategoriaProductos').isInt({ min: 1 }).withMessage('El id de la categoría es requerido.'),
    check('nombre').notEmpty().withMessage('El nombre es requerido.'),
    check('marca').notEmpty().withMessage('La marca es requerida.'),
    check('codigo').notEmpty().withMessage('El código es requerido.'),
    check('stock').isInt({ min: 0 }).withMessage('El stock debe ser un número entero positivo.'),
    check('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo.'),
    validateAtributes
];
router.post('/producto', [validateToken([rolesUsuario.ADMIN]), upload.single('foto'), crearProductoReqChecks], productosController.crearProducto);

router.get('/', validateToken(), productosController.obtenerProductos);
router.get('/producto/:idProducto', validateToken(), productosController.obtenerProductoPorId);

const actualizarProductoReqChecks = [
    check('nombre').notEmpty().withMessage('El nombre es requerido.'),
    check('marca').notEmpty().withMessage('La marca es requerida.'),
    check('codigo').notEmpty().withMessage('El código es requerido.'),
    check('stock').isInt({ min: 0 }).withMessage('El stock debe ser un número entero positivo.'),
    check('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo.'),
    validateAtributes
];
router.put('/producto/:idProducto', [validateToken(), upload.single('foto'), actualizarProductoReqChecks], productosController.actualizarProducto);

router.patch('/darBaja/producto/:idProducto', validateToken([rolesUsuario.ADMIN]), productosController.darDeBajaProducto);

module.exports = router;