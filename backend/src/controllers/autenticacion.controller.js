const jwt = require('jsonwebtoken');
const usuariosProcedures = require('../database/procedures/usuarios.procedures');
const { compare } = require('../helpers/handleBcrypt');

const login = async (req, res) => {
    try {
        const { correo_electronico, password } = req.body;

        const usuario = await usuariosProcedures.obtenerUsuarioPorCorreo(correo_electronico);

        if (!usuario) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        } 
        
        const matchContrasenia = await compare(password, usuario.password);
        if (!matchContrasenia) {
            return res.status(400).send({ error: 'Contraseña incorrecta' });
        }
        
        delete usuario.password;
        const access_token = jwt.sign(usuario, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '24h'
        });
    
        const datosUsuario = {
            nombre_completo: usuario.nombre_completo,
            correo_electronico: usuario.correo_electronico,
            rol: usuario.rol,
            rol_idrol: usuario.rol_idrol
        };
        
        res.status(200).send({ usuario: datosUsuario, access_token });
    } catch (error) {
        if (process.env.NODE_ENV === 'development') console.error(error);
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    login
};