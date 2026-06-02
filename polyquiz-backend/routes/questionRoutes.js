const express = require('express');
const router = express.Router();
const { getAllQuestions } = require('../controllers/questionController');

// Route publique
router.get('/', getAllQuestions);

module.exports = router;