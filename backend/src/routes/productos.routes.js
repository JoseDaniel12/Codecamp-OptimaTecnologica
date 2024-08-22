const express = require('express');
const multer  = require('multer');
const productosProcedures = require('../database/procedures/productos.procedures');

const router = express.Router();


const upload = multer();
router.post('/producto', upload.single('foto'), async (req, res) => {
    try {
        req.body.foto = req.file.buffer;
        const producto = await productosProcedures.crearProducto(req.body);
        res.status(200).json(producto);
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});


router.get('/', async (req, res) => {
    try {
        const productos = await productosProcedures.obtenerProductos();
        res.json(productos);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


router.get('/producto/:idProducto', async (req, res) => {
    try {
        const idProducto = parseInt(req.params.idProducto);
        const producto = await productosProcedures.obtenerProductoPorId(idProducto);
        res.json(producto);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


router.put('/producto/:idProducto', upload.single('foto'), async (req, res) => {
    try {
        let foto = req.file?.buffer;
        const idProducto = parseInt(req.params.idProducto);
        let producto = await productosProcedures.obtenerProductoPorId(idProducto);
        if (!producto) throw new Error('Producto no encontrado.');
        foto = foto || Buffer.from(producto.foto, 'base64');
        producto = {
            ...producto,
            ...req.body,
            foto
        }
        producto = await productosProcedures.actualizarProducto(producto);
        res.status(200).json(producto);
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});


router.patch('/darBaja/producto/:idProducto', async (req, res) => {
    try {
        const producto = await productosProcedures.darDeBajaProducto(req.params.idProducto);
        res.json(producto);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


module.exports = router;