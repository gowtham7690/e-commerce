import { Route, Routes } from 'react-router-dom';
import './App.css'
import Login from "./pages/auth/login.jsx";
import Signup from "./pages/auth/signup.jsx";
import Product from './pages/admin/product.jsx';
import Order from './pages/admin/order.jsx';
import Layout from './components/admin/layout.jsx';
import Dashboard from './pages/admin/dashboard.jsx';
import Shopping from './components/shopping/layout.jsx';
import Notfound from './pages/not found/index.jsx';
import ShoppingHome from './pages/shopping/home.jsx';
import ShoppingCart from './pages/shopping/cart.jsx';
import ShoppingListing from './pages/shopping/listing.jsx';
import ShoppingCheckout from './pages/shopping/checkout.jsx';
import ShoppingAccount from './pages/shopping/account.jsx';
import CheckAuth from './components/common/check-auth.jsx';
import UnauthPage from './pages/not found/unauth-page.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/auth-slice/index.js';
import PaymentSuccess from './pages/shopping/payment-accept.jsx';
import PaymentRejected from './pages/shopping/payment-reject.jsx';
import PaymentReturn from './pages/shopping/payment-pending.jsx';

function App() {
 
  const {user , isAuthenticated , isLoading} = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  },[dispatch])
  if(isLoading)
      return<div>Loading...</div>
  return ( 
    <div>
      <Routes>
        <Route path="/signup" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Signup />
            </CheckAuth>
            } />
        <Route path="/login" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Login />
          </CheckAuth>
            } />
        
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Layout />
          </CheckAuth>
        }>
          <Route path="order" element={<Order />} />
          <Route path="product" element={<Product />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Shopping />
          </CheckAuth>
        }>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="cart" element={<ShoppingCart />} />
          <Route path="checkout" element= {<ShoppingCheckout />} />
          <Route path="paypal-return" element= {<PaymentReturn />} />
          <Route path="paypal-success" element= {<PaymentSuccess />} />
          <Route path="paypal-cancel" element= {<PaymentRejected />} />
          <Route path="account" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingAccount />
            </CheckAuth>

          } />
        </Route>

        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
