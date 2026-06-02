const User = require('../models/User');

// POST /api/users/score — Route protégée
const updateScore = async (req, res) => {
  try {
    const { score } = req.body;

    // Vérifier que le score est bien envoyé
    if (score === undefined || score === null) {
      return res.status(400).json({ message: 'Le score est obligatoire.' });
    }

    // Récupérer l'_id depuis req.user (injecté par authMiddleware)
    const userId = req.user._id;

    // Trouver l'utilisateur en BDD
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    // Mettre à jour uniquement si le nouveau score est STRICTEMENT supérieur
    if (score > user.bestScore) {
      user.bestScore = score;
      await user.save();

      return res.status(200).json({
        message: '🏆 Nouveau record personnel !',
        bestScore: user.bestScore
      });
    }

    // Score inférieur ou égal, on ne met pas à jour
    res.status(200).json({
      message: 'Score enregistré mais pas meilleur que ton record.',
      bestScore: user.bestScore
    });

  } catch (err) {
    console.error('Erreur updateScore :', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// GET /api/leaderboard — Route publique
const getLeaderboard = async (req, res) => {
  try {
    const topPlayers = await User.find()
      .sort({ bestScore: -1 })   // tri décroissant
      .limit(10)                  // TOP 10 seulement
      .select('pseudo bestScore -_id'); // pas d'infos sensibles

    res.status(200).json({
      leaderboard: topPlayers
    });

  } catch (err) {
    console.error('Erreur getLeaderboard :', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

module.exports = { updateScore, getLeaderboard };