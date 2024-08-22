const sqlServerConn = require('../sequelize/sqlServerConnection');

const categoriasProcedures = {
    crearCategoria: async (datos) => {
        try {
            const query = `
                EXEC CrearCategoria 
                    @usuarios_idusuarios = :usuarios_idusuarios,
                    @nombre = :nombre,
                    @estados_idestados = :estados_idestados;
            `;
            const result = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    usuarios_idusuarios: datos.usuarios_idusuarios,
                    nombre: datos.nombre,
                    estados_idestados: datos.estados_idestados,
                }
            });
            return result[0];
        } catch (error) {
            throw new Error(`Error al crear categoria. \n${error.message}`);
        }
    },

    obtenerCategorias: async () => {
        try {
            let query = 'EXEC ObtenerCategorias;';
            const categorias = await sqlServerConn.query(query, { 
                type: sqlServerConn.QueryTypes.SELECT 
            });
            return categorias;
        } catch (error) {
            throw new Error(`Error al obtener categorias. \n${error.message}`);
        }
    },

    obtenerCategoriaPorId: async (idCategoria) => {
        try {
            let query = `EXEC ObtenerCategoriaPorId @idCategoriaProductos = :idCategoriaProductos;`;
            const categorias = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    idCategoriaProductos: idCategoria
                }
            });
            const categoria = categorias[0] || null;
            return categoria;
        } catch (error) {
            throw new Error(`Error al obtener categoria por id. \n${error.message}`);
        }
    },

    actualizarCategoria: async (datos) => {
        try {
            const query = `
                EXEC ActualizarCategoria 
                    @idcategorias = :idcategorias,
                    @usuarios_idusuarios = :usuarios_idusuarios,
                    @nombre = :nombre;
                    @estados_idestados = :estados_idestados;
            `;
            const result = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    idcategorias: datos.idcategorias,
                    usuarios_idusuarios: datos.usuarios_idusuarios,
                    nombre: datos.nombre,
                    estados_idestados: datos.estados_idestados,
                }
            });
            return result[0];
        } catch (error) {
            throw new Error(`Error al actualizar categoria. \n${error.message}`);
        }
    },

    darBajaCategoriaPorId: async (idCategoria) => {
        try {
            const query = `
                EXEC DarBajaCategoriaPorId 
                    @idCategoriaProductos = :idCategoriaProductos;
            `;
            const result = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    idCategoriaProductos: idCategoria
                }
            });
            return result[0];
        } catch (error) {
            throw new Error(`Error al dar de baja categoria. \n${error.message}`);
        }
    },
};

module.exports = categoriasProcedures;