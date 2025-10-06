import React, { useEffect } from 'react';

// PUBLIC_INTERFACE
export default function Toast({ type = 'info', children, onClose, duration = 2400 }) {
  useEffect(() => {
    const t = setTimeout(() => onClose && onClose(), duration);
    return () => clearTimeout(t);
  }, [onClose, duration]);

  return (
    <div className={`toast ${type}`} role="status" aria-live="polite">
      <div>{children}</div>
      <button className="toast-close" onClick={onClose} aria-label="Close toast">✕</button>
    </div>
  );
}
