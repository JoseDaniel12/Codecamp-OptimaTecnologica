const sqlServerConn = require('../sequelize/sqlServerConnection');

const estadosProcedures = {
    crearEstado: async (datos) => {
        try {
            const query = `EXEC CrearEstado @nombre = :nombre;`;
            const result = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    nombre: datos.nombre
                }
            });
            return result[0];
        } catch (error) {
           throw new Error(`Error al crear estado. \n${error.message}`);
        }
    },

    obtenerEstados: async () => {
        try {
            let query = 'EXEC ObtenerEstados;';
            const estados = await sqlServerConn.query(query, { 
                type: sqlServerConn.QueryTypes.SELECT 
            });
            return estados;
        } catch (error) {
            throw new Error(`Error al obtener estados. \n${error.message}`);
        }
    },

    obtenerEstadoPorId: async (idEstado) => {
        try {
            let query = `EXEC ObtenerEstadoPorId @idestados = :idestados;`;
            const estados = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    idestados: idEstado
                }
            });
            const estado = estados[0] || null;
            return estado;
        } catch (error) {
            throw new Error(`Error al obtener estado por id. \n${error.message}`);
        }
    },

    obtenerEstadoPorNombre: async (nombre) => {
        try {
            let query = `EXEC ObtenerEstadoPorNombre @nombre = :nombre;`;
            const estados = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    nombre: nombre
                }
            });
            const estado = estados[0] || null;
            return estado;
        } catch (error) {
            throw new Error(`Error al obtener estado por nombre. \n${error.message}`);
        }
    },

    actualizarEstado: async (datos) => {
        try {
            let query = `EXEC ActualizarEstado @idestados = :idestados, @nombre = :nombre;`;
            const result = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    idestados: datos.idestados,
                    nombre: datos.nombre
                }
            });
            const estado = result[0] || null;
            return estado;
        } catch (error) {
            throw new Error(`Error al actualizar estado. \n${error.message}`);
        }
    },

    eliminarEstadoPorId: async (idEstado) => {
        try {
            let query = `EXEC EliminarEstadoPorId @idestados = :idestados;`;
            await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.DELETE,
                replacements: {
                    idestados: idEstado
                }
            });
        } catch (error) {
            throw new Error(`Error al eliminar estado. \n${error.message}`);
        }
    }
};

module.exports = estadosProcedures;
