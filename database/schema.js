"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BANKACCOUNT_TABLE = void 0;
var BANKACCOUNT_TABLE = "\nCREATE TABLE IF NOT EXISTS bank (\n    id INT NOT NULL AUTO_INCREMENT,\n    accountNumber VARCHAR(255) NOT NULL,\n    balance INT NOT NULL,\n    pinCode VARCHAR(255) NOT NULL,\n    PRIMARY KEY (id)\n);\n";
exports.BANKACCOUNT_TABLE = BANKACCOUNT_TABLE;
