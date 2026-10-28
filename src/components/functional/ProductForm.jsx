import React, { useState, useRef, useEffect } from 'react';
import CardWrapper from './CardWrapper';

const CATEGORIES = ['Electronics', 'Apparel', 'Home'];

export default function ProductForm({ onAddProduct }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const titleInputRef = useRef(null);

  useEffect(() => {titleInputRef.current.focus();}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || price === '' || stock === '') return;

    onAddProduct({
      id: Date.now().toString(),
      title: title.trim(),
      category,
      price: Number(price),
      stock: Number(stock),
    });

    setTitle('');
    setCategory(CATEGORIES[0]);
    setPrice('');
    setStock('');
    titleInputRef.current.focus();
  };

  return (
    <CardWrapper title="Add Product">
      <form onSubmit={handleSubmit} className="product-form">
        <input
          ref={titleInputRef}
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="number"
          min="0"
          placeholder="Stock Quantity"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />

        <button type="submit">Add Product</button>
      </form>
    </CardWrapper>
  );
}
