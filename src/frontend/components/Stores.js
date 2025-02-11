import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stores = ({ ownerId }) => {
  const [stores, setStores] = useState([]);
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`/api/stores/${ownerId}`)
      .then(response => setStores([response.data]))
      .catch(error => console.error(error));
  }, [ownerId]);

  const handleCreateStore = async () => {
    if (!name || !domain) {
      setMessage('❌ يرجى إدخال جميع البيانات!');
      return;
    }

    await axios.post('/api/stores/create', { ownerId, name, domain });
    setMessage(`✅ تم إنشاء المتجر بنجاح: ${name}`);
  };

  const handleLinkToMahally = async (storeId) => {
    await axios.put(`/api/stores/${storeId}/link-mahally`);
    setMessage('✅ تم ربط المتجر بـ Mahally!');
  };

  return (
    <div>
      <h2>🏪 إدارة المتاجر</h2>
      <label>اسم المتجر:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <label>الدومين:</label>
      <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} />

      <button onClick={handleCreateStore}>➕ إنشاء متجر</button>

      <h3>متاجرك</h3>
      <ul>
        {stores.map(store => (
          <li key={store.id}>
            {store.name} ({store.domain})
            {!store.isSyncedWithMahally && (
              <button onClick={() => handleLinkToMahally(store.id)}>🔗 ربط بـ Mahally</button>
            )}
          </li>
        ))}
      </ul>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Stores;
