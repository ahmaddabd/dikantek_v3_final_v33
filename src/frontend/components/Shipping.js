import React, { useState } from 'react';
import axios from 'axios';

const Shipping = () => {
  const [destination, setDestination] = useState('local');
  const [weight, setWeight] = useState(1);
  const [cost, setCost] = useState(null);

  const handleCalculate = async () => {
    const response = await axios.get(`/api/shipping/calculate?destination=${destination}&weight=${weight}`);
    setCost(response.data.cost);
  };

  return (
    <div>
      <h2>🚚 حساب تكاليف الشحن</h2>
      <label>الوجهة:</label>
      <select value={destination} onChange={(e) => setDestination(e.target.value)}>
        <option value="local">محلي</option>
        <option value="international">دولي</option>
      </select>

      <label>الوزن (كجم):</label>
      <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />

      <button onClick={handleCalculate}>📦 حساب الشحن</button>
      {cost !== null && <p>💰 تكلفة الشحن: ${cost}</p>}
    </div>
  );
};

export default Shipping;
