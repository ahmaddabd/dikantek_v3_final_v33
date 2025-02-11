import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error(error));
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    await axios.put(`/api/orders/${orderId}/status`, { status });
    setOrders((prevOrders) => prevOrders.map(order => order.id === orderId ? { ...order, status } : order));
  };

  return (
    <div>
      <h2>📦 إدارة الطلبات</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>العميل</th>
            <th>المبلغ</th>
            <th>الحالة</th>
            <th>الإجراء</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user?.name}</td>
              <td>${order.totalPrice}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => updateOrderStatus(order.id, 'Shipped')}>🚚 تم الشحن</button>
                <button onClick={() => updateOrderStatus(order.id, 'Completed')}>✅ مكتمل</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
