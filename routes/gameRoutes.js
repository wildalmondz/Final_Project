'use strict';

var express = require('express');
var gameMatch = require ('../node_modules/colorGen/color');
var app = express();
var router = express.Router();

router.route('/')
.post(function (req, res) {
    var newGame = req.body;
    var playerName = newGame.name;
    var playerColors = [newGame.box_0, newGame.box_1, newGame.box_2, newGame.box_3];
    console.log(playerName + ',' + playerColors + ',');

    if (!newGame) {
        res.status(400).send('error sending game to server');
    }

    var serverColors = gameMatch.getColors(playerColors);

    // Might need to put the subroutine here
    var score = gameMatch.getScore(playerColors, serverColors)
    // console.log('Player ROUTE: ' + playerColors);
    console.log('Server ROUTE: ' + serverColors);
    console.log('Score :' + score);
    // set the backbone values here???
    res.send(serverColors);
    // = foodTrucks.addTruck(newTruck);

})

.get(function (req, res) {
    var serverColors = gameMatch.getColors();
    // console.log(serverColors);
    res.json(serverColors);
    // res.json({ colors: array });
    // trying to get rid of Can't set headers error
});

module.exports = router;