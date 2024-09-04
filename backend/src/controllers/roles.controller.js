const  rolesProcedures = require('../database/procedures/roles.procedures');

const obtenerRoles = async (req, res) => {
    try {
        const roles = await rolesProcedures.obtenerRoles();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los roles'
        });
    }
};

module.exports = {
    obtenerRoles
};
