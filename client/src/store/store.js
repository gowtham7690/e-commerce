import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice';
import adminProductSlice from './admin/product-slice';
import shopProductSlice from './shop/product-slice';
import shopCartSlice from './shop/cart-slice';
import shopAddressSlice from './shop/address-slice';



const store = configureStore({
    reducer : {
          auth : authReducer , 
          adminProducts : adminProductSlice, 
          shopProducts : shopProductSlice, 
          shopcarts : shopCartSlice, 
          shopaddress : shopAddressSlice, 
    },
})
export default store;