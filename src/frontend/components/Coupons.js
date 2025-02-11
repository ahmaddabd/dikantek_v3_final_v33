import React, { useState } from 'react';
import axios from 'axios';

const Coupons = () => {
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [expiresAt, setExpiresAt] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateCoupon = async () => {
    if (!code || discount <= 0 || !expiresAt) {
      setMessage('يرجى إدخال جميع التفاصيل بشكل صحيح!');
      return;
    }

    try {
      await axios.post('/api/coupons/create', { code, discount, expiresAt });
      setMessage(`تم إنشاء الكوبون بنجاح: ${code}`);
    } catch (error) {
      setMessage('حدث خطأ أثناء إنشاء الكوبون!');
    }
  };

  const handleValidateCoupon = async () => {
    try {
      const response = await axios.get(`/api/coupons/validate/${code}`);
      setMessage(`✅ الكوبون صالح! خصم: ${response.data.discount}%`);
    } catch (error) {
      setMessage('❌ الكوبون غير صالح أو منتهي الصلاحية!');
    }
  };

  return (
    <div>
      <h2>🎟️ إدارة العروض والكوبونات</h2>

      <label>رمز الكوبون:</label>
      <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />

      <label>نسبة الخصم (%):</label>
      <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />

      <label>تاريخ الانتهاء:</label>
      <input type="date" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} />

      <button onClick={handleCreateCoupon}>➕ إنشاء كوبون</button>
      <button onClick={handleValidateCoupon}>✅ التحقق من صلاحية الكوبون</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Coupons;
