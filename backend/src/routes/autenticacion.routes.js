const express = require('express');
const jwt = require('jsonwebtoken');
const usuariosProcedures = require('../database/procedures/usuarios.procedures');
const { compare } = require('../helpers/handleBcrypt');

const router = express.Router();


router.post('/login', async (req, res) => {
    const { correo_electronico, password } = req.body;

    const usuario = await usuariosProcedures.obtenerUsuarioPorCorreo(correo_electronico);
    if (!usuario) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
    } else if (!(await compare(password, usuario.password))) {
        return res.status(400).send({ message: 'Contraseña incorrecta' });
    }
    
    delete usuario.password;
    const access_token = jwt.sign(usuario, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '24h'
    });

    const datosUsuario = {
        nombre: usuario.nombre_completo,
        correo_electronico: usuario.correo_electronico,
        rol: usuario.rol,
        rol_idrol: usuario.rol_idrol
    };
    
    res.status(200).send({ usuario: datosUsuario, access_token });
});


module.exports = router;