"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var twilio = require('twilio');
// let resp = new twilio.TwimlResponse();
var server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.get('/', function (req, res) {
    res.send('App running on port 3000!');
});
server.post('/keyPress', function (req, res) {
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