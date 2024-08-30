const express = require('express');
const router = express.Router();
const autenticacionController = require('../controllers/autenticacion.controller');

router.post('/login', autenticacionController.login);

module.exports = router;