import React from 'react';
import Loyalty from '../components/Loyalty';

export default function LoyaltyPage() {
  return (
    <div>
      <h1>🏆 نظام الولاء والمكافآت</h1>
      <Loyalty userId={1} />
    </div>
  );
}
