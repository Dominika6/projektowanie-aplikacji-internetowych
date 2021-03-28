const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class RentModel {
    tableName = 'rents';

    create = async ({ userId, carId, fullPrice, rentFrom, rentTo}) => {
        const sql = `INSERT INTO ${this.tableName}
        (userId, carId, fullPrice, rentFrom, rentTo) VALUES (?,?,?,?,?)`;
        const result = await query(sql, [ userId, carId, fullPrice, rentFrom, rentTo]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }
}

module.exports = new RentModel;
