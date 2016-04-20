"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var twilio = require('twilio');
// let resp = new twilio.TwimlResponse();
var keys;
(function (keys) {
    keys[keys['up'] = 2] = 'up';
    keys[keys['left'] = 4] = 'left';
    keys[keys['right'] = 6] = 'right';
    keys[keys['down'] = 8] = 'down';
})(keys || (keys = {}));
var server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.get('/', function (req, res) {
    res.send('App running on port 3000!');
});
server.post('/keyPress', function (req, res) {
    console.log('req.body ', req.body.Digits);
    var key = req.body.Digits;
    if (keys[key]) {
        console.log("IS KEY:", keys[key]);
    }
    else {
        console.log("NOT KEY");
    }
    var twiml = new twilio.TwimlResponse();
    twiml.gather({
        numDigits: '1',
        action: '/keyPress',
        method: 'POST',
        timeout: '1000'
    });
    res.send(twiml.toString());
});
server.post('/voice', function (req, res) {
    console.log('req.body ', req.body);
    var twiml = new twilio.TwimlResponse();
    twiml.gather({
        numDigits: '1',
        action: '/keyPress',
        method: 'POST',
        timeout: '1000'
    });
    res.send(twiml.toString());
});
server.listen(3000, function () { return console.log('Server on port 3000'); });
//# sourceMappingURL=index.js.map