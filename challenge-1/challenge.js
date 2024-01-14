"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processDataDump = void 0;
var fs = require("fs");
var path = require("path");
var helpers_1 = require("./helpers");
var knex_1 = require("knex");
// Temporary directory for storing downloaded files
var tmpDir = 'tmp';
var knex = (0, knex_1.default)({
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, 'out', 'database.sqlite'),
    },
    useNullAsDefault: true,
});
// Main function that orchestrates the downloading, extraction, parsing, and DB insertion
var processDataDump = function (url, dbPath) { return __awaiter(void 0, void 0, void 0, function () {
    var outputPath, files, _i, files_1, file, csvFilePath, data, tableName, sampleData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                outputPath = path.join(tmpDir, 'dump.tar.gz');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, 10, 12]);
                if (!fs.existsSync(tmpDir)) {
                    fs.mkdirSync(tmpDir, { recursive: true });
                }
                if (!fs.existsSync(path.dirname(dbPath))) {
                    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
                }
                // await downloadFile(url, outputPath);
                return [4 /*yield*/, (0, helpers_1.decompressAndExtract)(outputPath, tmpDir)];
            case 2:
                // await downloadFile(url, outputPath);
                _a.sent();
                files = fs.readdirSync(tmpDir);
                _i = 0, files_1 = files;
                _a.label = 3;
            case 3:
                if (!(_i < files_1.length)) return [3 /*break*/, 8];
                file = files_1[_i];
                if (!(path.extname(file) === '.csv')) return [3 /*break*/, 7];
                console.log("Processing file: ".concat(file));
                csvFilePath = path.join(tmpDir, file);
                return [4 /*yield*/, (0, helpers_1.parseCSVFile)(csvFilePath)];
            case 4:
                data = _a.sent();
                tableName = path.basename(file, '.csv');
                sampleData = data[0];
                return [4 /*yield*/, (0, helpers_1.createTable)(tableName, Object.keys(sampleData), sampleData, knex)];
            case 5:
                _a.sent();
                return [4 /*yield*/, (0, helpers_1.batchInsertData)(tableName, data)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 3];
            case 8: return [3 /*break*/, 12];
            case 9:
                error_1 = _a.sent();
                console.error('An error occurred during the operation:', error_1);
                return [3 /*break*/, 12];
            case 10: 
            // fs.rmSync(tmpDir, { recursive: true, force: true });
            return [4 /*yield*/, knex.destroy()];
            case 11:
                // fs.rmSync(tmpDir, { recursive: true, force: true });
                _a.sent();
                console.log('All operations have been completed.');
                return [7 /*endfinally*/];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.processDataDump = processDataDump;
// processDataDump("https://fiber-challenges.s3.amazonaws.com/dump.tar.gz");
