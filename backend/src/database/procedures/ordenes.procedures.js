const sqlServerConn = require('../sequelize/sqlServerConnection');

const ordenesProcedures = {
    crearOrden: async (datos) => {
        try {
            const query = `
                EXEC CrearOrden 
                    @usuarios_idusuarios = :usuarios_idusuarios,
                    @estados_idestados = :estados_idestados,
                    @nombre_completo = :nombre_completo,
                    @direccion = :direccion,
                    @telefono = :telefono,
                    @correo_electronico = :correo_electronico,
                    @fecha_entrega = :fecha_entrega,
                    @total_orden = :total_orden,
            `;
            const result = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    usuarios_idusuarios: datos.usuarios_idusuarios,
                    estados_idestados: datos.estados_idestados,
                    nombre_completo: datos.nombre_completo,
                    direccion: datos.direccion,
                    telefono: datos.telefono,
                    correo_electronico: datos.correo_electronico,
                    fecha_entrega: datos.fecha_entrega,
                    total_orden: datos.total_orden
                }
            });
            return result[0];
        } catch (error) {
            throw new Error(`Error al crear orden. \n${error.message}`);
        }
    },

    crearOrdenConDetalles: async (datos) => {
        try {
            const query = `
                EXEC CrearOrdenConDetalles
                    @usuarios_idusuarios = :usuarios_idusuarios,
                    @detalles = :detalles
            `;
            const result = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    usuarios_idusuarios: datos.usuarios_idusuarios,
                    detalles: JSON.stringify(datos.detallesOrden)

                },
                plain: true
            });
            return result;
        } catch (error) {
            throw new Error(`Error al crear orden. \n${error.message}`);
        }
    },


    crearOrdenPorIdUsuario: async (idUsuario) => {
        try {
            const query = `
                EXEC CrearOrdenPorIdUsuario
                    @usuarios_idusuarios = :usuarios_idusuarios
            `;
            const result = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    usuarios_idusuarios: idUsuario
                }
            });
            const orden = result[0];
            return orden;
        } catch (error) {
            throw new Error(`Error al crear orden por id de usuario. \n${error.message}`);
        }
    },

    obtenerOrdenes: async () => {
        try {
            let query = 'EXEC ObtenerOrdenes;';
            const ordenes = await sqlServerConn.query(query, { 
                type: sqlServerConn.QueryTypes.SELECT 
            });
            return ordenes;
        } catch (error) {
            throw new Error(`Error al obtener ordenes. \n${error.message}`);
        }
    },

    obtenerOrdenPorId: async (idOrden) => {
        try {
            let query = `EXEC ObtenerOrdenPorId @idOrden = :idOrden;`;
            const ordenes = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    idOrden: idOrden
                }
            });
            const orden = ordenes[0] || null;
            return orden;
        } catch (error) {
            throw new Error(`Error al obtener orden por id. \n${error.message}`);
        }
    },

    obtenerDetallesOrden: async (idOrden) => {
        try {
            let query = `EXEC ObtenerDetallesOrden @idOrden = :idOrden;`;
            let detallesOrden = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    idOrden: idOrden
                }
            });
            detallesOrden = detallesOrden.map(d => {
                if (d.foto) d.foto = Buffer.from(d.foto).toString('base64');
                return d;
            });
            return detallesOrden;
        } catch (error) {
            throw new Error(`Error al obtener detalles de orden. \n${error.message}`);
        }
    },

    actualizarOrden: async (datos) => {
        try {
            let query = `
                EXEC ActualizarOrden 
                    @idOrden = :idOrden,
                    @usuarios_idusuarios = :usuarios_idusuarios,
                    @estados_idestados = :estados_idestados,
                    @nombre_completo = :nombre_completo,
                    @direccion = :direccion,
                    @telefono = :telefono,
                    @correo_electronico = :correo_electronico,
                    @fecha_entrega = :fecha_entrega,
                    @total_orden = :total_orden
            `;
            const result = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    idOrden: datos.idOrden,
                    usuarios_idusuarios: datos.usuarios_idusuarios,
                    estados_idestados: datos.estados_idestados,
                    nombre_completo: datos.nombre_completo,
                    direccion: datos.direccion,
                    telefono: datos.telefono,
                    correo_electronico: datos.correo_electronico,
                    fecha_entrega: datos.fecha_entrega,
                    total_orden: datos.total_orden
                }
            });
            const orden = result[0];
            return orden;
        } catch (error) {
            throw new Error(`Error al actualizar orden. \n${error.message}`);
        }
    },

    darDeBajaOrdenPorId: async (idOrden) => {
        try {
            let query = `EXEC DarDeBajaOrdenPorId @idOrden = :idOrden;`;
            const ordenes = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    idOrden: idOrden
                }
            });
            return ordenes;
        } catch (error) {
            throw new Error(`Error al dar de baja orden por id. \n${error.message}`);
        }
    },

    rechazarOrdenPorId: async (idOrden) => {
        try {
            let query = `EXEC RecharzarOrden @idOrden = :idOrden;`;
            const response = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    idOrden: idOrden
                }
            });
            const orden = response[0] || null;
            return orden;
        } catch (error) {
            throw new Error(`Error al rechazar orden por id. \n${error.message}`);
        }
    },

    crearOrdenDetalle: async (datos) => {
        try {
            let query = `
                EXEC CrearOrdenDetalle
                    @Orden_idOrden = :Orden_idOrden,
                    @Productos_idProductos = :Productos_idProductos,
                    @cantidad = :cantidad,
                    @precio = :precio,
                    @subtotal = :subtotal
            `;
            const result = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    Orden_idOrden: datos.Orden_idOrden,
                    Productos_idProductos: datos.Productos_idProductos,
                    cantidad: datos.cantidad,
                    precio: datos.precio,
                    subtotal: datos.subtotal
                }
            });
            return result[0];
        } catch (error) {
            throw new Error(`Error al crear detalle de orden. \n${error.message}`);
        }
    }
};

module.exports = ordenesProcedures;