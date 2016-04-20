///<reference path="../typings/node/node.d.ts"/>
///<reference path="../typings/express/express.d.ts"/>
///<reference path="../typings/body-parser/body-parser.d.ts"/>
///<reference path="../typings/firebase/firebase.d.ts"/>

import config from './config/secrets';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as Firebase from 'firebase';
import * as FbService from './firebase.service';

const server = express();
let DB;
server.use(bodyParser.urlencoded({extended: false}));

const twilio = require('twilio');
const fbInit = () => {
  const {url, key} =  config.firebase;
  DB = new Firebase(url);
  DB.authWithCustomToken(key, (error, authData) => {
    error ? console.log('Firebase FAILED to connect') : FbService.init(DB, authData);
  })


};
fbInit();

enum keys {
  'up' = 2,
  'left' = 4,
  'right' = 6,
  'down' = 8
}




server.get('/', (req, res) => {
  res.send('App running on port 3000!');
});

server.post('/keyPress', (req, res) => {
  console.log('req.body ', req.body.Digits);
  const key = req.body.Digits;
  if (keys[key]) {
    console.log("IS KEY:", keys[key]);
    FbService.moveCirlce(keys[key]);
  } else {
    console.log("NOT KEY");
    // FbService.reset();
  }


  let twiml = new twilio.TwimlResponse();
  twiml.gather({
    numDigits: '1',
    action: '/keyPress',
    method: 'POST',
    timeout: '1000'
  });

  res.send(twiml.toString());
});

server.post('/voice', (req, res) => {
  console.log('req.body ', req.body);
  let twiml = new twilio.TwimlResponse();
  twiml.gather({
    numDigits: '1',
    action: '/keyPress',
    method: 'POST',
    timeout: '1000'
  });

  res.send(twiml.toString());
});



server.listen(3000, () => console.log('Server on port 3000'));



