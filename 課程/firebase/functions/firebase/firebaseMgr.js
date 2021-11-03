/* eslint-disable */
function CFirebaseMgr()
{
    // The Firebase Admin SDK to access the Firebase Realtime Database.
    const admin = require('firebase-admin');
    const serviceAccountKey = require("../serviceAccountKey.json");
    const certificate = admin.credential.cert(serviceAccountKey);
    const projectId = certificate.projectId;
    const firebaseApp = admin.initializeApp({
        credential: certificate,
        databaseURL: `https://${projectId}.firebaseio.com`,
        storageBucket: `${projectId}.appspot.com`
    });
    
    const cloudStorage = firebaseApp.storage();
    const cloudDB = firebaseApp.firestore();
    cloudDB.settings({timestampsInSnapshots: true});

    CFirebaseMgr.prototype.init = function()
    {

    }
    
    CFirebaseMgr.prototype.firestore = function()
    {
        return cloudDB;
    }
    
    CFirebaseMgr.prototype.storage = function()
    {
        return cloudStorage;
    }
}

var oFirebaseMgr = null;

module.exports = {
    instance: function() {
        if (!oFirebaseMgr) {
            oFirebaseMgr = new CFirebaseMgr();
            oFirebaseMgr.init();
        }
        return oFirebaseMgr;
    }
}