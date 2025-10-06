import React from 'react';

// PUBLIC_INTERFACE
export default function Header() {
  /** Header with cafe branding and seasonal theme hint */
  return (
    <header className="header card" role="banner">
      <div className="header-inner">
        <div className="brand" aria-label="Autumn Brew cafe brand">
          <div className="brand-badge" aria-hidden="true">AB</div>
          <div className="brand-text">
            <span className="brand-name">Autumn Brew POS</span>
            <span className="brand-sub">Ocean Professional • Fall Seasonal Specials</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" aria-label="View specials">🍂 Fall Specials</button>
          <button className="btn btn-primary" aria-label="New order">New Order</button>
        </div>
      </div>
    </header>
  );
}
