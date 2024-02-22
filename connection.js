"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const conn = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'home_service'
});
conn.connect((err) => {
    if (err) {
        console.error(err);
    }
    console.log('connected to database');
});
conn.end();
