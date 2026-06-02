const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+$/,         // pas d'espaces
    set: (val) => val.toLowerCase() // converti en minuscules
  },
  bestScore: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('User', userSchema);