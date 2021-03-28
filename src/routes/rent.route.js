const express = require('express');
const router = express.Router();
const rentController = require('../controllers/rent.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createRentSchema } = require('../middleware/validators/userValidator.middleware');

router.post('/rent', createRentSchema, awaitHandlerFactory(rentController.createRent));

module.exports = router;
