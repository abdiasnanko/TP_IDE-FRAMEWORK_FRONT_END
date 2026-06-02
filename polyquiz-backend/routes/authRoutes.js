const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// Route publique de login
router.post('/login', login);

module.exports = router;