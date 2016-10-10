/**
 * Created by eharoldreyes on 10/10/16.
 */

module.exports = {
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
    action: {exec: __dirname +"/deploy.sh"}
};