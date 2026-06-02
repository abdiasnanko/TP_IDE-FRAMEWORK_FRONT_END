const express = require('express');
const router = express.Router();
const { updateScore, getLeaderboard } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route protégée — nécessite un token JWT valide
router.post('/score', authMiddleware, updateScore);

// Route publique
router.get('/leaderboard', getLeaderboard);

module.exports = router;