"use strict";
///<reference path="../typings/node/node.d.ts"/>
///<reference path="../typings/express/express.d.ts"/>
var secrets_1 = require('./config/secrets');
var express = require('express');
var twilio = require('twilio')(secrets_1["default"].sid, secrets_1["default"].secret);
// let resp = new twilio.TwimlResponse();
var server = express();
server.post('/voice', function (req, res) {
    console.log('POST /voice ', req);
});
server.listen(3000, function () { return console.log('Server on port 3000'); });
//# sourceMappingURL=index.js.map