const express = require('express');
const validateToken = require('../middlewares/validateToken');
const rolesUsuario = require('../types/rolesUsuario');
const estados = require('../types/estados');
const categoriasProcedures = require('../database/procedures/categorias.procedures');
const estadosProcedures = require('../database/procedures/estados.procedures');

const router = express.Router();


router.post('/categoria', validateToken([rolesUsuario.ADMIN]), async (req, res) => {
    try {
        const _usuario = req._usuario;
        const { nombre } = req.body;

        const categorias = await categoriasProcedures.obtenerCategorias();
        const categoriaExistente = categorias.find(categoria => categoria.nombre === nombre);
        if (categoriaExistente) return res.status(400).json({ error: 'Ya existe una categoria con ese nombre.' });
        
        const datosCategoria = {
            usuarios_idusuarios: _usuario.idusuarios,
            nombre
        }; 
        const categoria = await categoriasProcedures.crearCategoria(datosCategoria);
        res.status(201).json(categoria);
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        res.status(500).json({ error: error.message });
    }
});


router.get('/', validateToken(), async (req, res) => {
    try {
        const { estado } = req.query;
        let categorias = await categoriasProcedures.obtenerCategorias();
        if (estado) {
            categorias = categorias.filter(c => c.estado === estado);
        }
        res.status(200).json({ categorias });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        res.status(500).json({ error: error.message });
    }
});


router.get('/categoria/:idCategoria', validateToken(), async (req, res) => {
    try {
        const idCategoria = parseInt(req.params.idCategoria);
        const categoria = await categoriasProcedures.obtenerCategoriaPorId(idCategoria);
        if (!categoria) return res.status(404).json({ error: 'Categoria no encontrada.' });
        res.status(200).json({ categoria });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        res.status(500).json({ error: error.message });
    }
});


router.put('/categoria/:idCategoria', validateToken(), async (req, res) => {
    try {
        const idCategoria = parseInt(req.params.idCategoria);
        const { nombre, estados_idestados } = req.body;

        let categoria = await categoriasProcedures.obtenerCategoriaPorId(idCategoria);
        if (!categoria) return res.status(404).json({ error: 'Categoria no encontrada.' });

        const categoriaExistente = await categoriasProcedures.obtenerCategoriaPorNombre(nombre);
        if (categoriaExistente && categoriaExistente.idCategoriaProductos != idCategoria) {
            return res.status(400).json({ error: 'Ya existe una categoria con ese nombre.' });
        }

        const estado = await estadosProcedures.obtenerEstadoPorId(estados_idestados);
        if (!estado) return res.status(400).json({ error: 'El estado no es válido.' });
        if (![estados.ACTIVO, estados.INACTIVO].includes(estado.nombre)) return res.status(400).json({ error: 'No se puede asignar ese estado a la categoria.' });

        categoria.nombre = nombre;
        categoria.estados_idestados = estados_idestados;
        categoria = await categoriasProcedures.actualizarCategoria(categoria);
        res.status(200).json({ categoria });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;