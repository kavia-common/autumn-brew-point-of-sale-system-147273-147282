import React, { createContext, useContext, useMemo, useReducer, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return Array.isArray(action.payload) ? action.payload : [];
    case 'ADD': {
      const item = action.payload;
      const existing = state.find(i => i.id === item.id);
      if (existing) {
        return state.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...state, { ...item, quantity: 1 }];
    }
    case 'INC':
      return state.map(i => i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i);
    case 'DEC':
      return state.map(i => i.id === action.payload ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i);
    case 'REMOVE':
      return state.filter(i => i.id !== action.payload);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function CartProvider({ children }) {
  const [persisted, setPersisted] = useLocalStorage('ab_pos_cart', []);
  const [items, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    dispatch({ type: 'INIT', payload: persisted || [] });
  }, []); // load once

  useEffect(() => {
    setPersisted(items);
  }, [items, setPersisted]);

  const api = useMemo(() => ({
    items,
    addItem: (item) => dispatch({ type: 'ADD', payload: item }),
    increaseQty: (id) => dispatch({ type: 'INC', payload: id }),
    decreaseQty: (id) => dispatch({ type: 'DEC', payload: id }),
    removeItem: (id) => dispatch({ type: 'REMOVE', payload: id }),
    clear: () => dispatch({ type: 'CLEAR' }),
  }), [items]);

  return (
    <CartContext.Provider value={api}>
      {children}
    </CartContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
