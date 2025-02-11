import React from 'react';
import Link from 'next/link';
import styles from '../styles/BottomNavigation.module.css';

const BottomNavigation = () => {
  return (
    <nav className={styles.bottomNav}>
      <Link href="/">
        <div className={styles.navItem}>
          <span>🏠</span>
          <p>الرئيسية</p>
        </div>
      </Link>
      <Link href="/products">
        <div className={styles.navItem}>
          <span>🛒</span>
          <p>المنتجات</p>
        </div>
      </Link>
      <Link href="/orders">
        <div className={styles.navItem}>
          <span>📦</span>
          <p>الطلبات</p>
        </div>
      </Link>
      <Link href="/settings">
        <div className={styles.navItem}>
          <span>⚙️</span>
          <p>الإعدادات</p>
        </div>
      </Link>
    </nav>
  );
};

export default BottomNavigation;
