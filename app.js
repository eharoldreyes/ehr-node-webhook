'use strict';

const config        = require(__dirname + '/config/config');
const utils         = require(__dirname + '/helpers/utils');
const override      = require(__dirname + "/helpers/override");
const cors          = require(__dirname + "/libs/cors");
const routes        = require(__dirname + "/routers/main");
const express       = require("express");

const spawnServer   = () => {
    const app = express();
    const bodyParser    = require("body-parser");

    app.set('case sensitive routing', true);
    app.set('x-powered-by', false);
    app.set('trust proxy', 1);

    app.use(cors(config.CORS));
    app.use(require("response-time")());
    app.use(require("helmet")());
    app.use(require("method-override")());
    app.use(bodyParser.urlencoded({extended: false, defer: true}));
    app.use(bodyParser.json());
    app.use(require('compression')());

    app.use(routes(express.Router()));
    app.listen(config.PORT, () => {
        console.log(`Running ${config.APP_NAME} on port: ${config.PORT}`);
    });
    return app;
};

module.exports = spawnServer();
