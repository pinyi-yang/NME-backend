const express = require('express');
const mongoose = require('mongoose');
const Player = require('./models/player');
const Team = require('./models/team')

const app = express();
app.use(express.urlencoded({extended: false}));

mongoose.connect('mongodb://localhost/nme-backend');

// get '/' - redirect to /teams
app.get('/', (req, res) => {
  res.redirect('/teams');
})


// get '/teams' - send all teams info
app.get('/teams', (req, res) => {
  Team.find({}, function(err, teams) {
    if (err) res.json(err);
    res.json(teams);
  })
})

// post /teams - create a new team
app.post('/teams', (req, res) => {
  Team.create({
    name: req.body.name,
    location: req.body.location,
    conference: req.body.conference
  }, function(err, team) {
    if (err) res.json(err);
    res.json(team);
  })
})

// get /teams/:id - sned datails of a team (include player info)
app.get('/teams/:id', (req, res) => {
  Team.findById(req.params.id).populate('players').exec(function(err, team) {
    if (err) res.json(err);
    res.json(team);
  })
})

// put /teams/:id - update info of a team
app.put('/teams/:id', (req, res) => {
  Team.updateOne({_id: req.params.id}, {
    name: req.body.name,
    location: req.body.location,
    conference: req.body.conference
  }, function(err, response) {
    if (err) res.json(err);
    res.json(response);
  })
})

// delete /teams/:id -delete a team
app.delete('/teams/:id', (req, res) => {
  Team.remove({_id: req.params.id}, function(err, response) {
    if (err) res.json(err);
    res.json(response);
  })
})

// post /players - create a new player to a team
app.post('/players', (req, res) => {
  Player.create({
    name: req.body.name,
    weight: parseInt(req.body.weight),
    height: parseInt(req.body.height),
    position: req.body.position
  }, function(err, player) {
    if (err) res.json(err);
    Team.findById(req.body.team, function(err, team) {
      if (err) res.json(err);
      team.players.push(player._id);
      team.save();
      res.json(player);
    })
  })
});

// get /players/:id - send info of a player 
app.get('/players/:id', (req, res) => {
  Player.findById(req.params.id, function(err, player) {
    if (err) res.json(err);
    res.json(player);
  })
})

// delete /players/:id
app.delete('/players/:id', (req, res) => {
  Player.findOneAndRemove({_id: req.params.id}, function(err, response) {
    if (err) res.json(err);
    Team.update(
      {_id: req.body.team_id},
      {$pull: {players: req.params.id}},
      function(err, response) {
        if (err) res.json(err);
        res.json(response);
      })
  })

  // Team.findById(req.body.team_id, function(err, team) {
  //   if (err) res.json(err);
  //   Team.Player.id(req.params.id).remove();
  //   // team.save();
  //   Player.findByIdAndRemove(req.params.id, function(err, response) {
  //     if(err) res.json(err);
  //     res.json(response);
  //   })
  // })
})


app.listen(3001, function() {
  console.log('Connected to 3000');
})

