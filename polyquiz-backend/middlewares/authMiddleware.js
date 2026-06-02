const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Récupérer le header Authorization
  const authHeader = req.headers['authorization'];

  // Vérifier sa présence et son format "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
  }

  // Extraire le token
  const token = authHeader.split(' ')[1];

  try {
    // Décoder et vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attacher l'utilisateur décodé à la requête
    req.user = decoded;

    // Passer au contrôleur suivant
    next();

  } catch (err) {
    return res.status(401).json({ message: 'Token invalide ou expiré.' });
  }
};

module.exports = authMiddleware;