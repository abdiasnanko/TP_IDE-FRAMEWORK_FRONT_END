const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
  try {
    const { pseudo } = req.body;

    // Vérifier que le pseudo est bien envoyé
    if (!pseudo || pseudo.trim() === '') {
      return res.status(400).json({ message: 'Le pseudo est obligatoire.' });
    }

    // Chercher l'utilisateur en BDD
    let user = await User.findOne({ pseudo: pseudo.toLowerCase() });

    // S'il n'existe pas, on le crée avec un score de 0
    if (!user) {
      user = await User.create({ pseudo: pseudo.toLowerCase(), bestScore: 0 });
      console.log(`✅ Nouvel utilisateur créé : ${user.pseudo}`);
    } else {
      console.log(`👤 Utilisateur existant connecté : ${user.pseudo}`);
    }

    // Générer le token JWT (valide 2 heures)
    const token = jwt.sign(
      { _id: user._id, pseudo: user.pseudo },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // Renvoyer le token au client
    res.status(200).json({
      message: `Bienvenue ${user.pseudo} !`,
      token: token,
      user: {
        _id: user._id,
        pseudo: user.pseudo,
        bestScore: user.bestScore
      }
    });

  } catch (err) {
    console.error('Erreur login :', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

module.exports = { login };