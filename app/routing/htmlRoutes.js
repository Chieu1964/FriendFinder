//====================
// Dependencies
// Include the path package to get the correct path for html files
//===================

var path = require('path');

//===================
// ROUTING
//===================
 module.exports = function(app) {

    // home page
     app.get('/', function(req, res) {
         res.sendFile(path.join(__dirname, '../public/home.html'));
     });

     // Survey page
     app.get('/survey', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/survey.html'));
     })
 }