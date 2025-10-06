# Autumn Brew POS Frontend

Ocean-Professional themed React POS for a fall-themed cafe. Includes sidebar categories, product grid, order cart, checkout with receipt preview, and Supabase client scaffolding.

## Features

- Ocean Professional theme (primary #2563EB, secondary #F59E0B), gradients, rounded corners, subtle shadows
- Sidebar categories: Coffee, Pastries, Specials
- Product grid and order cart with quantity adjustments
- Totals with tax and grand total
- Checkout modal simulating order completion and showing a receipt
- Supabase client scaffolding that reads env vars and gracefully disables when not configured
- LocalStorage cart persistence

## Getting Started

1) Install dependencies

```bash
npm install
```

2) Environment variables

Copy the example and fill in if you have Supabase. If left blank, the app will show a dismissible warning and skip network calls.

```bash
cp .env.example .env
# Edit .env to set:
# REACT_APP_SUPABASE_URL=
# REACT_APP_SUPABASE_KEY=
```

3) Run the app

```bash
npm start
```

Open http://localhost:3000

## Project Structure

- src/components: Header, Sidebar, ProductGrid, ProductCard, Cart, CheckoutModal, Toast
- src/context: CartContext with reducer and hooks
- src/data/products.js: Placeholder menu data
- src/lib/supabaseClient.js: Env-driven Supabase client placeholder
- src/index.css: Theme and layout styles

## Accessibility

- Buttons have proper aria-labels
- Modals use role="dialog" with aria-modal
- Live regions used for cart quantity and toasts

## Notes on Supabase

- The app reads REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY from .env
- When not set, supabase is null and the app disables network calls while showing a non-blocking banner
- To integrate fully, install @supabase/supabase-js and implement a real client in src/lib/supabaseClient.js
