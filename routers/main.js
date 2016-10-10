/**
 * Created by eharoldreyes on 2/16/16.
 */
'use strict';

const __ = require(__dirname + '/../controllers');
const logger = require(__dirname + '/../helpers/request_logger');

module.exports = (router) => {
    router.all("*", logger);

    router.post("/deploy", __.webhook.run);

    router.all("*", (req, res) =>  {
        return res.status(404).send({error:true, message:"Page not found"});
    });

    return router;
};

