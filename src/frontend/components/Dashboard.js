import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Dashboard() {
  const [store, setStore] = useState(null);
  const [orders, setOrders] = useState([]);
  const [setupProgress, setSetupProgress] = useState(0);

  useEffect(() => {
    axios.get('/api/user-theme/1') // استرجاع بيانات المتجر
      .then(response => setStore(response.data))
      .catch(error => console.error(error));

    axios.get('/api/orders') // استرجاع الطلبات
      .then(response => setOrders(response.data))
      .catch(error => console.error(error));

    axios.get('/api/store/setup-progress') // استرجاع نسبة إكمال الإعداد
      .then(response => setSetupProgress(response.data.progress))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>🛍️ لوحة التحكم</h1>

      <section>
        <h2>📊 تقدم إعداد المتجر</h2>
        <div style={{ background: '#f3f3f3', borderRadius: '8px', padding: '5px', width: '100%' }}>
          <div style={{ width: `${setupProgress}%`, background: '#4caf50', height: '20px', borderRadius: '8px' }}></div>
        </div>
        <p>{setupProgress}% مكتمل</p>
      </section>

      <section>
        <h2>🎨 تخصيص المتجر</h2>
        <p>تحكم في تصميم متجرك الإلكتروني.</p>
        <Link href="/customize"><button>🔧 تعديل التصميم</button></Link>
      </section>

      <section>
        <h2>📦 إدارة المنتجات</h2>
        <p>أضف أو عدّل منتجات متجرك.</p>
        <Link href="/products"><button>🛒 إدارة المنتجات</button></Link>
      </section>

      <section>
        <h2>💰 المبيعات والطلبات</h2>
        <p>متابعة الطلبات والمبيعات.</p>
        <ul>
          {orders.map(order => (
            <li key={order.id}>🛍️ الطلب #{order.id} - {order.status}</li>
          ))}
        </ul>
        <Link href="/orders"><button>📊 عرض المبيعات</button></Link>
      </section>

      <section>
        <h2>⚙️ إعدادات الدفع والشحن</h2>
        <p>إعداد خيارات الدفع والتوصيل.</p>
        <Link href="/settings"><button>💳 إدارة الإعدادات</button></Link>
      </section>
    </div>
  );
}
