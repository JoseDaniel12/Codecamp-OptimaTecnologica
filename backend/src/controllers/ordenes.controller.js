const sqlServerConn = require('../database/sequelize/sqlServerConnection');
const _ = require('lodash');
const rolesUsuario = require('../types/rolesUsuario');
const tiposEstados = require('../types/estados');
const ordenesProcedures = require('../database/procedures/ordenes.procedures');
const productosProcedures = require('../database/procedures/productos.procedures');
const estadosProcedures = require('../database/procedures/estados.procedures');

const obtenerOrdenes = async (req, res) => {
    try {
        const { idEstado } = req.query;
        let ordenes = await ordenesProcedures.obtenerOrdenes();
    
        if (req._usuario.rol_idrol === rolesUsuario.CLIENTE) {
            ordenes = ordenes.filter(orden => orden.usuarios_idusuarios === req._usuario.idusuarios);
        }

        if (idEstado) {
            ordenes = ordenes.filter(orden => orden.estados_idestados === parseInt(idEstado));
        }
        res.status(200).json({ ordenes });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        res.status(500).json({ error: error.message });
    }
};


const obtenerOrdenPorId = async (req, res) => {
    try {
        const idOrden = parseInt(req.params.idOrden);
        const orden = await ordenesProcedures.obtenerOrdenPorId(idOrden);
        if (!orden) return res.status(404).json({ error: 'Orden no encontrada.' });
        return res.status(200).json({ orden });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        return res.status(500).json({ error: error.message });
    }
};


const obtenerDetallesOrden = async (req, res) => {
    try {
        const idOrden = parseInt(req.params.idOrden);
        const detallesOrden = await ordenesProcedures.obtenerDetallesOrden(idOrden);
        res.status(200).json({ detallesOrden });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        return res.status(500).json({ error: error.message });
    }
};


const crearOrden = async (req, res) => {
    try {
        await sqlServerConn.transaction(async () => {
            const { detallesOrden } = req.body;

            // Obtener los productos por id para obtener su precio y stock
            const productos = await productosProcedures.obtenerProductosPorId(detallesOrden.map(d => d.idProductos));
            const productosPorId = _.keyBy(productos, 'idProductos');

            // Obtener los datos completos de los detalles de la orden
            const detallesCompletosOrden = [];
            for (let d of detallesOrden) {
                if (!productosPorId[d.idProductos]) throw new Error(`No existe producto con id=${d.idProductos}.`);
                let producto = productosPorId[d.idProductos];

                if (d.cantidad > producto.stock) {
                    throw new Error('La cantidad de cada producto en la orden no puede ser mayor al stock.');
                } else {
                    producto.stock -= d.cantidad;
                    producto = await productosProcedures.actualizarProducto(producto);
                }

                const datosDetalleOrden = {
                    Productos_idProductos: producto.idProductos,
                    cantidad: d.cantidad,
                    precio: producto.precio,
                    subtotal: producto.precio * d.cantidad,
                };
                detallesCompletosOrden.push(datosDetalleOrden);
            }

            let orden = {
                usuarios_idusuarios: req._usuario.idusuarios,
                detallesOrden: detallesCompletosOrden
            }

            orden = await ordenesProcedures.crearOrdenConDetalles(orden);
            return res.status(201).json({ orden });
        });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        return res.status(500).json({ error: error.message });
    }
};


const procesarOrden = async (req, res) => {
    try {
        const idOrden = parseInt(req.params.idOrden);
        const { idEstado } = req.body;
        
        let estados = await estadosProcedures.obtenerEstados();
        estados = estados.filter(estado => [tiposEstados.ENTREGADO, tiposEstados.RECHAZADO].includes(estado.idestados));

        const nuevoEstado = estados.find(e => e.idestados === idEstado);
        if (!nuevoEstado) return res.status(400).json({ error: 'Estado no válido para procesar orden.' });
        
        let orden = await ordenesProcedures.obtenerOrdenPorId(idOrden);
        if (!orden) return res.status(404).json({ error: 'Orden no encontrada.' });
        if (nuevoEstado.idestados === tiposEstados.ENTREGADO) {
            orden.estados_idestados = nuevoEstado.idestados;
            orden.fecha_entrega = new Date();
            orden = await ordenesProcedures.actualizarOrden(orden);
        } else if (nuevoEstado.idestados === tiposEstados.RECHAZADO) {
            orden = await ordenesProcedures.rechazarOrdenPorId(idOrden);
        }
        return res.status(200).json({ orden });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        return res.status(500).json({ error: error.message });
    }
};


module.exports = {
    obtenerOrdenes,
    obtenerOrdenPorId,
    obtenerDetallesOrden,
    crearOrden,
    procesarOrden,
};