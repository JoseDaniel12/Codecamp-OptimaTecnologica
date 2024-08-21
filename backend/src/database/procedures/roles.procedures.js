const sqlServerConn = require('../sequelize/sqlServerConnection');

const rolesProcedures = {
   crearRol: async (datos) => {
         try {
            const query = `EXEC CrearRol @nombre = :nombre;`;
            const result = await sqlServerConn.query(query, {
            type: sqlServerConn.QueryTypes.SELECT,
            replacements: {
                nombre: datos.nombre
            }
            });
            return result[0];
        } catch (error) {
            throw new Error(`Error al crear rol. \n${error.message}`);
        }
    },

    obtenerRoles: async () => {
        try {
            const query = `EXEC ObtenerRoles;`;
            const result = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT
            });
            return result;
        } catch (error) {
            throw new Error(`Error al obtener roles. \n${error.message}`);
        }
    },

    obtenerRolPorId: async (idRol) => {
        try {
            const query = `EXEC ObtenerRolPorId @idrol = :idrol;`;
            const result = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    idrol: idRol
                }
            });
            const rol = result[0] || null;
            return rol;
        } catch (error) {
            throw new Error(`Error al obtener rol por id. \n${error.message}`);
        }
    },

    actualizarRol: async (datos) => {
        try {
            const query = `EXEC ActualizarRol @idrol = :idrol, @nombre = :nombre;`;
            const result = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    idrol: datos.idrol,
                    nombre: datos.nombre
                }
            });
            return result[0];
        } catch (error) {
            throw new Error(`Error al actualizar rol. \n${error.message}`);
        }
    },

    eliminarRolPorId: async (idRol) => {
        try {
            const query = `EXEC EliminarRolPorId @idrol = :idrol;`;
            const result = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    idrol: idRol
                }
            });
            return result[0];
        } catch (error) {
            throw new Error(`Error al eliminar rol por id. \n${error.message}`);
        }
    }
};


module.exports = rolesProcedures;