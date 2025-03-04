const stripe = require("stripe")("sk_test_..."); // Your Stripe secret key

// Handle the creation of a payment intent
const createPaymentIntent = async (req, res) => {
  try {
    const { token } = req.body; // Get the token from the request

    // Create a PaymentIntent with the token received
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // Amount in cents
      currency: "usd",
      payment_method: token,
      confirm: true,
    });

    res.json({ success: true, paymentIntent }); // Send back the PaymentIntent
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPaymentIntent,
};
