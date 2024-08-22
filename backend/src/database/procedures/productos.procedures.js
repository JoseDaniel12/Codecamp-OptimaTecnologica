const sqlServerConn = require('../sequelize/sqlServerConnection');

// Nota: para ver imagen en base64 en el frontend, se debe agregar data:image/jpeg;base64, 
// al inicio de la cadena en formato base64

const productosProcedures = {
    crearProducto: async (datos) => {
        try {
            const query = `
                EXEC CrearProducto 
                    @CategoriaProductos_idCategoriaProductos = :CategoriaProductos_idCategoriaProductos,
                    @usuarios_idusuarios = :usuarios_idusuarios,
                    @nombre = :nombre,
                    @marca = :marca,
                    @codigo = :codigo,
                    @stock = :stock,
                    @estados_idestados = :estados_idestados,
                    @precio = :precio,
                    @foto = :foto;
            `;
            const result = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    CategoriaProductos_idCategoriaProductos: datos.Categoria_idCategoria,
                    usuarios_idusuarios: datos.usuarios_idusuarios,
                    nombre: datos.nombre,
                    marca: datos.marca,
                    codigo: datos.codigo,
                    stock: datos.stock,
                    estados_idestados: datos.estados_idestados,
                    precio: datos.precio,
                    foto: datos.foto,
                },
            });
            const producto = result[0];
            if (producto.foto) producto.foto = Buffer.from(producto.foto).toString('base64');
            return result[0];
        } catch (error) {
            throw new Error(`Error al crear producto. \n${error.message}`);
        }
    },

    obtenerProductos: async () => {
        try {
            const query = 'EXEC ObtenerProductos;';
            let productos = await sqlServerConn.query(query, { 
                type: sqlServerConn.QueryTypes.SELECT 
            });
            productos = productos.map(p => {
                if (p.foto) p.foto = Buffer.from(p.foto).toString('base64');
                return p;
            });
            return productos;
        } catch (error) {
            throw new Error(`Error al obtener productos. \n${error.message}`);
        }
    },

    obtenerProductoPorId: async (idProducto) => {
        try {
            const query = `EXEC ObtenerProductoPorId @idProductos = :idProductos;`;
            const productos = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    idProductos: idProducto
                }
            });
            const producto = productos[0] || null;
            if (producto?.foto) producto.foto = Buffer.from(producto.foto).toString('base64');
            return producto;
        } catch (error) {
            throw new Error(`Error al obtener producto por id. \n${error.message}`);
        }
    },

    actualizarProducto: async (datos) => {
        try {
            const query = `
                EXEC ActualizarProducto
                    @idProductos = :idProductos,
                    @CategoriaProductos_idCategoriaProductos = :CategoriaProductos_idCategoriaProductos,
                    @usuarios_idusuarios = :usuarios_idusuarios,
                    @nombre = :nombre,
                    @marca = :marca,
                    @codigo = :codigo,
                    @stock = :stock,
                    @estados_idestados = :estados_idestados,
                    @precio = :precio,
                    @foto = :foto;
            `;
            const result = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    idProductos: datos.idProductos,
                    CategoriaProductos_idCategoriaProductos: datos.CategoriaProductos_idCategoriaProductos,
                    usuarios_idusuarios: datos.usuarios_idusuarios,
                    nombre: datos.nombre,
                    marca: datos.marca,
                    codigo: datos.codigo,
                    stock: datos.stock,
                    estados_idestados: datos.estados_idestados,
                    precio: datos.precio,
                    foto: datos.foto,
                },
            });
            return result;
        } catch (error) {
            throw new Error(`Error al actualizar producto. \n${error.message}`);
        }
    },

    darDeBajaProducto: async (idProducto) => {
        try {
            const query = `EXEC DarDeBajaProducto @idProductos = :idProductos;`;
            const result = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    idProductos: idProducto
                }
            });
            producto = result[0] || null;
            if (producto?.foto) producto.foto = Buffer.from(producto.foto).toString('base64');
            return producto;
        } catch (error) {
            throw new Error(`Error al dar de baja producto. \n${error.message}`);
        }
    }
};

module.exports = productosProcedures;