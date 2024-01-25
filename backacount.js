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
exports.BankAccount = exports.Database = void 0;
var mariadb = require("mariadb");
//import { BANKACCOUNT_TABLE } from './database/schema'
var Database = /** @class */ (function () {
    // Constructor
    function Database() {
        var _this = this;
        // Methods
        this.initializeDBSchema = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Initializing DB schema...');
                        return [4 /*yield*/, this.executeSQL("\n      CREATE TABLE IF NOT EXISTS bank (\n          id INT NOT NULL AUTO_INCREMENT,\n          accountNumber VARCHAR(255) NOT NULL,\n          balance INT NOT NULL,\n          pinCode VARCHAR(255) NOT NULL,\n          PRIMARY KEY (id)\n      );\n      ")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.executeSQL = function (query) { return __awaiter(_this, void 0, void 0, function () {
            var conn, res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this._pool.getConnection()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query)];
                    case 2:
                        res = _a.sent();
                        conn.end();
                        return [2 /*return*/, res];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this._pool = mariadb.createPool({
            database: process.env.DB_NAME || 'minitwitter',
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'minitwitter',
            password: process.env.DB_PASSWORD || 'supersecret123',
            connectionLimit: 5,
        });
        this.initializeDBSchema();
    }
    return Database;
}());
exports.Database = Database;
var BankAccount = /** @class */ (function () {
    function BankAccount(accountNumber, balance, pinCode) {
        var _this = this;
        this.returnAccount = function () {
            console.log(_this.result);
        };
        this.database = new Database();
        this.result = this.database.executeSQL("SELECT * FROM bank WHERE accountNumber = ".concat(this.accountNumber));
    }
    return BankAccount;
}());
exports.BankAccount = BankAccount;
var bankAccount = new BankAccount("d", 3, "d");
bankAccount.returnAccount;
