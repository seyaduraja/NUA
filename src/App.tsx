import { Routes, Route } from 'react-router-dom';
import React from 'react';

const Checkout = React.lazy(() => import('./pages/Checkout.tsx'))
const HomePage = React.lazy(() => import('./pages/HomePage.tsx'))
const ProductDetails = React.lazy(() => import('./pages/ProductDetails.tsx'))
const Cart = React.lazy(() => import('./pages/Cart.tsx'))
const ProductListing = React.lazy(() => import('./pages/ProductListing.tsx'))


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products' element={<ProductListing />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>

    </>
  )
}

export default App
