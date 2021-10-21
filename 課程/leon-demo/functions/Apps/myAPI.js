
const functions = require("firebase-functions");

module.exports = function (request, response) {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from myAPI!");
    // response.send({
    //     content: "Hello from myAPI!"
    // });
}