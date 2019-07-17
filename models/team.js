const mongoose = require('mongoose');
const Player = require('./player');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  location: String,
  conference: String,
  players: [{type: mongoose.Schema.Types.ObjectId, ref:'Player'}]
});

module.exports = mongoose.model('Team', teamSchema);