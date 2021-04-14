const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class RentModel {
    tableName = 'rents';

    createRent = async ({ userId, carId, fullPrice, rentFrom, rentTo}) => {
        const sql = `INSERT INTO ${this.tableName} (userId, carId, fullPrice, rentFrom, rentTo) VALUES (?,?,?,?,?)`;
        const result = await query(sql, [ userId, carId, fullPrice, rentFrom, rentTo]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }

    getReservationsList = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;
        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;
        return await query(sql, [...values]);
    }

    modifyRent =  async (params, rentId) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE rentId = ?`;
        const result = await query(sql, [...values, rentId]);
        return result;
    }

    cancelRent = async (rentId) => {
        const sql = `DELETE FROM ${this.tableName} WHERE rentId = ?`;
        const result = await query(sql, [rentId]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }

    confirmRent =  async (params, rentId) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `UPDATE ${this.tableName} SET confirm = ? WHERE rentId = ?`;
        const result = await query(sql, [...values, rentId]);
        return result;
    }

}

module.exports = new RentModel;
