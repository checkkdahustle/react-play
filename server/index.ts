///<reference path="../typings/node/node.d.ts"/>
///<reference path="../typings/express/express.d.ts"/>
import config from './config/secrets';
import * as express from 'express';


const twilio = require('twilio')(config.sid, config.secret);
// let resp = new twilio.TwimlResponse();



const server = express();

server.post('/voice', (req, res) => {
  console.log('POST /voice ', req);
});

server.listen(3000, () => console.log('Server on port 3000'));



