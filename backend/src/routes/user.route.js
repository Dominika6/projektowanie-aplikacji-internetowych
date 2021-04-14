const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');

router.post('/registration', createUserSchema, awaitHandlerFactory(userController.createUser));
router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin));
router.get('/myAccount', auth(), awaitHandlerFactory(userController.getCurrentUser));


module.exports = router;
