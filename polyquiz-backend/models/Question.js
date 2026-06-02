const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    validate: {
      validator: (arr) => arr.length >= 2 && arr.length <= 4,
      message: 'Il faut entre 2 et 4 options.'
    }
  },
  correctAnswer: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Question', questionSchema);