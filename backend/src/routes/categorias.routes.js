const express = require('express');
const sqlServerConn = require('../database/sequelize/sqlServerConnection');

const router = express.Router();

router.get('/', async (_, res) => {
    try {
        const categorias = ['Preuba'];
        return res.status(200).json(categorias);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;