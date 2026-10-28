import React from 'react';
import ProductCard from './ProductCard';
import CardWrapper from './CardWrapper';

const CATEGORIES = ['All', 'Electronics', 'Apparel', 'Home'];
const STATUSES = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];

export default function ProductList({
  products,
  selectedCategory,
  onCategoryChange,
  stockFilter,
  onStockFilterChange,
  onUpdateStock,
  onDeleteProduct,
}) {
  return (
    <CardWrapper title="Product List">
      <div className="filters">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              Category: {cat}
            </option>
          ))}
        </select>

        <select
          value={stockFilter}
          onChange={(e) => onStockFilterChange(e.target.value)}
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              Status: {status}
            </option>
          ))}
        </select>
      </div>

      {products.length === 0 && <p>No products found in inventory.</p>}

      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onUpdateStock={onUpdateStock}
              onDeleteProduct={onDeleteProduct}
            />
          ))}
        </div>
      ) : null}
    </CardWrapper>
  );
}
