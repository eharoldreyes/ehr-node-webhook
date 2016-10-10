/**
 * Created by eharoldreyes on 10/10/16.
 */

const cluster = require('cluster');
const server = 'app.js';

if (cluster.isMaster) {
    for (let i = 0; i < require('os').cpus().length; i++) {
        cluster.fork({cpu_number: i});
    }

    Object.keys(cluster.workers).forEach(function (id) {
        let worker = cluster.workers[id];
        worker.cpu_number = --id;
    });

} else {
    return require(__dirname + '/' + server);
}

cluster.on('exit', function (worker, code, signal) {
    let cpu = worker.cpu_number;
    console.log("Cluster Died", worker.process.pid, {cpu: cpu, code: code, signal: signal});
    console.log("Starting a new cluster", {cpu: cpu});
    cluster.fork({cpu_number: cpu}).on('online', () => {
        let workers = cluster.workers,
            keys = Object.keys(workers);
        workers[keys[keys.length - 1]].cpu_number = cpu;
    });
});