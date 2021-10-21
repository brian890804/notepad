const functions = require("firebase-functions");
const region = 'asia-northeast1'; // in Tokyo

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// exports.helloWorld = functions.region(region).https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const apis = require('./apis.js');
//function method========================================================
exports.helloWorld = functions.region(region).https.onRequest(apis.fncHelloWorld);
exports.apiParams = functions.region(region).https.onRequest(apis.fncAPIParams);
exports.firestoreAdd = functions.region(region).https.onRequest(apis.fncFirestoreAdd);
exports.firestoreGet = functions.region(region).https.onRequest(apis.fncFirestoreGet);
exports.firestoreWhere = functions.region(region).https.onRequest(apis.fncFirestoreWhere);
exports.uploadFile = functions.region(region).https.onRequest(apis.fncUploadFile);

//router method==========================================================
exports.apis = functions.region(region).https.onRequest(require('./router/apis'));
exports.firebase = functions.region(region).https.onRequest(require('./router/firebase'));
