import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export default function CardWrapper({ title, children }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`card ${theme}`}>
      {title && <h3>{title}</h3>}
      <div>{children}</div>
    </div>
  );
}
