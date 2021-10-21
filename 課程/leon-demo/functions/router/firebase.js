
const router = require('./middleware/app.js')();

router.post('/firestoreAdd', function (req, res) {
    const name = req.body.name;
    const age = req.body.age;
    const firestoreAdd = require('../Apps/firestoreAdd');
    firestoreAdd({name, age})
    .then(function(result) {
        res.send({
            status: "success",
            content: result
        });
    })
    .catch(function(err) {
        res.send({
            status: "failed",
            content: err.message ? err.message: err
        });
    });
});

router.post('/firestoreGet', function (req, res) {
    const dataKey = req.body.dataKey;
    const firestoreGet = require('../Apps/firestoreGet');
    firestoreGet(dataKey)
    .then(function(result) {
        res.send({
            status: "success",
            content: result
        });
    })
    .catch(function(err) {
        res.send({
            status: "failed",
            content: err.message ? err.message: err
        });
    });
});

router.post('/firestoreWhere', function (req, res) {
    const name = req.body.name;
    const age = req.body.age;
    const firestoreWhere = require('../Apps/firestoreWhere');
    firestoreWhere({name, age})
    .then(function(result) {
        res.send({
            status: "success",
            content: result
        });
    })
    .catch(function(err) {
        res.send({
            status: "failed",
            content: err.message ? err.message: err
        });
    });
});


module.exports = router;