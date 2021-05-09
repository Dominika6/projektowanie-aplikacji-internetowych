const UserModel = require('../models/user.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class UserController {

    getCurrentUser = async (req, res, next) => {
        const { password, ...userWithoutPassword } = req.currentUser;
        res.send(userWithoutPassword);
    };

    createUser = async (req, res, next) => {
        this.checkValidation(req);
        await this.hashPassword(req);
        const result = await UserModel.create(req.body);
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }
        res.status(201).send('User was created!');
    };

    getUsersList = async (req, res, next) => {
        let userList = await UserModel.getUsersList();
        if (!userList.length) {
            throw new HttpException(404, 'Users not found');
        }
        userList = userList.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        res.send(userList);
    };


    userLogin = async (req, res, next) => {
        this.checkValidation(req);
        const { email, password: pass } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new HttpException(401, 'Unable to login!');
        }
        const isMatch = await bcrypt.compare(pass, user.password);
        console.log(":"+ user.password +":" + pass);
        if (!isMatch) {
            throw new HttpException(401, 'Incorrect password!');
        }
        const secretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({ userId: user.userId.toString() }, secretKey, {
            expiresIn: '24h'
        });
        const { password, ...userWithoutPassword } = user;
        res.send({ ...userWithoutPassword, token });
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

module.exports = new UserController;
