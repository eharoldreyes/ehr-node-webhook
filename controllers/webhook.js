/**
 * Created by eharoldreyes on 10/10/16.
 */
var config = require(__dirname + '/../config/config').CODE_DEPLOY;
var exec = require('child_process').exec;
var netmask = require('netmask').Netmask;

exports.run = (req, res, next) => {
    var from = req.headers["x-forwarded-for"] || req.connection["remoteAddress"];
    if(from.startsWith("::ffff:"))
        from = from.slice(7);
    var authorizedSubnet = config.security.authorizedSubnet.map(function (subnet) {
        return new netmask(subnet);
    });
    var inAuthorizedSubnet = function (ip) {
        return authorizedSubnet.some(function (subnet) {
            return subnet.contains(ip);
        });
    };

    console.log('Webhook from:', from);

    if ((inAuthorizedSubnet(from) || config.security.authorizedIps.indexOf(from) >= 0)) {
        exec(config.action.exec, function (error, stdout, stderr) {
            if (stderr || error){
                res.status(500).send({error:true, message:"Internal server error occured", error_log: stderr || error});
            } else {
                console.log(stdout);
                res.status(200).send({error:false, message:"Success", webhook_from: from});
            }
        });
    } else {
        next();
    }
};