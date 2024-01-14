"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decompressAndExtract = void 0;
var fs = require("fs");
var zlib = require("zlib");
var tar = require("tar");
// Function to decompress and extract the tar.gz file
var decompressAndExtract = function (tarballPath, extractDir) {
    console.log("----Decompress starting---");
    return new Promise(function (resolve, reject) {
        fs.createReadStream(tarballPath)
            .pipe(zlib.createGunzip())
            .pipe(tar.extract({
            cwd: extractDir,
            filter: function (path, stat) {
                // Exclude files starting with `._`, at any directory level
                return !/(^|\/)\._/.test(path);
            },
            onentry: function (entry) {
                // This will remove the first segment of the path (e.g. 'dump/') for each entry
                if (!/(^|\/)\._/.test(entry.path)) {
                    entry.path = entry.path.replace(/^([^\/]+\/)/, '');
                }
            }
        })).on('error', function (error) {
            console.error("Error during decompression:", error);
            reject(error);
        })
            .on('end', function () {
            console.log("----Decompress Completed---");
            resolve();
        });
    });
};
exports.decompressAndExtract = decompressAndExtract;
