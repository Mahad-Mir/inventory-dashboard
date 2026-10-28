import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export default function Header({ totalProducts, activeProducts, totalStock }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <div className="header-top">
        <h1>Inventory Management Dashboard</h1>
        <button type="button" onClick={toggleTheme}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>

      <div className="metrics">
        <span>Total Products: <strong>{totalProducts}</strong></span>
        <span>Active Products: <strong>{activeProducts}</strong></span>
        <span>Total Stock: <strong>{totalStock}</strong></span>
      </div>
    </header>
  );
}
