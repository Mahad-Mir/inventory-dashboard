import React from 'react';
import CardWrapper from './CardWrapper';

export default function ProductCard({ product, onUpdateStock, onDeleteProduct }) {
  const statusText =
    product.stock === 0
      ? 'Out of Stock'
      : product.stock <= 5
      ? 'Low Stock'
      : 'In Stock';

  return (
    <CardWrapper>
      <div className="product-header">
        <strong>{product.title}</strong>
        <span className="badge">{statusText}</span>
      </div>

      <p>Category: {product.category}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Stock: {product.stock}</p>

      {product.stock === 0 && <p className="alert">Item is currently out of stock.</p>}

      <div className="actions">
        <button type="button" disabled={product.stock === 0} onClick={() => onUpdateStock(product.id, product.stock - 1)}>-1</button>
        <button type="button" onClick={() => onUpdateStock(product.id, product.stock + 1)}>+1</button>
        <button type="button" onClick={() => onDeleteProduct(product.id)}>Delete</button>
      </div>
    </CardWrapper>
  );
}
