
const router = require('./middleware/app.js')();

router.post('/helloWorld', function (req, res) {
    const myAPI = require('../Apps/myAPI');
    return myAPI(req, res);
});

router.post('/apiParams', function (req, res) {
    const apiParams = require('../Apps/apiParams');
    return apiParams(req, res);
});

router.post('/uploadFile', async function (req, res) {
    try {
        let bytes = new Uint8Array(req.body);
        let uploadFile = require('../Apps/UploadFile');
        let result = await uploadFile(bytes);
        res.send({
            status: "success",
            ver: '1.0',
            content: result,
        });
    }
    catch(err) {
        res.send({
            status: 'failed',
            error: err,
        });
    }
});


module.exports = router;

