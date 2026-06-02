const mongoose = require('mongoose');
require('dotenv').config();

const Question = require('./models/Question');

const questions = [
  {
    category: "F1",
    text: "Quel pilote a remporté le plus de championnats du monde de F1 ?",
    options: ["Michael Schumacher", "Lewis Hamilton", "Ayrton Senna", "Sebastian Vettel"],
    correctAnswer: "Lewis Hamilton"
  },
  {
    category: "F1",
    text: "Quelle écurie a dominé la saison F1 2023 ?",
    options: ["Ferrari", "Mercedes", "Red Bull", "McLaren"],
    correctAnswer: "Red Bull"
  },
  {
    category: "F1",
    text: "Sur quel circuit se déroule le Grand Prix de Monaco ?",
    options: ["Silverstone", "Monza", "Monte-Carlo", "Spa"],
    correctAnswer: "Monte-Carlo"
  },
  {
    category: "Manga",
    text: "Quel est le vrai nom de Naruto Uzumaki ?",
    options: ["Naruto Namikaze", "Naruto Uzumaki", "Naruto Uchiha", "Naruto Senju"],
    correctAnswer: "Naruto Uzumaki"
  },
  {
    category: "Manga",
    text: "Dans quel manga trouve-t-on le personnage 'Monkey D. Luffy' ?",
    options: ["Bleach", "One Piece", "Dragon Ball", "Fairy Tail"],
    correctAnswer: "One Piece"
  },
  {
    category: "Manga",
    text: "Quel est le pouvoir principal de Goku dans Dragon Ball Z ?",
    options: ["Sharingan", "Haki", "Ki / Énergie vitale", "Chakra"],
    correctAnswer: "Ki / Énergie vitale"
  },
  {
    category: "Informatique",
    text: "Que signifie l'acronyme 'HTTP' ?",
    options: [
      "HyperText Transfer Protocol",
      "High Transfer Text Protocol",
      "HyperText Transmission Process",
      "Host Transfer Text Protocol"
    ],
    correctAnswer: "HyperText Transfer Protocol"
  },
  {
    category: "Informatique",
    text: "Quel langage est principalement utilisé pour styliser les pages web ?",
    options: ["HTML", "JavaScript", "CSS", "Python"],
    correctAnswer: "CSS"
  },
  {
    category: "Géographie",
    text: "Quelle est la capitale du Cameroun ?",
    options: ["Douala", "Bafoussam", "Garoua", "Yaoundé"],
    correctAnswer: "Yaoundé"
  },
  {
    category: "Géographie",
    text: "Quel est le plus grand océan du monde ?",
    options: ["Atlantique", "Indien", "Arctique", "Pacifique"],
    correctAnswer: "Pacifique"
  },
];

const seedDB = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connecté à MongoDB');

    // Purger les questions existantes
    await Question.deleteMany();
    console.log('🗑️  Anciennes questions supprimées');

    // Insérer les nouvelles questions
    await Question.insertMany(questions);
    console.log(`🌱 ${questions.length} questions insérées avec succès !`);

    // Fermer la connexion et quitter
    process.exit(0);

  } catch (err) {
    console.error('❌ Erreur lors du seeding :', err);
    process.exit(1);
  }
};

seedDB();