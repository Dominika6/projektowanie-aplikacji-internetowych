const CarModel = require('../models/car.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

class CarController {

    getCarById = async (req, res, next) => {
        const car = await CarModel.findOne({ carId: req.params.carId });
        if (!car) {
            throw new HttpException(404, 'Car not found');
        }
        const { password, ...carWithoutPassword } = car;
        res.send(carWithoutPassword);
    };

    getAvailableCarList = async (req, res, next) => {
        let carList = await CarModel.getAvailableCarList();
        if (!carList.length) {
            throw new HttpException(404, 'Cars not found');
        }
        carList = carList.map(car => {
            const { password, ...carWithoutPassword } = car;
            return carWithoutPassword;
        });
        // console.log("car list: ", carList)
        res.send(carList);
    };

    createCar = async (req, res, next) => {
        this.checkValidation(req);
        await this.hashPassword(req);
        const result = await CarModel.create(req.body);
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }
        res.status(201).send('Car was created!');
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


module.exports = new CarController;
