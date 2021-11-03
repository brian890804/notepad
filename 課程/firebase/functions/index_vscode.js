
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

app.post('/helloWorld', apis.fncHelloWorld);
app.post('/apiParams', apis.fncAPIParams);
app.post('/fireStoreAdd', apis.fncFirestoreAdd);
app.post('/fireStoreGet', apis.fncFirestoreGet);
app.post('/fireStoreWhere', apis.fncFirestoreWhere);
var confPort = process.env.PORT || 3000;
var server = app.listen(confPort, function () {
    app.use(express.static(`${__dirname}/../public`));
    const port = server.address().port;
    console.log('Listening in port', port);
});

