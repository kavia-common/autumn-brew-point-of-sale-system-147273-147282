import React from 'react';
import ProductCard from './ProductCard';

// PUBLIC_INTERFACE
export default function ProductGrid({ products, onAdd, onError }) {
  return (
    <section className="card" aria-label="Products">
      <div className="grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} onError={onError} />
        ))}
      </div>
    </section>
  );
}
