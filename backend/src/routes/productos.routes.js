const express = require('express');
const multer  = require('multer');
const { check } = require('express-validator');
const validateAtributes = require('../middlewares/validateAtributes');
const validateToken = require('../middlewares/validateToken');
const rolesUsuario = require('../types/rolesUsuario');
const tiposEstado = require('../types/estados');
const estadosProcedures = require('../database/procedures/estados.procedures');
const productosProcedures = require('../database/procedures/productos.procedures');
const categoriasProcedures = require('../database/procedures/categorias.procedures');

const router = express.Router();


const crearProductoReqChecks = [
    check('CategoriaProductos_idCategoriaProductos').isInt({ min: 1 }).withMessage('El id de la categoría es requerido.'),
    check('nombre').notEmpty().withMessage('El nombre es requerido.'),
    check('marca').notEmpty().withMessage('La marca es requerida.'),
    check('codigo').notEmpty().withMessage('El código es requerido.'),
    check('stock').isInt({ min: 0 }).withMessage('El stock debe ser un número entero positivo.'),
    check('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo.'),
    validateAtributes
];

const upload = multer();
router.post('/producto', [validateToken([rolesUsuario.ADMIN]), upload.single('foto'), crearProductoReqChecks], async (req, res) => {
    try {
        let producto = req.body;
        producto.foto = req.file?.buffer || null;
        producto.usuarios_idusuarios = req._usuario.idusuarios;
        producto.CategoriaProductos_idCategoriaProductos = parseInt(producto.CategoriaProductos_idCategoriaProductos);
        producto.stock = parseInt(producto.stock);
        producto.precio = parseFloat(producto.precio);

        const categorias = await categoriasProcedures.obtenerCategorias();
        if (!categorias.find(c => c.idCategoriaProductos === producto.CategoriaProductos_idCategoriaProductos)) {
            return res.status(400).send({ error: 'El id de la categoría no es válido.' });
        }

        producto = await productosProcedures.crearProducto(producto);
        res.status(200).json({ producto });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        res.status(400).send(error.message);
    }
});


router.get('/', validateToken(), async (req, res) => {
    try {
        const { estado, categoria } = req.query;
        let productos = await productosProcedures.obtenerProductos();
        if (estado) {
            productos = productos.filter(producto => producto.estado === estado);
        }
        if (categoria) {
            productos = productos.filter(producto => producto.categoria === categoria);
        }
        res.json({ productos });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        res.status(400).send(error.message);
    }
});


router.get('/producto/:idProducto', validateToken(), async (req, res) => {
    try {
        const idProducto = parseInt(req.params.idProducto);
        const producto = await productosProcedures.obtenerProductoPorId(idProducto);
        res.json({ producto });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        res.status(400).send(error.message);
    }
});


const actualizarProductoReqChecks = [
    check('nombre').notEmpty().withMessage('El nombre es requerido.'),
    check('marca').notEmpty().withMessage('La marca es requerida.'),
    check('codigo').notEmpty().withMessage('El código es requerido.'),
    check('stock').isInt({ min: 0 }).withMessage('El stock debe ser un número entero positivo.'),
    check('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo.'),
    validateAtributes
];

router.put('/producto/:idProducto', [validateToken([rolesUsuario.ADMIN]), upload.single('foto'), actualizarProductoReqChecks], async (req, res) => {
    try {
        const idProducto = parseInt(req.params.idProducto);
        let nuevosDatosProducto = req.body;
        nuevosDatosProducto.CategoriaProductos_idCategoriaProductos = parseInt(nuevosDatosProducto.CategoriaProductos_idCategoriaProductos);
        nuevosDatosProducto.stock = parseInt(nuevosDatosProducto.stock);
        nuevosDatosProducto.estados_idestados = parseInt(nuevosDatosProducto.estados_idestados);
        nuevosDatosProducto.precio = parseFloat(nuevosDatosProducto.precio);
        
        let producto = await productosProcedures.obtenerProductoPorId(idProducto);
        if (!producto) throw new Error('Producto no encontrado.');

        let foto = req.file?.buffer;
        foto = foto || Buffer.from(producto.foto, 'base64');
        producto = {
            ...producto,
            ...nuevosDatosProducto,
            foto
        }

        const estado = await estadosProcedures.obtenerEstadoPorId(nuevosDatosProducto.estados_idestados);
        if (!estado) return res.status(400).send({ error: 'El estados_idestados no es válido.' });
        if (![tiposEstado.ACTIVO, tiposEstado.INACTIVO].includes(estado.nombre)) {
            return res.status(400).send({ error: 'El estados_idestados no es válido.' });
        }

        const categorias = await categoriasProcedures.obtenerCategorias();
        if (!categorias.find(c => c.idCategoriaProductos === producto.CategoriaProductos_idCategoriaProductos)) {
            return res.status(400).send({ error: 'El id de la categoría no es válido.' });
        }

        producto = await productosProcedures.actualizarProducto(producto);
        res.status(200).json({ producto });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        res.status(400).send({ error: error.message});
    }
});


router.patch('/darBaja/producto/:idProducto', validateToken([rolesUsuario.ADMIN]), async (req, res) => {
    try {
        const producto = await productosProcedures.darDeBajaProducto(req.params.idProducto);
        res.json(producto);
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        res.status(400).send(error.message);
    }
});


module.exports = router;