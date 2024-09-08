const express = require('express');
const validateToken = require('../middlewares/validateToken');
const { check } = require('express-validator');
const validateAtributes = require('../middlewares/validateAtributes');
const usuariosController = require('../controllers/usuarios.controller');

const router = express.Router();

const crearUsuarioReqChecks = [
    check('rol_idrol').isInt({ min: 1 }).withMessage('El rol_idrol es requerido y debe ser un id de rol válido.'),
    check('correo_electronico').isEmail().withMessage('El correo electrónico no es válido.'),
    check('nombre_completo').notEmpty().withMessage('El nombre completo es requerido.'),
    check('direccion').notEmpty().withMessage('La dirección es requerida.'),
    check('password').notEmpty().withMessage('La contraseña es requerida.'),
    check('telefono').notEmpty().withMessage('El teléfono es requerido.'),
    // check('fecha_nacimiento').isDate().withMessage('La fecha de nacimiento no es válida.'),
    validateAtributes
];
router.post('/usuario', crearUsuarioReqChecks, usuariosController.crearUsuario);

router.get('/', validateToken(), usuariosController.obtenerUsuarios);
router.get('/usuario/:idUsuario', validateToken(), usuariosController.obtenerUsuarioPorId); 

const actualizarUsuarioReqChecks = [
    check('rol_idrol').optional().isInt({ min: 1 }).withMessage('El rol_idrol es requerido y debe ser un id de rol válido.'),
    check('correo_electronico').optional().isEmail().withMessage('El correo electrónico no es válido.'),
    check('nombre_completo').optional().notEmpty().withMessage('El nombre completo es requerido.'),
    check('direccion').optional().notEmpty().withMessage('La dirección es requerida.'),
    check('password').optional().notEmpty().withMessage('La contraseña es requerida.'),
    check('telefono').optional().notEmpty().withMessage('El teléfono es requerido.'),
    check('fecha_nacimiento').optional().isDate().withMessage('La fecha de nacimiento no es válida.'),
    validateAtributes
];
router.put('/usuario/:idUsuario', [validateToken(), actualizarUsuarioReqChecks], usuariosController.actualizarUsuario);

router.patch('/darBaja/usuario/:idUsuario', validateToken(), usuariosController.darBajaUsuario);

module.exports = router;