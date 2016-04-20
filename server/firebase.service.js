"use strict";
///<reference path="../typings/firebase/firebase.d.ts"/>
var Firebase = require('firebase');
var ref = undefined;
function init(firebase, authData) {
    console.log("Firebase Starting data:", authData);
    ref = firebase;
}
exports.init = init;
function reset() {
    ref.update({
        lastUpdated: Firebase.ServerValue.TIMESTAMP,
        moves: [
            'reset'
        ],
        circle: {
            top: 0,
            left: 0
        }
    });
}
exports.reset = reset;
function moveCirlce(direction) {
    switch (direction) {
        case 'up':
            ref.child('circle').child('top').transaction(function (currentPos) { return currentPos + 1; });
            break;
        case 'down':
            ref.child('circle').child('top').transaction(function (currentPos) { return currentPos - 1; });
            break;
        case 'left':
            ref.child('circle').child('left').transaction(function (currentPos) { return currentPos - 1; });
            break;
        case 'right':
            ref.child('circle').child('left').transaction(function (currentPos) { return currentPos + 1; });
    }
}
exports.moveCirlce = moveCirlce;
//# sourceMappingURL=firebase.service.js.map