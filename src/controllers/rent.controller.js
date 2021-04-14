const RentModel = require('../models/rent.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

class RentController {

    createRent = async (req, res, next) => {
        this.checkValidation(req);
        await this.hashPassword(req);
        const result = await RentModel.createRent(req.body);
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }
        res.status(201).send('Rent was created!');
    };

    getReservationsList = async (req, res, next) => {
        let rentList = await RentModel.getReservationsList();
        if (!rentList.length) {
            throw new HttpException(404, 'Rents not found');
        }

        rentList = rentList.map(rent => {
            const { password, ...rentWithoutPassword } = rent;
            return rentWithoutPassword;
        });

        res.send(rentList);
    };

    modifyRent = async (req, res, next) => {
        this.checkValidation(req);
        await this.hashPassword(req);
        const { confirm_password, ...restOfUpdates } = req.body;
        const result = await RentModel.modifyRent(restOfUpdates, req.params.id);
        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }
        const { affectedRows, changedRows, info } = result;
        const message = !affectedRows ? 'Rent not found' :
            affectedRows && changedRows ? 'Rent updated successfully' : 'Updated faild';
        res.send({ message, info });
    };

    cancelRent = async (req, res, next) => {
        const result = await RentModel.cancelRent(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Rent not found');
        }
        res.send('Rent has been deleted');
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }
}

module.exports = new RentController;
