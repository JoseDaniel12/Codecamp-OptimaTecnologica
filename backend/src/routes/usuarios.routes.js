const express = require('express');
const validateToken = require('../middlewares/validateToken');
const { check } = require('express-validator');
const validateAtributes = require('../middlewares/validateAtributes');
const { encrypt } = require('../helpers/handleBcrypt');
const rolesUsuario = require('../types/rolesUsuario');
const tiposEstado = require('../types/estados');
const usuariosProcedures = require('../database/procedures/usuarios.procedures');
const rolesProcedures = require('../database/procedures/roles.procedures');
const estadosProcedures = require('../database/procedures/estados.procedures');

const router = express.Router();

const crearUsuarioReqChecks = [
    check('rol_idrol').isInt({ min: 1 }).withMessage('El rol_idrol es requerido y debe ser un id de rol válido.'),
    check('correo_electronico').isEmail().withMessage('El correo electrónico no es válido.'),
    check('nombre_completo').notEmpty().withMessage('El nombre completo es requerido.'),
    check('direccion').notEmpty().withMessage('La dirección es requerida.'),
    check('password').notEmpty().withMessage('La contraseña es requerida.'),
    check('telefono').notEmpty().withMessage('El teléfono es requerido.'),
    check('fecha_nacimiento').isDate().withMessage('La fecha de nacimiento no es válida.'),
    validateAtributes
];

router.post('/usuario', crearUsuarioReqChecks, async (req, res) => {
    try {
        let usuario = req.body;
        const hash = await encrypt(usuario.password);
        usuario = { ...usuario, password: hash };

        const usuarioExistente = await usuariosProcedures.obtenerUsuarioPorCorreo(usuario.correo_electronico);
        if (usuarioExistente) {
            return res.status(400).json({ error: 'Ya existe un usuario con ese correo electrónico.' });
        }

        usuario = await usuariosProcedures.crearUsuario(usuario);
        res.status(200).json({ usuario });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        res.status(500).json({ error: error.message });
    }
});


router.get('/', validateToken(), async (req, res) => {
    try {
        const { estado, rol } = req.query;
        let usuarios = await usuariosProcedures.obtenerUsuarios();
        if (estado) {
            usuarios = usuarios.filter(usuario => usuario.estado === estado);
        }
        if (rol) {
            usuarios = usuarios.filter(usuario => usuario.rol === rol);
        }
        res.status(200).json({ usuarios });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        res.status(500).json({ error: error.message });
    }
});


router.get('/usuario/:idUsuario', validateToken(), async (req, res) => {
    try {
        const idUsuario = parseInt(req.params.idUsuario);
        const usuario = await usuariosProcedures.obtenerUsuarioPorId(idUsuario);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado.' });
        res.status(200).json({ usuario });  
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        res.status(500).json({ error: error.message });
    }
}); 


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

router.put('/usuario/:idUsuario', [validateToken(), actualizarUsuarioReqChecks], async (req, res) => {
    try {
        const idUsuario = parseInt(req.params.idUsuario);
        let nuevosDatosUsuario = req.body;
        let usuario = await usuariosProcedures.obtenerUsuarioPorId(idUsuario);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado.' });

        if (nuevosDatosUsuario.correo_electronico) {
            const usuarioExistente = await usuariosProcedures.obtenerUsuarioPorCorreo(nuevosDatosUsuario.correo_electronico);
            if (usuarioExistente && usuarioExistente.idusuarios !== idUsuario) {
                return res.status(400).json({ error: 'Ya existe un usuario con ese correo electrónico.' });
            }
        }

        if (nuevosDatosUsuario.password) {
            const hash = await encrypt(nuevosDatosUsuario.password);
            nuevosDatosUsuario = { ...nuevosDatosUsuario, password: hash };
        }

        if (nuevosDatosUsuario.rol_idrol) {
            const roles = await rolesProcedures.obtenerRoles();
            const rol = roles.find(rol => rol.idrol === nuevosDatosUsuario.rol_idrol);
            if (!rol) return res.status(400).json({ error: 'El rol_idrol no es válido.' });
        }

        if (nuevosDatosUsuario.estados_idestados) {
            const estados = await estadosProcedures.obtenerEstados();
            const estado = estados.find(estado => estado.idestados === nuevosDatosUsuario.estados_idestados);
            if (!estado) return res.status(400).json({ error: 'El estados_idestados no es válido.' });
            if (![tiposEstado.ACTIVO, tiposEstado.INACTIVO].includes(estado.nombre)) {
                return res.status(400).json({ error: 'El id del estado no es válido para un usuario.' });
            }
        }

        usuario = await usuariosProcedures.actualizarUsuario({ ...usuario, ...nuevosDatosUsuario });
        res.status(200).json({ usuario });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        res.status(500).json({ error: error.message });
    }
});


router.patch('/darBaja/usuario/:idUsuario', validateToken(), async (req, res) => {
    try {
        const idUsuario = parseInt(req.params.idUsuario);
        const usuario = await usuariosProcedures.darBajaUsuario(idUsuario);
        res.status(200).json({ usuario });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;