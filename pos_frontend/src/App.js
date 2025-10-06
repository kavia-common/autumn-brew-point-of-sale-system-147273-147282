import React, { useEffect, useMemo, useState } from 'react';
import './index.css';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import Toast from './components/Toast';
import { CartProvider } from './context/CartContext';
import { products, categories } from './data/products';
import { supabase, isSupabaseConfigured } from './lib/supabaseClient';

// PUBLIC_INTERFACE
function App() {
  /** Root state for POS screens and filters */
  const [activeCategory, setActiveCategory] = useState('Coffee');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [supabaseWarningDismissed, setSupabaseWarningDismissed] = useState(false);

  const filteredProducts = useMemo(
    () => products.filter(p => p.category === activeCategory),
    [activeCategory]
  );

  useEffect(() => {
    // Placeholder: future Supabase fetches can be added here if configured.
    if (isSupabaseConfigured()) {
      // Example: supabase.from('menu_items').select('*')
      // Leaving as placeholder to avoid network calls until envs provided.
    }
  }, [activeCategory]);

  const handleAdd = (name) => setToast({ type: 'success', message: `${name} added to cart` });
  const handleError = (message) => setToast({ type: 'error', message });

  return (
    <CartProvider>
      <div className="pos-app">
        <Header />
        {!isSupabaseConfigured() && !supabaseWarningDismissed && (
          <div className="env-warning" role="status" aria-live="polite">
            <div>
              Supabase is not configured. Set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY in .env to enable backend features.
            </div>
            <button
              className="btn btn-ghost"
              onClick={() => setSupabaseWarningDismissed(true)}
              aria-label="Dismiss Supabase configuration warning"
            >
              Dismiss
            </button>
          </div>
        )}
        <div className="layout">
          <aside className="sidebar">
            <Sidebar
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </aside>
          <main className="main">
            <ProductGrid
              products={filteredProducts}
              onAdd={handleAdd}
              onError={handleError}
            />
          </main>
          <section className="cart">
            <Cart
              onCheckout={() => setCheckoutOpen(true)}
              onInfo={setToast}
            />
          </section>
        </div>

        <CheckoutModal
          open={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          onComplete={(orderId) => {
            setCheckoutOpen(false);
            setToast({ type: 'success', message: `Order ${orderId} completed` });
          }}
        />

        {toast && (
          <Toast
            type={toast.type}
            onClose={() => setToast(null)}
          >
            {toast.message}
          </Toast>
        )}
      </div>
    </CartProvider>
  );
}

export default App;
