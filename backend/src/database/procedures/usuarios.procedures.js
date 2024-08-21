const sqlServerConn = require('../sequelize/sqlServerConnection');

const usuariosProcedures = {
    crearUsuario: async (datos) => {
        try {
            const query = `
                EXEC CrearUsuario 
                    @rol_idrol = :rol_idrol,
                    @estados_idestados = :estados_idestados,
                    @correo_electronico = :correo_electronico,
                    @nombre_completo = :nombre_completo,
                    @password = :password,
                    @telefono = :telefono,
                    @fecha_nacimiento = :fecha_nacimiento;
            `;
            const result = await sqlServerConn.query(query, {
                replacements: {
                    rol_idrol: datos.rol_idrol,
                    estados_idestados: datos.estados_idestados,
                    correo_electronico: datos.correo_electronico,
                    nombre_completo: datos.nombre_completo,
                    password: datos.password,
                    telefono: datos.telefono,
                    fecha_nacimiento: datos.fecha_nacimiento,
                },
            });
            return result[0];
        } catch (error) {
            throw new Error(`Error al crear usuario. \n${error.message}`);
        }
    },

    obtenerUsuarios: async () => {
        try {
            let query = 'EXEC ObtenerUsuarios;';
            const usuarios = await sqlServerConn.query(query, { 
                type: sqlServerConn.QueryTypes.SELECT 
            });
            return usuarios;
        } catch (error) {
            throw new Error(`Error al obtener usuarios. \n${error.message}`);
        }
    },

    obtenerUsuarioPorId: async (idUsuario) => {
        try {
            let query = `EXEC ObtenerUsuarioPorId @idusuarios = :idusuarios;`;
            const usuarios = await sqlServerConn.query(query, {
                type: sqlServerConn.QueryTypes.SELECT,
                replacements: {
                    idusuarios: idUsuario
                }
            });
            const usuario = usuarios[0] || null;
            return usuario;
        } catch (error) {
            throw new Error(`Error al obtener usuario por id. \n${error.message}`);
        }
    },

    actualizarUsuario: async (datos) => {
        try {
            let query = `
                EXEC ActualizarUsuario 
                    @idusuarios = :idusuarios,
                    @rol_idrol = :rol_idrol,
                    @estados_idestados = :estados_idestados,
                    @correo_electronico = :correo_electronico,
                    @nombre_completo = :nombre_completo,
                    @password = :password,
                    @telefono = :telefono,
                    @fecha_nacimiento = :fecha_nacimiento;
            `;
            const usuario = await sqlServerConn.query(query, {
                replacements: {
                    idusuarios: datos.idusuarios,
                    rol_idrol: datos.rol_idrol,
                    estados_idestados: datos.estados_idestados,
                    correo_electronico: datos.correo_electronico,
                    nombre_completo: datos.nombre_completo,
                    password: datos.password,
                    telefono: datos.telefono,
                    fecha_nacimiento: datos.fecha_nacimiento,
                },
            });
            return usuario;
        } catch (error) {
            throw new Error(`Error al actualizar usuario. \n${error.message}`);
        }
    },

    darBajaUsuario: async (idUsuario) => {
        try {
            let query = `EXEC DarBajaUsuario @idusuarios = :idusuarios;`;
            const usuario = await sqlServerConn.query(query, {
                replacements: {
                    idusuarios: idUsuario
                }
            });
            return usuario;
        } catch (error) {
            throw new Error(`Error al dar de baja usuario. \n${error.message}`);
        }
    }
};

module.exports = usuariosProcedures;