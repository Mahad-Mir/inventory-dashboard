import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import Header from './components/functional/Header';
import ProductForm from './components/functional/ProductForm';
import ProductList from './components/functional/ProductList';
import AuditLogger from './components/class/AuditLogger';

const INITIAL_PRODUCTS = [
  { id: '1', title: 'Wireless Keyboard', category: 'Electronics', price: 59.99, stock: 10 },
  { id: '2', title: 'Cotton Hoodie', category: 'Apparel', price: 35.0, stock: 3 },
  { id: '3', title: 'Desk Lamp', category: 'Home', price: 24.5, stock: 0 },
];

function Dashboard() {
  const { theme } = useContext(ThemeContext);

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('inventory_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [stockFilter, setStockFilter] = useState('All');
  const [latestAction, setLatestAction] = useState(null);

  const { totalStock, activeProducts } = useMemo(() => {
    return {
      totalStock: products.reduce((sum, p) => sum + p.stock, 0),
      activeProducts: products.filter((p) => p.stock > 0).length,
    };
  }, [products]);

  useEffect(() => {
    localStorage.setItem('inventory_products', JSON.stringify(products));
    document.title = `Inventory (${activeProducts} Active)`;
  }, [products, activeProducts]);

  const logOperation = useCallback((message) => {
    setLatestAction({
      id: `${Date.now()}-${Math.random()}`,
      message,
      timestamp: new Date().toLocaleTimeString(),
    });
  }, []);

  const handleAddProduct = useCallback(
    (product) => {
      setProducts((prev) => [product, ...prev]);
      logOperation(`Product added: ${product.title}`);
    },
    [logOperation]
  );

  const handleUpdateStock = useCallback(
    (id, newStock) => {
      setProducts((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            logOperation(`Stock updated for ${item.title}: ${newStock}`);
            return { ...item, stock: Math.max(0, newStock) };
          }
          return item;
        })
      );
    },
    [logOperation]
  );

  const handleDeleteProduct = useCallback(
    (id) => {
      setProducts((prev) => {
        const target = prev.find((item) => item.id === id);
        if (target) {
          logOperation(`Item deleted: ${target.title}`);
        }
        return prev.filter((item) => item.id !== id);
      });
    },
    [logOperation]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch = selectedCategory === 'All' || p.category === selectedCategory;
      const statusMatch =
        stockFilter === 'All' ||
        (stockFilter === 'In Stock' && p.stock > 5) ||
        (stockFilter === 'Low Stock' && p.stock > 0 && p.stock <= 5) ||
        (stockFilter === 'Out of Stock' && p.stock === 0);
      return categoryMatch && statusMatch;
    });
  }, [products, selectedCategory, stockFilter]);

  return (
    <div className={`app ${theme}`}>
      <Header
        totalProducts={products.length}
        activeProducts={activeProducts}
        totalStock={totalStock}
      />

      <div className="layout">
        <div className="left-col">
          <ProductForm onAddProduct={handleAddProduct} />
          <AuditLogger latestAction={latestAction} />
        </div>

        <div className="right-col">
          <ProductList
            products={filteredProducts}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            stockFilter={stockFilter}
            onStockFilterChange={setStockFilter}
            onUpdateStock={handleUpdateStock}
            onDeleteProduct={handleDeleteProduct}
          />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}
