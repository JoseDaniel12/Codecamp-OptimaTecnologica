const express = require('express');
const estadosProcedures = require('../database/procedures/estados.procedures');

const router = express.Router();


// Crear un estado
router.post('/estado', async (req, res) => {
    try {
        const { nombre } = req.body;
        const estado = await estadosProcedures.crearEstado({ nombre });
        return res.status(200).json(estado);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


// Obtener todos los estados
router.get('/', async (_, res) => {
    try {
        const estados = await estadosProcedures.obtenerEstados();
        return res.status(200).json(estados);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


// Obtener un estado por id
router.get('/estado/:idEstado', async (req, res) => {
    try {
        const { idEstado } = req.params;
        const estado = await estadosProcedures.obtenerEstadoPorId(idEstado);
        if (!estado) return res.status(404).json({ error: 'Estado no encontrado.' });
        return res.status(200).json(estado);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


// Actualizar un estado
router.put('/estado/:idEstado', async (req, res) => {
    try {
        const idEstado = parseInt(req.params.idEstado);
        const { nombre } = req.body;
        let estado = await estadosProcedures.obtenerEstadoPorId(idEstado);
        if (!estado) return res.status(404).json({ error: 'Estado no encontrado.' });
        estado.nombre = nombre;
        estado = await estadosProcedures.actualizarEstado(estado);
        return res.status(200).json(estado);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


// Eliminar un estado
router.delete('/estado/:idEstado', async (req, res) => {
    try {
        const idEstado = parseInt(req.params.idEstado);
        await estadosProcedures.eliminarEstadoPorId(idEstado);
        return res.status(200).json({ msg: `Estado con id = ${idEstado} eliminado.` });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


module.exports = router;