const { encrypt } = require('../helpers/handleBcrypt');
const tiposEstado = require('../types/estados');
const usuariosProcedures = require('../database/procedures/usuarios.procedures');
const rolesProcedures = require('../database/procedures/roles.procedures');
const estadosProcedures = require('../database/procedures/estados.procedures');


const crearUsuario = async (req, res) => {
    try {
        let usuario = req.body;
        const usuarioExistente = await usuariosProcedures.obtenerUsuarioPorCorreo(usuario.correo_electronico);
        if (usuarioExistente) {
            return res.status(400).json({ error: 'Ya existe un usuario con ese correo electrónico.' });
        }

        const hash = await encrypt(usuario.password);
        usuario = { ...usuario, password: hash };

        usuario = await usuariosProcedures.crearUsuario(usuario);
        res.status(200).json({ usuario });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        res.status(500).json({ error: error.message });
    }
};


const obtenerUsuarios = async (req, res) => {
    try {
        const { idEstado, idRol } = req.query;
        let usuarios = await usuariosProcedures.obtenerUsuarios();
        if (idEstado) {
            usuarios = usuarios.filter(usuario => usuario.estados_idestados === parseInt(idEstado));
        }
        if (idRol) {
            usuarios = usuarios.filter(usuario => usuario.rol_idrol === parseInt(idRol));
        }
        res.status(200).json({ usuarios });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        res.status(500).json({ error: error.message });
    }
};


const obtenerUsuarioPorId = async (req, res) => {
    try {
        const idUsuario = parseInt(req.params.idUsuario);
        const usuario = await usuariosProcedures.obtenerUsuarioPorId(idUsuario);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado.' });
        res.status(200).json({ usuario });  
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        res.status(500).json({ error: error.message });
    }
};


const actualizarUsuario = async (req, res) => {
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
};


const darBajaUsuario = async (req, res) => {
    try {
        const idUsuario = parseInt(req.params.idUsuario);
        const usuario = await usuariosProcedures.darBajaUsuario(idUsuario);
        res.status(200).json({ usuario });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    darBajaUsuario
};