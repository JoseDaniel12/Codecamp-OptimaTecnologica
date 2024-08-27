const jwt = require('jsonwebtoken');

const validateToken = (allowedRoles = []) => {
    return (req, res, next) => {
        if (process.env.NODE_ENV === 'TEST') return next();

        const token = req.headers['access_token'];
        if (!token) return res.status(400).json({msg: 'No se envió token de acceso.'});
    
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, usuario) => {
            if (err) return res.status(400).json({msg: 'El token enviado ha expirado.'});
            req._usuario = usuario;

            // Si no se envían roles permitidos, se permite el acceso a cualquier usuario
            // Si se envían roles permitidos, se verifica que el usuario tenga un rol permitido
            if (allowedRoles.length && !allowedRoles.includes(usuario.rol)) {
                return res.status(403).json({msg: 'No posee un rol autorizado para acceder al recurso.'});
            }

            next();
        });
    };
}

module.exports = validateToken;
