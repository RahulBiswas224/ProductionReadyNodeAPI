const express = require('express');
const paymentController = require('./payment.controller');
const router = express.Router();

router.post('/', paymentController.handlePayment);

// NEW: Route for getting all payments
router.get('/', paymentController.getPayments);

module.exports = router;