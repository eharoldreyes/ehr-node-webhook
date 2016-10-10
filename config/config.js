'use strict';

const path = require('path');

module.exports = {
    APP_NAME: 'node-webhook',
    FRONTEND_URL: 'localhost',
    PORT: 65521,

    CORS: {
        allowed_headers: 'Content-Type, Accept, x-access-token',
        allowed_origins: 'http://www.website.com',
        allowed_methods: 'GET, POST, PUT, OPTIONS, DELETE'
    },

    CODE_DEPLOY:{
        security: {
            authorizedIps: [
                '127.0.0.1',
                'localhost'
            ],
            bitbucketIps: [
                '131.103.20.165',
                '131.103.20.166'
            ],
            authorizedSubnet: [
                '131.103.20.160/27',
                '165.254.145.0/26',
                '104.192.143.0/24'
            ]
        },
        repository: {
            branch: 'refs/heads/master'
        },
        action: {exec: __dirname +"/../deploy.sh"}
    }
};