const tiposEstado = require('../types/estados');
const estadosProcedures = require('../database/procedures/estados.procedures');
const productosProcedures = require('../database/procedures/productos.procedures');
const categoriasProcedures = require('../database/procedures/categorias.procedures');
const rolesUsuario = require('../types/rolesUsuario');


const crearProducto = async (req, res) => {
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
};


const obtenerProductos = async (req, res) => {
    try {
        const { idCategoria } = req.query;
        let productos = await productosProcedures.obtenerProductos();

        if (req._usuario.rol_idrol === rolesUsuario.CLIENTE) {
            productos = productos.filter(producto => producto.estados_idestados === tiposEstado.ACTIVO);
        }
    
        if (idCategoria) {
            productos = productos.filter(producto => producto.CategoriaProductos_idCategoriaProductos === parseInt(idCategoria));
        }
        res.json({ productos });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        res.status(400).send(error.message);
    }
};


const obtenerProductoPorId = async (req, res) => {
    try {
        const idProducto = parseInt(req.params.idProducto);
        const producto = await productosProcedures.obtenerProductoPorId(idProducto);
        res.json({ producto });
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        res.status(400).send(error.message);
    }
};


const actualizarProducto = async (req, res) => {
    try {
        const idProducto = parseInt(req.params.idProducto);
        let nuevosDatosProducto = req.body;
        nuevosDatosProducto.CategoriaProductos_idCategoriaProductos = parseInt(nuevosDatosProducto.CategoriaProductos_idCategoriaProductos);
        nuevosDatosProducto.stock = parseInt(nuevosDatosProducto.stock);
        nuevosDatosProducto.estados_idestados = parseInt(nuevosDatosProducto.estados_idestados);
        nuevosDatosProducto.precio = parseFloat(nuevosDatosProducto.precio);
        
        let producto = await productosProcedures.obtenerProductoPorId(idProducto);
        if (!producto) throw new Error('Producto no encontrado.');

        const foto = req.file?.buffer || null;
        producto = {
            ...producto,
            ...nuevosDatosProducto,
            foto
        }

        const estado = await estadosProcedures.obtenerEstadoPorId(nuevosDatosProducto.estados_idestados);
        if (!estado) return res.status(400).send({ error: 'El estados_idestados no es válido.' });
        if (![tiposEstado.ACTIVO, tiposEstado.INACTIVO].includes(estado.idestados)) {
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
};


const darDeBajaProducto = async (req, res) => {
    try {
        const producto = await productosProcedures.darDeBajaProducto(req.params.idProducto);
        res.json(producto);
    } catch (error) {
        if (process.env.NODE_ENV === 'DEV') console.error(error);
        res.status(400).send(error.message);
    }
};


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    darDeBajaProducto
};