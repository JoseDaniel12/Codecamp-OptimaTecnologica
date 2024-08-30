const express = require('express');
const validateToken = require('../middlewares/validateToken');
const rolesUsuario = require('../types/rolesUsuario');
const categoriasController = require('../controllers/categorias.controller');

const router = express.Router();

router.post('/categoria', validateToken([rolesUsuario.ADMIN]), categoriasController.crearCategoria);
router.get('/', validateToken(), categoriasController.obtenerCategorias);
router.get('/categoria/:idCategoria', validateToken(), categoriasController.obtenerCategoriaPorId);
router.put('/categoria/:idCategoria', validateToken(), categoriasController.actualizarCategoria);

module.exports = router;