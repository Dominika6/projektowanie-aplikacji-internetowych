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
        const result = await RentModel.create(req.body);
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }
        res.status(201).send('Rent was created!');
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
