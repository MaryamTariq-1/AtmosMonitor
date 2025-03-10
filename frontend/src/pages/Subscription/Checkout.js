import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./Checkout.css";

// Initialize Stripe with your public key
const stripePromise = loadStripe(
  "pk_test_51NdsQCEBmpPY3F1SVvoq27xazI7MPxe38i9q9otPfxTR61SRhYaUZHvDjxnvWl8VuriA1QFiQVkqKGitEzYcR2Ha00yiiOOlzY"
);

const Checkout = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  // Retrieve the selected plan data from location.state
  const location = useLocation();
  const { selectedPlan } = location.state || {}; // If location.state doesn't exist, fallback to an empty object

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("Credit Card");
  const [cardholderName, setCardholderName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!selectedPlan) {
      navigate("/subscription-plans"); // Redirect to plans if no plan selected
    }
  }, [selectedPlan, navigate]);

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error("Payment error:", error);
      alert("Payment failed: " + error.message);
    } else {
      try {
        const response = await fetch(
          "http://localhost:3001/api/payment-intent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: token.id,
              cardholderName,
              email,
              selectedPlan, // Send selected plan data to backend
            }),
          }
        );

        const result = await response.json();

        if (response.ok) {
          alert("Payment successful!");
          navigate("/");
        } else {
          console.error("Payment error:", result.error);
          alert("Payment failed: " + result.error);
        }
      } catch (err) {
        console.error("Error processing payment:", err);
        alert("Payment failed.");
      }
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-header">Checkout</h2>
      <h3 className="selected-plan-name">{selectedPlan?.name}</h3>
      <p className="plan-description">{selectedPlan?.description}</p>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="payment-method">
          <label>

            Credit Card
          </label>
        </div>

        {selectedPaymentMethod === "Credit Card" && (
          <div className="credit-card-details">
            <div className="input-group">
              <label>Cardholder Name:</label>
              <input
                type="text"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                required
                placeholder="Enter cardholder's name"
              />
            </div>

            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="input-group">
              <label>Card Details:</label>
              <CardElement />
            </div>
          </div>
        )}

        <div className="submit-button">
          <button type="submit" disabled={!stripe}>
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
};

const CheckoutWrapper = () => (
  <Elements stripe={stripePromise}>
    <Checkout />
  </Elements>
);

export default CheckoutWrapper;
