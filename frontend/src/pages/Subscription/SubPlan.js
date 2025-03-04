import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SubPlan.css';

const SubPlan = () => {
  const navigate = useNavigate();
  
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 1,
      name: '7-Day Free Trial',
      description: 'Enjoy the premium features for 7 days, completely free!',
      price: '$0.00',
      duration: '7 days',
    },
    {
      id: 2,
      name: 'Monthly Plan',
      description: 'Get access to premium features for one month.',
      price: '$10.00',
      duration: '1 month',
    },
    {
      id: 3,
      name: 'Yearly Plan',
      description: 'Get access to premium features for one full year.',
      price: '$100.00',
      duration: '1 year',
    }
  ];

//   const handleBuySubscription = (planId) => {
//     setSelectedPlan(planId);
//     // Navigate to the checkout page where payment method is selected
//     navigate('/checkout');
//   };

    
    const handleBuySubscription = (planId) => {
      const plan = plans.find((p) => p.id === planId); // Find the selected plan based on ID
      setSelectedPlan(plan); // Store the selected plan in the state
      navigate("/checkout", { state: { selectedPlan: plan } }); // Pass the selected plan data to Checkout page using state
    };

  return (
    <>
      <h2 className="subscription-header">Choose Your Subscription Plan</h2>
      <div className="subscription-container">
        {plans.map((plan) => (
          <div key={plan.id} className="plan-card">
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <h4>{plan.price}</h4>
            <button onClick={() => handleBuySubscription(plan.id)}>
              Buy Subscription
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SubPlan;
