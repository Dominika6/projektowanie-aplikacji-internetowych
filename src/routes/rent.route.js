const express = require('express');
const router = express.Router();
const rentController = require('../controllers/rent.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const auth = require("../middleware/auth.middleware");

const { createRentSchema } = require('../middleware/validators/userValidator.middleware');

router.post('/rent', createRentSchema, awaitHandlerFactory(rentController.createRent));
router.get('/reservationsList', auth(), awaitHandlerFactory(rentController.getReservationsList));
router.post('/modifyRent/:id', auth(), awaitHandlerFactory(rentController.modifyRent));
router.delete('/cancelRent/:id', auth(), awaitHandlerFactory(rentController.cancelRent));
router.post('/confirmRent/:id', auth(), awaitHandlerFactory(rentController.confirmRent));

module.exports = router;
