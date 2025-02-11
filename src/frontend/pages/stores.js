import React from 'react';
import Stores from '../components/Stores';

export default function StoresPage() {
  return (
    <div>
      <h1>🏪 إدارة المتاجر</h1>
      <Stores ownerId={1} />
    </div>
  );
}
