const express = require('express');
const router = express.Router();
const rentController = require('../controllers/rent.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const auth = require("../middleware/auth.middleware");
const Role = require("../utils/userRoles.utils");

const { createRentSchema } = require('../middleware/validators/userValidator.middleware');

router.post('/rent', createRentSchema, awaitHandlerFactory(rentController.createRent));
router.post('/checkDate/:checkTo/:checkFrom', awaitHandlerFactory(rentController.checkDate));
router.get('/reservationsList', awaitHandlerFactory(rentController.getReservationsList));
router.get('/getUnconfirmedRentsList', awaitHandlerFactory(rentController.getUnconfirmedRentsList));
router.get('/getConfirmedRentsList', awaitHandlerFactory(rentController.getConfirmedRentsList));
router.get('/findRent/:rentId', awaitHandlerFactory(rentController.findRent));
router.post('/modifyRent/:rentId', awaitHandlerFactory(rentController.modifyRent));
router.delete('/cancelRent/:rentId', awaitHandlerFactory(rentController.cancelRent));
router.post('/confirmRent/:rentId', awaitHandlerFactory(rentController.confirmRent));

module.exports = router;
