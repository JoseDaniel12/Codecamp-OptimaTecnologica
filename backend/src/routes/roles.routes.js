const express = require('express');
const validateToken = require('../middlewares/validateToken');
const { check } = require('express-validator');
const validateAtributes = require('../middlewares/validateAtributes');
const rolesController = require('../controllers/roles.controller');

const router = express.Router();

router.get('/', rolesController.obtenerRoles);

module.exports = router;