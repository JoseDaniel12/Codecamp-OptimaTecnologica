const express = require('express');
const { check } = require('express-validator');
const validateAtributes = require('../middlewares/validateAtributes');
const sqlServerConn = require('../database/sequelize/sqlServerConnection');
const _ = require('lodash');
const validateToken = require('../middlewares/validateToken');
const rolesUsuario = require('../types/rolesUsuario');
const tiposEstados = require('../types/estados');
const ordenesProcedures = require('../database/procedures/ordenes.procedures');
const productosProcedures = require('../database/procedures/productos.procedures');
const estadosProcedures = require('../database/procedures/estados.procedures');

const router = express.Router();


router.get('/', validateToken(), async (req, res) => {
    try {
        const { onlyMyOrders='false', categoria, estado } = req.query;
        const ordenes = await ordenesProcedures.obtenerOrdenes();
        if (onlyMyOrders === 'true') {
            const idUsuario = req._usuario.idusuarios;
            ordenes = ordenes.filter(orden => orden.usuarios_idusuarios === idUsuario);
        }
        if (categoria) {
            ordenes = ordenes.filter(orden => orden.categoria === categoria);
        }
        if (estado) {
            ordenes = ordenes.filter(orden => orden.estado === estado);
        }
        res.status(200).json({ ordenes });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        res.status(500).json({ error: error.message });
    }
});


router.get('/orden/:idOrden', validateToken(), async (req, res) => {
    try {
        const idOrden = parseInt(req.params.idOrden);
        const orden = await ordenesProcedures.obtenerOrdenPorId(idOrden);
        if (!orden) return res.status(404).json({ error: 'Orden no encontrada.' });
        return res.status(200).json({ orden });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        return res.status(500).json({ error: error.message });
    }
});


const crearOrdenReqChecks =  [
    check('detallesOrden').isArray({ min: 1 }).withMessage('detallesOrden debe ser un array con al menos un elemento.'),
    check('detallesOrden.*.idProductos').isInt({ min: 1 }).withMessage('idProductos debe ser un número entero positivo.'),
    check('detallesOrden.*.cantidad').isInt({ min: 1 }).withMessage('cantidad debe ser un número entero positivo.'),
    validateAtributes
];

router.post('/orden', [validateToken([rolesUsuario.CLIENTE]), crearOrdenReqChecks], async (req, res) => {
    try {
        await sqlServerConn.transaction(async () => {
            const { detallesOrden } = req.body;
            
            // Crear una orden para el usuario autenticado y obtener los productos de los detalles
            let orden = await ordenesProcedures.crearOrdenPorIdUsuario(req._usuario.idusuarios);
            const productos = await productosProcedures.obtenerProductosPorId(detallesOrden.map(d => d.idProductos));
            const productosPorId = _.keyBy(productos, 'idProductos');

            // Obtener el total de la orden y crear los detalles de la orden
            const detallesCompletosOrden = [];
            for (let d of detallesOrden) {
                if (d.cantidad <= 0) throw new Error('La cantidad de cada producto en la orden debe ser mayor a 0.');

                if (!productosPorId[d.idProductos]) throw new Error(`No existe producto con id=${d.idProductos}.`);
                let producto = productosPorId[d.idProductos];

                if (d.cantidad > producto.stock) {
                    throw new Error('La cantidad de cada producto en la orden no puede ser mayor al stock.');
                } else {
                    producto.stock -= d.cantidad;
                    producto = await productosProcedures.actualizarProducto(producto);
                }

                orden.total_orden += producto.precio * d.cantidad;
                const datosDetalleOrden = {
                    Orden_idOrden: orden.idOrden,
                    Productos_idProductos: producto.idProductos,
                    cantidad: d.cantidad,
                    precio: producto.precio,
                    subtotal: producto.precio * d.cantidad,
                };
                const detalleOrden = await ordenesProcedures.crearOrdenDetalle(datosDetalleOrden);
                detallesCompletosOrden.push(detalleOrden);
            }
    
            // Actualizar el total de la orden y agregar sus detalles completos
            orden = await ordenesProcedures.actualizarOrden(orden);
            orden.detallesOrdenes = detallesCompletosOrden;

            return res.status(201).json({ orden });
        });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        return res.status(500).json({ error: error.message });
    }
});


const procesarOrdenReqChecks = [
    check('nombreEstado').isIn([tiposEstados.ENTREGADO, tiposEstados.RECHAZADO]).withMessage(`Nombre de estado debe ser ${tiposEstados.ENTREGADO} o ${tiposEstados.RECHAZADO}.`),
    validateAtributes
];

router.patch('/orden/:idOrden/procesar', [validateToken([rolesUsuario.ADMIN]), procesarOrdenReqChecks], async (req, res) => {
    try {
        const idOrden = parseInt(req.params.idOrden);
        const { nombreEstado } = req.body;
        
        let estados = await estadosProcedures.obtenerEstados();
        estados = estados.filter(estado => [tiposEstados.ENTREGADO, tiposEstados.RECHAZADO].includes(estado.nombre));

        const nuevoEstado = estados.find(e => e.nombre === nombreEstado);
        if (!nuevoEstado) return res.status(400).json({ error: 'Estado no válido para procesar orden.' });
        
        let orden = await ordenesProcedures.obtenerOrdenPorId(idOrden);
        if (!orden) return res.status(404).json({ error: 'Orden no encontrada.' });
        orden.estados_idestados = nuevoEstado.idestados;
        orden = await ordenesProcedures.actualizarOrden(orden);

        return res.status(200).json(orden);
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        return res.status(500).json({ error: error.message });
    }
});


module.exports = router;