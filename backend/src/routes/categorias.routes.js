const express = require('express');
const categoriasProcedures = require('../database/procedures/categorias.procedures');

const router = express.Router();

router.post('/categoria', async (req, res) => {
    try {
        const result = await categoriasProcedures.crearCategoria(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/', async (_, res) => {
    try {
        const categorias = await categoriasProcedures.obtenerCategorias();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/categoria/:idCategoria', async (req, res) => {
    try {
        const idCategoria = parseInt(req.params.idCategoria);
        const categoria = await categoriasProcedures.obtenerCategoriaPorId(idCategoria);
        if (!categoria) return res.status(404).json({ error: 'Categoria no encontrada.' });
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/categoria/:idCategoria', async (req, res) => {
    try {
        const idCategoria = parseInt(req.params.idCategoria);
        const categoria = await categoriasProcedures.obtenerCategoriaPorId(idCategoria);
        if (!categoria) return res.status(404).json({ error: 'Categoria no encontrada.' });
        const result = await categoriasProcedures.actualizarCategoria({ ...categoria, ...req.body });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.patch('/darBaja/categoria/:idCategoria', async (req, res) => {
    try {
        const idCategoria = parseInt(req.params.idCategoria);
        const result = await categoriasProcedures.darBajaCategoriaPorId(idCategoria);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;