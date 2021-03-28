const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

class CarModel {
    tableName = 'cars';

    getAvailableCarList = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName} WHERE status = 1`;
        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;
        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;
        const result = await query(sql, [...values]);
        return result[0];
    }

    create = async ({ carName, status, price, specifications }) => {
        const sql = `INSERT INTO ${this.tableName}
        (carName, status, price, specifications) VALUES (?,?,?,?)`;
        const result = await query(sql, [carName, status, price, specifications]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }

}

module.exports = new CarModel;
