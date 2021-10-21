const express = require('express');
const cors = require('cors');

module.exports = () => {
    const app = express();

    app.use(cors({ origin: true }));
    app.use(express.raw({
        type: 'application/octet-stream',
        limit : '200mb'
    }));
    app.use(express.json({limit: "200mb"}));
    app.use(express.urlencoded({ limit: '200mb', extended: true }));

    return app;
};
