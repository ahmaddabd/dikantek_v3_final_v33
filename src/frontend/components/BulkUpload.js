import React, { useState } from 'react';
import axios from 'axios';

const BulkUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('يرجى اختيار ملف CSV أولاً!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/products/bulk-upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(`تم رفع ${response.data.total} منتج بنجاح!`);
    } catch (error) {
      setMessage('حدث خطأ أثناء الرفع!');
    }
  };

  return (
    <div>
      <h2>📂 رفع المنتجات بكميات كبيرة</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>📤 رفع المنتجات</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BulkUpload;
