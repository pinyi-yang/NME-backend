const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  weight: Number,
  height: Number,
  position: {
    type: String,
    enum: ['C', 'PG', 'SG', 'SF', 'PF', 'F', 'G']
  }
})

module.exports = mongoose.model('Player', playerSchema);