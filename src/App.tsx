import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import ProductDetails from './pages/ProductDetails.tsx';
import ProductListing from './pages/ProductListing.tsx';
import Cart from './pages/Cart.tsx';
import Checkout from './pages/Checkout.tsx';


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
