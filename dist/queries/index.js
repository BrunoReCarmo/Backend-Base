"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
const dbPaths_1 = require("./dbPaths");
exports.queries = {
    auth: {
        login: `SELECT * FROM ${dbPaths_1.dbPaths.tables.auth} WHERE ${dbPaths_1.dbPaths.columns.auth.email} = ?`,
        signUp: `INSERT INTO ${dbPaths_1.dbPaths.tables.auth} 
        (${dbPaths_1.dbPaths.columns.auth.user}, ${dbPaths_1.dbPaths.columns.auth.email}, ${dbPaths_1.dbPaths.columns.auth.passwd})
        VALUES (?, ?, ?)`,
    },
};
