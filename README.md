# NUA Assignment

A simple e-commerce application built with React, TypeScript, Tailwind CSS, and Redux Toolkit. It connects to the FakeStore API to display products and allows users to manage a shopping cart.

## Table of Contents

- [Live Demo & Repository](#live-demo--repository)
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Features](#features)
- [Implementation Details](#implementation-details)
- [Design Choices](#design-choices)
- [Trade-offs](#trade-offs)
- [Folder Structure](#folder-structure)
- [Future Work](#future-work)

## Live Demo & Repository

- **Live website:** [https://nua-ec.vercel.app](https://nua-ec.vercel.app)
- **GitHub repository:** [https://github.com/seyaduraja/NUA](https://github.com/seyaduraja/NUA)

## Overview

This project demonstrates an e-commerce front-end that displays product lists and detailed product information using the FakeStore API. A shopping cart is implemented using Redux Toolkit to maintain consistent state across pages.

RTK Query is used for API communication, while Tailwind CSS handles layout and styling. The entire application is responsive and includes lazy loading for all main pages, helping reduce initial load time.

## Tech Stack

- **React + TypeScript** – component structure with type safety
- **Redux Toolkit** – global state for the shopping cart
- **RTK Query** – data fetching and caching for API content
- **Tailwind CSS** – styling and responsive layout
- **Vite** – development environment
- **FakeStore API** – product data source

## Getting Started

### Clone the repository

```bash
git clone https://github.com/seyaduraja/NUA.git
cd NUA
```

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Visit the URL shown in your terminal (usually `http://localhost:5173`).

## Features

- Product listing and product detail pages
- Cart functionality: add, remove, and view items
- Global cart state managed with Redux Toolkit
- Product and category data fetched through RTK Query
- Lazy loading for major pages to improve initial render time
- Fully responsive layout across all screen sizes
- Clean and simple UI using Tailwind CSS

## Implementation Details

### Product Data

All product and category information is fetched from the FakeStore API using RTK Query. RTK Query handles request caching and ensures that repeated queries reuse existing data whenever possible.

### Cart State

The cart is managed through a dedicated Redux slice. This ensures that all pages have access to the same cart state, eliminating duplicate logic across components.

### Routing and Lazy Loading

Each major route (Home, Product Details, Checkout) is loaded using `React.lazy` and `Suspense`. This keeps the initial bundle small and delays loading of non-essential pages until needed.

### Styling

Tailwind CSS is used for layout, spacing, typography, and responsiveness. All pages adjust fluidly across mobile, tablet, and desktop.

## Design Choices

### RTK Query for Server Data

RTK Query removes the need for manual fetch calls and reduces repeated request code. It also keeps API logic in one place, making the data layer easier to maintain.

### Redux Toolkit for Cart State

The cart is shared across multiple pages, so a central state store avoids passing props through components.

### Combining RTK Query and Redux

- RTK Query handles server-fetched data
- Redux slices handle client-controlled state

This separation keeps the logic clear and organized.

### Lazy Loading

Each page is loaded only when needed, instead of all at once.

### Responsive Design

The layout is built to work consistently across all viewports.

## Trade-offs

### Benefits

- Data and client state are well-separated
- Predictable and consistent cart behavior
- Reduced repetition for API calls
- Improved performance through lazy loading

### Limitations

- Redux may feel heavy for very small applications
- Requires understanding both RTK Query and Redux slices
- FakeStore API has limited data variety

## Folder Structure

```
src/
├─ api/                # RTK Query API setup
├─ components/         # Reusable UI components
├─ pages/              # Route components (Home, ProductDetails, Checkout)
├─ hooks/              # Custom hooks
├─ store/              # Redux store and slices
├─ styles/             # Tailwind and global styles
├─ types/              # TypeScript interfaces for products, cart items, etc.
└─ App.tsx             # Root component
```





