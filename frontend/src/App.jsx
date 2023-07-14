import './App.css'
import React, { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { useLocalStorage } from 'react-use';
import Home from './pages/Home'
import Store from './pages/Store'
import Error from './pages/Error'
import ServerError from './pages/ServerError'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import ProductDetail from './pages/ProductDetail'
import Admin from './pages/Admin'
import Seller from './pages/Seller'
import Dashboard from './components/dashboard/seller/Dashboard'
import Products from './components/dashboard/seller/Products'
import ProtectedRoutes from './pages/ProtectedRoutes'

import Menu from './components/Menu'
import Orders from './components/dashboard/seller/Orders';
import AddProduct from './components/dashboard/seller/AddProduct';
import Payments from './components/dashboard/seller/Payments';
import Invoice from './components/dashboard/seller/Invoice';
import Reports from './components/dashboard/seller/Reports';
import Help from './components/dashboard/seller/Help';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [path, setPath, remove] = useLocalStorage("path", null);

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Menu />} />
        <Route path='/' element={<Home />} >
          <Route path='store' element={<Store />} >
            <Route path=':id' element={<ProductDetail />} />
          </Route>
          <Route path='cart' element={<Cart />} />
          <Route path='auth/login' element={<Login role='user' />} />
          <Route path='auth/register' element={<Register role='user' />} />
          <Route path='contact' element={<Contact />} />
          <Route path='admin' element={<Admin />} />
          <Route path='*' element={<Error />} />
          <Route path='error/404' element={<Error />} />
          <Route path='error/500' element={<ServerError />} />
        </Route>
        {/* seller routes */}
        <Route path='/seller/login' element={<Login role='seller' />} />
        <Route path='/seller/register' element={<Register role='seller' />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/seller' element={<Seller />} >
            <Route index element={<Dashboard />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='orders' element={<Orders />} />
            <Route path='products' element={<Products />} />
            <Route path='add-product' element={<AddProduct />} />
            <Route path='payments' element={<Payments />} />
            <Route path='invoice' element={<Invoice />} />
            <Route path='reports' element={<Reports />} />
            <Route path='help' element={<Help />} />
          </Route>
        </Route>
        {/* admin routes */}
        <Route path='/admin/login' element={<Login role='admin' />} />
        <Route element={<ProtectedRoutes />}>
          {/* <Route path='/admin' element={<Seller />} >
            <Route index element={<Dashboard />} />
            <Route path='dashboard' element={<Dashboard />} />
          </Route> */}
        </Route>
      </Routes>
      <Toaster
        position='bottom-center'
      />
    </>
  )
}

export default App
