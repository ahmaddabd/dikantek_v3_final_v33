import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');

  const handlePayment = async () => {
    if (amount <= 0) {
      setMessage('يرجى إدخال مبلغ صحيح!');
      return;
    }

    const response = await axios.post('/api/payments/create-intent', { amount: amount * 100, currency: 'usd' });
    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({ sessionId: response.data });
    if (error) setMessage(error.message);
  };

  return (
    <div>
      <h2>💳 الدفع الإلكتروني</h2>
      <input type="number" placeholder="أدخل المبلغ" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handlePayment}>💰 ادفع الآن</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Payment;
