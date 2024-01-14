"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCSVFile = void 0;
var fs = require("fs");
var papaparse_1 = require("papaparse");
// Function to parse a CSV file
var parseCSVFile = function (csvFilePath) {
    console.log("----parsingCSV starting---");
    return new Promise(function (resolve, reject) {
        var data = [];
        var fileStream = fs.createReadStream(csvFilePath);
        (0, papaparse_1.parse)(fileStream, {
            header: true, // or false if you want array of arrays without keys
            step: function (result) {
                data.push(result.data);
            },
            complete: function () {
                resolve(data);
                console.log("----parsingCSV Completed---");
            },
            error: function (error) {
                reject(error);
                console.log("----parsingCSV failed---");
            }
        });
    });
};
exports.parseCSVFile = parseCSVFile;
