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

    findRent = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;
        const result = await query(sql, [...values]);
        return result[0];
    }

    getUnconfirmedRentsList = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName} WHERE confirm = 0`;
        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }


    getConfirmedRentsList = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName} WHERE confirm = 1`;
        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }



    checkDate = async (params, checkTo, checkFrom) => {
        // const sql = `SELECT * FROM ${this.tableName} WHERE ('${checkTo}' <= rentFrom) OR (rentTo <= '${checkFrom}') `;
        // let sql = `SELECT * FROM ${this.tableName} WHERE ('${checkFrom}' <= '${checkTo}') AND (('${checkTo}' <= rentFrom) OR (rentTo <= '${checkFrom}')) `;
        const sql = `select * from rents where ((rentTo >= '${checkFrom}') AND (rentFrom <= '${checkFrom}')) 
                       OR ((rentFrom <= '${checkTo}') AND (rentTo >= '${checkTo}')) 
                       OR ((rentFrom <= '${checkFrom}') AND (rentTo >= '${checkTo}'))
                       OR ('${checkFrom}' <= rentFrom) AND (rentTo <= '${checkTo}');`
        // console.log(sql);
        const result = await query(sql, [checkTo, checkFrom]);

        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const { columnSet, values } = multipleColumnSet(params)
        // sql += ` WHERE ${columnSet} `;
        // return sql;
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
        const sql = `UPDATE ${this.tableName} SET confirm = 1 WHERE rentId = ?`;
        const result = await query(sql, [...values, rentId]);
        return result;
    }

}

module.exports = new RentModel;
