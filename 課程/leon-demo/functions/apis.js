// leon: about the firestore.index, use "firebase firestore:indexes" to export content of firestore.index 
// then copy & paste it to firestore.indexex.json
//

const cors = require('cors')({
    origin: true
});

module.exports = {
    fncHelloWorld: function (request, response) {
        return cors(request, response, () => {
            const myAPI = require('./Apps/myAPI');
            return myAPI(request, response);
        });
    },
    fncAPIParams: function (request, response) {
        return cors(request, response, () => {
            const apiParams = require('./Apps/apiParams');
            return apiParams(request, response);
        });
    },
    fncFirestoreAdd: function (request, response) {
        return cors(request, response, () => {
            const name = request.body.name;
            const age = request.body.age;
            const firestoreAdd = require('./Apps/firestoreAdd');
            firestoreAdd({name, age})
            .then(function(result) {
                response.send({
                    status: "success",
                    content: result
                });
            })
            .catch(function(err) {
                response.send({
                    status: "failed",
                    content: err.message ? err.message: err
                });
            });
        });
    },
    fncFirestoreGet: function (request, response) {
        return cors(request, response, () => {
            const dataKey = request.body.dataKey;
            const firestoreGet = require('./Apps/firestoreGet');
            firestoreGet(dataKey)
            .then(function(result) {
                response.send({
                    status: "success",
                    content: result
                });
            })
            .catch(function(err) {
                response.send({
                    status: "failed",
                    content: err.message ? err.message: err
                });
            });
        });
    },
    fncFirestoreWhere: function (request, response) {
        return cors(request, response, () => {
            const name = request.body.name;
            const age = request.body.age;
            const firestoreWhere = require('./Apps/firestoreWhere');
            firestoreWhere({name, age})
            .then(function(result) {
                response.send({
                    status: "success",
                    content: result
                });
            })
            .catch(function(err) {
                response.send({
                    status: "failed",
                    content: err.message ? err.message: err
                });
            });
        });
    },
    fncUploadFile: function (request, response) {
        return cors(request, response, async () => {
            try {
                let bytes = new Uint8Array(request.body);
                let uploadFile = require('./Apps/UploadFile');
                let result = await uploadFile(bytes);
                response.send({
                    status: "success",
                    ver: '1.0',
                    content: result,
                });
            }
            catch(err) {
                response.send({
                    status: 'failed',
                    error: err,
                });
            }
        });
    }
}