"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = void 0;
var https = require("https");
var fs = require("fs");
// Function to download a file
var downloadFile = function (url, dest) {
    console.log("----Download starting---");
    return new Promise(function (resolve, reject) {
        var file = fs.createWriteStream(dest);
        https.get(url, function (response) {
            response.pipe(file);
            file.on('finish', function () {
                file.close(function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                        console.log("----Download Completed---");
                    }
                });
            });
        }).on('error', function (err) {
            fs.unlink(dest, function (unlinkErr) {
                if (unlinkErr)
                    console.error("Failed to delete ".concat(dest, ":"), unlinkErr);
                reject(err);
            }); // Handle unlink error scenario
        });
    });
};
exports.downloadFile = downloadFile;
