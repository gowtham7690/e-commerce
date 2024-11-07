import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    cartItems: [],
    isLoading: false
};

export const addCart = createAsyncThunk('/addCart', async ({ userId, productId, quantity }) => {
    console.log(quantity);
    const response = await axios.post('http://localhost:3000/api/shop/cart/add', { userId, productId, quantity });
    return response.data;
});

export const fetchCart = createAsyncThunk('/fetchCart', async (userId) => {
    const response = await axios.get(`http://localhost:3000/api/shop/cart/get/${userId}`);
    return response.data;
});

export const updateCart = createAsyncThunk('/updateCart', async ({ userId, productId, quantity }) => {
    const response = await axios.put('http://localhost:3000/api/shop/cart/update', { userId, productId, quantity });
    return response.data;
});

export const deleteCart = createAsyncThunk('/deleteCart', async ({ userId, productId }) => {
    const response = await axios.delete(`http://localhost:3000/api/shop/cart/delete/${userId}/${productId}`);
    return response.data;
});

const shopCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(addCart.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            })
            .addCase(fetchCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(fetchCart.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            })
            .addCase(updateCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(updateCart.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            })
            .addCase(deleteCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCart.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload.data);
                state.cartItems = action.payload.data;
            })
            .addCase(deleteCart.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            });
    },
});

export default shopCartSlice.reducer;
