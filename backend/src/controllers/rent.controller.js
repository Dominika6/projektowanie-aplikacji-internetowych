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


    getUnconfirmedRentsList = async (req, res, next) => {
        let rentList = await RentModel.getUnconfirmedRentsList();
        if (!rentList.length) {
            return('Rents not found');
        }
        rentList = rentList.map(rent => {
            const { password, ...rentWithoutPassword } = rent;
            return rentWithoutPassword;
        });
        res.send(rentList);
    };

    getConfirmedRentsList = async (req, res, next) => {
        let rentList = await RentModel.getConfirmedRentsList();
        if (!rentList.length) {
            return('Rents not found');
        }
        rentList = rentList.map(rent => {
            const { password, ...rentWithoutPassword } = rent;
            return rentWithoutPassword;
        });
        res.send(rentList);
    };

    findRent = async (req, res, next) => {
        const rent = await RentModel.findRent({ rentId: req.params.rentId });
        if (!rent) {
            return ('Rent not found');
        }
        const { password, ...rentWithoutPassword } = rent;
        res.send(rentWithoutPassword);
    };


    getReservationsList = async (req, res, next) => {
        let rentList = await RentModel.getReservationsList();
        if (!rentList.length) {
            return('Rents not found');
        }

        rentList = rentList.map(rent => {
            const { password, ...rentWithoutPassword } = rent;
            return rentWithoutPassword;
        });

        res.send(rentList);
    };

    checkDate = async (req, res, next) => {
        this.checkValidation(req);
        await this.hashPassword(req);
        const { confirm_password, ...restOfUpdates } = req.body;
        let rentList = await RentModel.checkDate(restOfUpdates, req.params.checkTo, req.params.checkFrom);

        rentList = rentList.map(rent => {
            const { password, ...rentWithoutPassword } = rent;
            return rentWithoutPassword;
        });
        if (!rentList.length) {
            rentList ='';
        }
        res.send(rentList);
    };

    modifyRent = async (req, res, next) => {
        this.checkValidation(req);
        await this.hashPassword(req);
        const { confirm_password, ...restOfUpdates } = req.body;
        const result = await RentModel.modifyRent(restOfUpdates, req.params.rentId);
        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }
        const { affectedRows, changedRows, info } = result;
        const message = !affectedRows ? 'Rent not found' :
            affectedRows && changedRows ? 'Rent updated successfully' : 'Updated faild';
        res.send({ message, info });
    };

    cancelRent = async (req, res, next) => {
        const result = await RentModel.cancelRent(req.params.rentId);
        if (!result) {
            return('Rent not found');
        }
        res.send('Rent has been deleted');
    };

    confirmRent = async (req, res, next) => {
            this.checkValidation(req);
            await this.hashPassword(req);
            const { confirm_password, ...restOfUpdates } = req.body;
            const result = await RentModel.confirmRent(restOfUpdates, req.params.rentId);
            if (!result) {
                throw new HttpException(404, 'Something went wrong');
            }
            const { affectedRows, changedRows, info } = result;
            const message = !affectedRows ? 'Rent not found' :
                affectedRows && changedRows ? 'Rent confirmed successfully' : 'Updated faild';
            res.send({ message, info });
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
