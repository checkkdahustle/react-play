///<reference path="../typings/node/node.d.ts"/>
///<reference path="../typings/express/express.d.ts"/>
///<reference path="../typings/body-parser/body-parser.d.ts"/>
import config from './config/secrets';
import * as express from 'express';
import * as bodyParser from 'body-parser';


const twilio = require('twilio');
// let resp = new twilio.TwimlResponse();


const server = express();
server.use(bodyParser.urlencoded({extended: false}));

server.get('/', (req, res) => {
  res.send('App running on port 3000!');
});

server.post('/keyPress', (req, res) => {
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



