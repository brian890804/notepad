
const express = require('express');
const apis = require(__dirname + '/apis.js');
const app = express();

app.use(express.raw({
    type: 'application/octet-stream',
    limit: '200mb'
}));
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});

//function method============================================
app.post('/helloWorld', apis.fncHelloWorld);
app.post('/apiParams', apis.fncAPIParams);
app.post('/firestoreAdd', apis.fncFirestoreAdd);
app.post('/firestoreGet', apis.fncFirestoreGet);
app.post('/firestoreWhere', apis.fncFirestoreWhere);
app.post('/uploadFile', apis.fncUploadFile);

//router method==============================================
app.use('/apis', require(__dirname + '/router/apis.js'));
app.use('/firebase', require(__dirname + '/router/firebase.js'));

var confPort = process.env.PORT || 3000;
var server = app.listen(confPort, function () {
    app.use(express.static(`${__dirname}/../public`));
    const port = server.address().port;
    console.log('Listening in port', port);
});