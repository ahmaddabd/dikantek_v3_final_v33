import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Loyalty = ({ userId }) => {
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`/api/loyalty/${userId}`)
      .then(response => setPoints(response.data.points))
      .catch(error => console.error(error));
  }, [userId]);

  const handleAddPoints = async () => {
    await axios.post('/api/loyalty/add', { userId, points: 10 });
    setPoints(prev => prev + 10);
    setMessage('✅ تم إضافة 10 نقاط!');
  };

  const handleRedeemPoints = async () => {
    if (points < 20) {
      setMessage('❌ لا يوجد نقاط كافية للاستبدال!');
      return;
    }

    await axios.post('/api/loyalty/redeem', { userId, pointsToRedeem: 20 });
    setPoints(prev => prev - 20);
    setMessage('🎉 تم استبدال 20 نقطة!');
  };

  return (
    <div>
      <h2>🏆 نظام الولاء والمكافآت</h2>
      <p>النقاط الحالية: {points}</p>
      <button onClick={handleAddPoints}>➕ كسب 10 نقاط</button>
      <button onClick={handleRedeemPoints}>🔄 استبدال 20 نقطة</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Loyalty;
