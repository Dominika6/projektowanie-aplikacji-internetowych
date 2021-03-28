const { body } = require('express-validator');
const Role = require('../../utils/userRoles.utils');

exports.createUserSchema = [
    body('username')
        .exists()
        .withMessage('username is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('surname')
        .exists()
        .withMessage('Your surname is required')
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .isLength({ max: 10 })
        .withMessage('Password can contain max 10 characters'),
    body('confirmPassword')
        .exists()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('confirmPassword field must have the same value as the password field'),
    body('role')
        .optional()
        .isIn([Role.Admin, Role.SuperUser])
        .withMessage('Invalid Role type')
];

exports.createRentSchema = [
    body('userId')
        .exists()
        .withMessage('userId is required'),
    body('carId')
        .exists()
        .withMessage('carId is required'),
    body('fullPrice')
        .exists()
        .withMessage('It is necessary to state the price')
        .isFloat()
        .withMessage('The price must be a number'),
    body('rentFrom')
        .exists()
        .withMessage('Enter a start date')
        .isDate()
        .withMessage('Wrong format'),
    body('rentTo')
        .exists()
        .withMessage('Enter a start date')
        .isDate()
        .withMessage('Wrong format')
];

exports.createCarSchema = [
    body('carName')
        .exists()
        .withMessage('carName is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('status')
        .exists()
        .withMessage('Status must be specified')
        .isBoolean()
        .withMessage('must be 0 or 1'),
    body('price')
        .exists()
        .withMessage('It is necessary to state the price')
        .isFloat()
        .withMessage('The price must be a number'),
    body('specifications')
        .exists()
        .withMessage('Enter a specifications')
];

exports.validateLogin = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
];
