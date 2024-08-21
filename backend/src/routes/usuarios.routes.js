const express = require('express');
const usuariosProcedures = require('../database/procedures/usuarios.procedures');

const router = express.Router();

router.post('/usuario', async (req, res) => {
    try {
        const result = await usuariosProcedures.crearUsuario(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/', async (_, res) => {
    try {
        const usuarios = await usuariosProcedures.obtenerUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/usuario/:idUsuario', async (req, res) => {
    try {
        const idUsuario = parseInt(req.params.idUsuario);
        const usuario = await usuariosProcedures.obtenerUsuarioPorId(idUsuario);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado.' });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 


router.put('/usuario/:idUsuario', async (req, res) => {
    try {
        const idUsuario = parseInt(req.params.idUsuario);
        const usuario = await usuariosProcedures.obtenerUsuarioPorId(idUsuario);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado.' });
        const result = await usuariosProcedures.actualizarUsuario({ ...usuario, ...req.body });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.patch('/darBaja/usuario/:idUsuario', async (req, res) => {
    try {
        const idUsuario = parseInt(req.params.idUsuario);
        const result = await usuariosProcedures.darBajaUsuario(idUsuario);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;