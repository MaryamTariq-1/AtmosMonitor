// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Checkout.css";

// const Checkout = () => {
//   const navigate = useNavigate();

//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
//   const [paymentDetails, setPaymentDetails] = useState({
//     cardNumber: "",
//     expiryDate: "",
//     cvv: "",
//   });

//   const handlePaymentMethodChange = (e) => {
//     setSelectedPaymentMethod(e.target.value);
//   };

//   const handlePaymentDetailsChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Payment logic goes here, for now we will just navigate to a success page
//     alert("Payment successful!");
//     navigate("/payment-success");
//   };

//   return (
//     <div className="checkout-container">
//       <h2>Checkout</h2>
//       <form onSubmit={handleSubmit} className="checkout-form">
//         <div className="payment-method">
//           <label>
//             <input
//               type="radio"
//               value="Credit Card"
//               checked={selectedPaymentMethod === "Credit Card"}
//               onChange={handlePaymentMethodChange}
//             />
//             Credit Card
//           </label>
//           <label>
//             <input
//               type="radio"
//               value="PayPal"
//               checked={selectedPaymentMethod === "PayPal"}
//               onChange={handlePaymentMethodChange}
//             />
//             PayPal
//           </label>
//           <label>
//             <input
//               type="radio"
//               value="Google Pay"
//               checked={selectedPaymentMethod === "Google Pay"}
//               onChange={handlePaymentMethodChange}
//             />
//             Google Pay
//           </label>
//         </div>

//         {selectedPaymentMethod === "Credit Card" && (
//           <div className="credit-card-details">
//             <div className="input-group">
//               <label htmlFor="cardNumber">Card Number:</label>
//               <input
//                 type="text"
//                 name="cardNumber"
//                 value={paymentDetails.cardNumber}
//                 onChange={handlePaymentDetailsChange}
//                 required
//                 placeholder="Enter your card number"
//               />
//             </div>
//             <div className="input-group">
//               <label htmlFor="expiryDate">Expiry Date:</label>
//               <input
//                 type="text"
//                 name="expiryDate"
//                 value={paymentDetails.expiryDate}
//                 onChange={handlePaymentDetailsChange}
//                 required
//                 placeholder="MM/YY"
//               />
//             </div>
//             <div className="input-group">
//               <label htmlFor="cvv">CVV:</label>
//               <input
//                 type="text"
//                 name="cvv"
//                 value={paymentDetails.cvv}
//                 onChange={handlePaymentDetailsChange}
//                 required
//                 placeholder="CVV"
//               />
//             </div>
//           </div>
//         )}

//         <div className="submit-button">
//           <button type="submit">Pay Now</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Checkout;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./Checkout.css";

// Make sure to replace this with your own public key from Stripe
const stripePromise = loadStripe(
  "pk_test_51NdsQCEBmpPY3F1SVvoq27xazI7MPxe38i9q9otPfxTR61SRhYaUZHvDjxnvWl8VuriA1QFiQVkqKGitEzYcR2Ha00yiiOOlzY"
);

const Checkout = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // For a credit card payment
    if (selectedPaymentMethod === "Credit Card") {
      const cardElement = elements.getElement(CardElement);
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        console.error("Payment error:", error);
        alert("Payment failed: " + error.message);
      } else {
        // Send the token to your server to handle the payment
        console.log("Received Stripe token:", token);
        // Example API call:
        const response = await fetch("/api/payment-intent", {
          method: "POST",
          body: JSON.stringify({ token: token.id }),
        });
        const result = await response.json();

        alert("Payment successful!");
        navigate("/payment-success");
      }
    } else {
      // Handle other payment methods like PayPal, Google Pay, etc.
      alert("Other payment methods are not integrated yet.");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="payment-method">
          <label>
            <input
              type="radio"
              value="Credit Card"
              checked={selectedPaymentMethod === "Credit Card"}
              onChange={handlePaymentMethodChange}
            />
            Credit Card
          </label>
          <label>
            <input
              type="radio"
              value="PayPal"
              checked={selectedPaymentMethod === "PayPal"}
              onChange={handlePaymentMethodChange}
            />
            PayPal
          </label>
          <label>
            <input
              type="radio"
              value="Google Pay"
              checked={selectedPaymentMethod === "Google Pay"}
              onChange={handlePaymentMethodChange}
            />
            Google Pay
          </label>
        </div>

        {selectedPaymentMethod === "Credit Card" && (
          <div className="credit-card-details">
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
