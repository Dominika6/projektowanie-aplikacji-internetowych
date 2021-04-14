const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class UserModel {
    tableName = 'users';

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;
        const result = await query(sql, [...values]);
        return result[0];
    }

    create = async ({ username, surname, email, password, role }) => {
        const sql = `INSERT INTO ${this.tableName}
        (username, surname, email, password, role) VALUES (?,?,?,?,?)`;
        const result = await query(sql, [username, surname, email, password, role]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }
}

module.exports = new UserModel;
