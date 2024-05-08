import { dbPaths } from "./dbPaths";

export const queries = {
  auth: {
    login: `SELECT * FROM ${dbPaths.tables.auth} WHERE ${dbPaths.columns.auth.email} = ?`,
    signUp: `INSERT INTO ${dbPaths.tables.auth} 
        (${dbPaths.columns.auth.user}, ${dbPaths.columns.auth.email}, ${dbPaths.columns.auth.passwd})
        VALUES (?, ?, ?)`,
  },
};