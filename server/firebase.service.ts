///<reference path="../typings/firebase/firebase.d.ts"/>
import * as Firebase from 'firebase';
var ref = undefined;

export function init(firebase, authData) {
  console.log("Firebase Starting data:", authData);
  ref = firebase;
}

export function reset(){
  ref.update({
    lastUpdated: Firebase.ServerValue.TIMESTAMP,
    moves: [
      'reset'
    ],
    circle: {
      top: 0,
      left: 0
    },
  });
}


export function moveCirlce(direction) {
  switch(direction) {
    
    case 'up':
      ref.child('circle').child('top').transaction(currentPos => currentPos + 1);
      break;
    case 'down':
      ref.child('circle').child('top').transaction(currentPos => currentPos - 1);
      break;
    case 'left':
      ref.child('circle').child('left').transaction(currentPos => currentPos - 1);
      break;
    case 'right':
      ref.child('circle').child('left').transaction(currentPos => currentPos + 1);

  }
}
