import './App.css'
import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Store from './pages/Store'
import Error from './pages/Error'
import Contact from './pages/Contact'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import ProductDetail from './pages/ProductDetail'
import Seller from './pages/Seller'
import Admin from './pages/Admin'

function App() {
  const location = useLocation();
  return (
    <>
      <Header />
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path='/store' element={<Store />} />
        <Route path='/store/:id' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/register' element={<Register />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/seller' element={<Seller />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='*' element={<Error />} />
        <Route path='/error' element={<Error />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
