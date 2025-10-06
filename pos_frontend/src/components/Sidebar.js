import React from 'react';

/** Category item button */
function CategoryItem({ item, active, onClick }) {
  return (
    <button
      className={`category ${active ? 'active' : ''}`}
      onClick={onClick}
      aria-pressed={active}
      aria-label={`Category ${item.name}`}
    >
      <div className="category-badge" aria-hidden="true">{item.emoji}</div>
      <div>
        <div className="category-name">{item.name}</div>
        <div className="category-desc">{item.desc}</div>
      </div>
    </button>
  );
}

// PUBLIC_INTERFACE
export default function Sidebar({ categories, activeCategory, onSelectCategory }) {
  return (
    <nav className="card" aria-label="Product categories">
      {categories.map(cat => (
        <CategoryItem
          key={cat.name}
          item={cat}
          active={activeCategory === cat.name}
          onClick={() => onSelectCategory(cat.name)}
        />
      ))}
    </nav>
  );
}
