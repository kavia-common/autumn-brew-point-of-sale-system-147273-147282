import React from 'react';
import { useCart } from '../context/CartContext';

// PUBLIC_INTERFACE
export default function ProductCard({ product, onAdd, onError }) {
  const { addItem } = useCart();

  const addToCart = () => {
    try {
      addItem(product);
      onAdd && onAdd(product.name);
    } catch (e) {
      onError && onError('Unable to add item');
    }
  };

  return (
    <div className="product" role="article" aria-label={product.name}>
      <div className="product-media" aria-hidden="true" />
      <div className="product-body">
        <div className="product-title">{product.name}</div>
        <div className="product-meta">
          <span className="price">${product.price.toFixed(2)}</span>
          <span aria-label="category">{product.category}</span>
        </div>
        <button className="btn btn-primary" onClick={addToCart} aria-label={`Add ${product.name} to cart`}>
          Add to Order
        </button>
      </div>
    </div>
  );
}
