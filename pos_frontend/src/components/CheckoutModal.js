import React, { useEffect, useMemo, useState } from 'react';
import { useCart } from '../context/CartContext';

const TAX_RATE = 0.0825;

// PUBLIC_INTERFACE
export default function CheckoutModal({ open, onClose, onComplete }) {
  const { items, clear } = useCart();
  const [processing, setProcessing] = useState(false);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    if (!open) {
      setProcessing(false);
      setOrderId(null);
    }
  }, [open]);

  const summary = useMemo(() => {
    const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }, [items]);

  const completeOrder = async () => {
    setProcessing(true);
    // Simulate processing delay
    await new Promise(r => setTimeout(r, 700));
    const id = 'AB-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    setOrderId(id);
    clear();
    onComplete && onComplete(id);
  };

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Checkout">
      <div className="modal">
        <div className="modal-header">
          <strong>Checkout</strong>
          <button className="btn btn-ghost" onClick={onClose} aria-label="Close checkout">✕</button>
        </div>
        <div className="modal-body">
          <div className="receipt">
            <div className="receipt-row" style={{ marginBottom: 8 }}>
              <strong>Autumn Brew POS</strong>
              <span>Order Preview</span>
            </div>
            <div style={{ borderTop: '1px dashed #e5e7eb', margin: '8px 0' }} />
            {items.length === 0 ? (
              <div>No items in order.</div>
            ) : (
              items.map(it => (
                <div className="receipt-row" key={it.id}>
                  <span>{it.quantity} x {it.name}</span>
                  <span>${(it.price * it.quantity).toFixed(2)}</span>
                </div>
              ))
            )}
            <div style={{ borderTop: '1px dashed #e5e7eb', margin: '8px 0' }} />
            <div className="receipt-row">
              <span>Subtotal</span><span>${summary.subtotal.toFixed(2)}</span>
            </div>
            <div className="receipt-row">
              <span>Tax</span><span>${summary.tax.toFixed(2)}</span>
            </div>
            <div className="receipt-row receipt-total">
              <span>Total</span><span>${summary.total.toFixed(2)}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
            <button className="btn" onClick={onClose} aria-label="Back">Back</button>
            <button
              className="btn btn-primary"
              onClick={completeOrder}
              disabled={processing || items.length === 0}
              aria-busy={processing ? 'true' : 'false'}
              aria-label="Complete order"
            >
              {processing ? 'Processing…' : 'Complete Order'}
            </button>
          </div>

          {orderId && (
            <div style={{ marginTop: 12 }}>
              <div role="status">Order {orderId} complete.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
