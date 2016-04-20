///<reference path="../typings/node/node.d.ts"/>
///<reference path="../typings/express/express.d.ts"/>
///<reference path="../typings/body-parser/body-parser.d.ts"/>
///<reference path="../typings/firebase/firebase.d.ts"/>
"use strict";
var secrets_1 = require('./config/secrets');
var express = require('express');
var bodyParser = require('body-parser');
var Firebase = require('firebase');
var FbService = require('./firebase.service');
var server = express();
var DB;
server.use(bodyParser.urlencoded({ extended: false }));
var twilio = require('twilio');
var fbInit = function () {
    var _a = secrets_1["default"].firebase, url = _a.url, key = _a.key;
    DB = new Firebase(url);
    DB.authWithCustomToken(key, function (error, authData) {
        error ? console.log('Firebase FAILED to connect') : FbService.init(DB, authData);
    });
};
fbInit();
var keys;
(function (keys) {
    keys[keys['up'] = 2] = 'up';
    keys[keys['left'] = 4] = 'left';
    keys[keys['right'] = 6] = 'right';
    keys[keys['down'] = 8] = 'down';
})(keys || (keys = {}));
server.get('/', function (req, res) {
    res.send('App running on port 3000!');
});
server.post('/keyPress', function (req, res) {
    console.log('req.body ', req.body.Digits);
    var key = req.body.Digits;
    if (keys[key]) {
        console.log("IS KEY:", keys[key]);
        FbService.moveCirlce(keys[key]);
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