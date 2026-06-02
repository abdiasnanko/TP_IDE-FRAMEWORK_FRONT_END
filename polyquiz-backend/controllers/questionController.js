const Question = require('../models/Question');

// GET /api/questions — Route publique
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();

    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: 'Aucune question trouvée.' });
    }

    res.status(200).json({
      count: questions.length,
      questions: questions
    });

  } catch (err) {
    console.error('Erreur getAllQuestions :', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

module.exports = { getAllQuestions };