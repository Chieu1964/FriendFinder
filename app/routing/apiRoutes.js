// Dependencies

var path = require('path');
var bodyParser = require('body-parser');

//================================
// LOAD DATA
// ===============================

var friends = require('../data/friends.js');
console.log(friends);

// ====================================
// ROUTING
// ====================================
module.exports = function (app) {
    // console.log('Hello !!!!!!!!!')
    // API GET Requests. Get total list of friends
    app.get('/api/friends', function (req, res) {
        res.json(friends);

    });

    // console.log(friends);
    // Add new friend entry
    app.post('/api/friends', function (req, res) {
        // Capture the user input object
        var userInput = req.body;
        console.log('userInput = ' + JSON.stringify(userInput));
        var userResponses = userInput.scores
        console.log('userResponses = ' + userResponses);

        // +++++++++++++++++++++

        // Compute best friend match
        var matchName = '';
        var matchImage = '';
        var totalDifference = 51; // Make the initial value big for comparison

        // Examine all existing friends in the list
        for (var i = 0; i < friends.length; i++) {
            // console.log('friend = ' + JSON.stringify(friends[i]));

            // Compute differenes for each question
            var scoreDiff = 0;
            for (var j = 0; j < userResponses.length; j++) {
                scoreDiff += Math.abs(friends[i].scores[j] - userResponses[j]);
            }
            // console.log('diff = ' + scoreDiff);

            // If lowest difference, record the friend match
            if (scoreDiff < totalDifference) {
                // console.log('Closest match found = ' + scoreDiff);
                // console.log('Friend name = ' + friends[i].name);
                // console.log('Friend image = ' + friends[i].photo);

                totalDifference = scoreDiff;
                matchName = friends[i].name;
                matchImage = friends[i].photo;
            }
        }

        // Add new user
        friends.push(userInput);

        // Send appropriate response
        res.json({ status: 'OK', matchName: matchName, matchImage: matchImage });

    })

}
