import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    productList: [],
    productDetails: null,
};

// Fetch all filtered products with optional filter and sort parameters
export const fetchAllFilteredProduct = createAsyncThunk(
    'products/fetchAllFilteredProduct',
    async ({ filterParams, sortParams }) => {
        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParams
        });
        const result = await axios.get(`http://localhost:3000/api/shop/product/get?${query}`);
        return result?.data;
    }
);

// Fetch details of a single product by ID
export const getProductDetails = createAsyncThunk(
    'products/getProductDetails',
    async (id ) => {
        const result = await axios.get(`http://localhost:3000/api/shop/product/get/${id}`);
        return result?.data;
    }
);

const shopProductSlice = createSlice({
    name: 'shoppingProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFilteredProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllFilteredProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload.products;
            })
            .addCase(fetchAllFilteredProduct.rejected, (state) => {
                state.isLoading = false;
                state.productList = [];
            })
            .addCase(getProductDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productDetails = action.payload.data;
            })
            .addCase(getProductDetails.rejected, (state) => {
                state.isLoading = false;
                state.productDetails = null;
            });
    }
});

export default shopProductSlice.reducer;
