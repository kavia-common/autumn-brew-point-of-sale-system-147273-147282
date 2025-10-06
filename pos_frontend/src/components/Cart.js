import React, { useMemo } from 'react';
import { useCart } from '../context/CartContext';

const TAX_RATE = 0.0825;

// PUBLIC_INTERFACE
export default function Cart({ onCheckout, onInfo }) {
  const { items, increaseQty, decreaseQty, removeItem, clear } = useCart();

  const summary = useMemo(() => {
    const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }, [items]);

  const handleClear = () => {
    clear();
    onInfo && onInfo({ type: 'success', message: 'Cart cleared' });
  };

  return (
    <aside className="card" aria-label="Order summary">
      <div className="cart-header">
        <h3>Order</h3>
        <button className="btn btn-ghost" onClick={handleClear} aria-label="Clear cart">Clear</button>
      </div>
      <div className="cart-items" role="list">
        {items.length === 0 && <div className="muted">No items added yet.</div>}
        {items.map(it => (
          <div className="cart-item" key={it.id} role="listitem">
            <div>
              <div className="cart-name">{it.name}</div>
              <div className="muted">${it.price.toFixed(2)}</div>
            </div>
            <div className="cart-qty" aria-label={`${it.name} quantity controls`}>
              <button className="qty-btn" onClick={() => decreaseQty(it.id)} aria-label={`Decrease ${it.name}`}>−</button>
              <div aria-live="polite" aria-atomic="true">{it.quantity}</div>
              <button className="qty-btn" onClick={() => increaseQty(it.id)} aria-label={`Increase ${it.name}`}>+</button>
              <button className="btn" onClick={() => removeItem(it.id)} aria-label={`Remove ${it.name}`}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="totals">
        <div className="totals-row"><span>Subtotal</span><span>${summary.subtotal.toFixed(2)}</span></div>
        <div className="totals-row"><span>Tax</span><span>${summary.tax.toFixed(2)}</span></div>
        <div className="totals-row totals-grand"><span>Total</span><span>${summary.total.toFixed(2)}</span></div>
      </div>

      <button
        className="btn btn-primary checkout-btn"
        onClick={onCheckout}
        disabled={items.length === 0}
        aria-disabled={items.length === 0}
        aria-label="Proceed to checkout"
      >
        Checkout
      </button>
    </aside>
  );
}
