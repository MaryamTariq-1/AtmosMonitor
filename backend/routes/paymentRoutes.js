const express = require("express");
const router = express.Router();
const { createPaymentIntent } = require("../controllers/paymentController");

// POST route for creating payment intent
router.post("/payment-intent", createPaymentIntent);

module.exports = router;
