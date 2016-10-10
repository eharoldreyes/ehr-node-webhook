'use strict';

const crypto = require('crypto');
const fs = require('fs');

module.exports = {
    //RANDOM
    randomString,
    randomHash,
    randomInt,
    randomFloat,

    //STRING
    toTitleCase,
    capsFirst,
    toBase64,

    //DATE
    dateToUTC,
    currentDate,
    toDay,

    //FILE
    rmDir,
    rmFile,
    getQuery,

    //OBJECT
    clone,
    deleteAttributes,
    getObjectByKeyValue

};

function toTitleCase(str) {
    return str ? str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()) : '';
}

function capsFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function currentDate() {
    const d = new Date();
    return [d.getFullYear(), this.pad(d.getMonth() + 1), this.pad(d.getDate())].join('-');
}

function toDay(str) {
    return str.replace("Mon", "M")
        .replace(/Tue(s?)/g, "T")
        .replace("Wed", "W")
        .replace(/Thurs|Th/g, "H")
        .replace("Fri", "F")
        .replace("Sat", "S");
}

function toBase64(string) {
    return new Buffer(string).toString('base64');
}

function randomString(l) {
    const length = parseInt(l) || 5;
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let text = "";

    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function randomHash() {
    var seed = crypto.randomBytes(20);
    return crypto.createHash('sha1').update(seed).digest('hex');
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function randomFloat(low, high) {
    return Math.random() * (high - low) + low;
}

function dateToUTC() {
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

function rmDir(dirPath) {
    try {
        const files = fs.readdirSync(dirPath);
        if (files.length > 0)
            for (let i = 0; i < files.length; i++) {
                let filePath = dirPath + '/' + files[i];
                if (fs.statSync(filePath).isFile())
                    fs.unlinkSync(filePath);
                else
                    rmDir(filePath);
            }
        return fs.rmdirSync(dirPath);
    } catch (e) {
        Log.e("rmDir", "Failed", e);
        return null;
    }
}

function rmFile(newPath) {
    try {
        fs.unlinkSync(newPath);
    } catch (e) {
        Log.e("rmFile", "Failed", e);
        return null;
    }
}

function getQuery(query) {
    if (query && Array.isArray(query)) {
        return query[0];
    } else {
        return query;
    }
}

function deleteAttributes(obj, attrs) {
    attrs.forEach((attr) =>  {
        delete obj[attr];
    });
    return obj;
}

function getObjectByKeyValue(object, keyToFind, valueToMatch) {
    for (let rawObject in object) {
        if (object.hasOwnProperty(rawObject) && object[rawObject][keyToFind] === valueToMatch) return rawObject;
    }
}