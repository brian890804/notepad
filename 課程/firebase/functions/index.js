/* eslint-disable */
const functions = require("firebase-functions");
const region = 'asia-east1';//TW
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const apis = require('./apis.js');
exports.helloWorld = functions.region(region).https.onRequest((apis.fncHelloWorld));

