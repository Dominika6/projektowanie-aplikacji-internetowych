const express = require('express');
const router = express.Router();
const carController = require('../controllers/car.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createCarSchema } = require('../middleware/validators/userValidator.middleware');

router.post('/addCar', createCarSchema, awaitHandlerFactory(carController.createCar));
router.get('/getAvailableCarList', awaitHandlerFactory(carController.getAvailableCarList));
router.get('/carSpecifications/:carId', awaitHandlerFactory(carController.getCarById));
// router.get('/carSpecifications/:carId', auth(), awaitHandlerFactory(carController.getCarById));
// /updateStatus ?

module.exports = router;
