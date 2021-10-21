/* eslint-disable */
const functions = require("firebase-functions");
const cors = require('cors')({
    origin: true
});
module.exports = {
    fncHelloWorld: function (request, response) {
        return cors(request, response, () => {
           const myAPI=require('./Apps/myAPI');
           return myAPI(request,response);
        });
    },
}