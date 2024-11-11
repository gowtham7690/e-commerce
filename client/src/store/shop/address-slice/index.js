import axios from "axios";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading : false ,
    addressList : []
}

const getAddress = createAsyncThunk('/get/address',(id) => {
    const response = axios.get(`http://localhost:3000/api/shop/address/get/:${id}`);

    return response.data;
})
const addAddress = createAsyncThunk('/add/address',({userId , address , city , pincode , phone , notes}) => {
    const response = axios.post(`http://localhost:3000/api/shop/address/add` , userId , address , city , pincode , phone , notes);

    return response.data;
})
const updateAddress = createAsyncThunk('/update/address',({userId , addressId , formData}) => {
    const response = axios.put(`http://localhost:3000/api/shop/address/update/:${userId}/:${addressId}`,formData);

    return response.data;
})
const deleteAddress = createAsyncThunk('/delete/address',({userId , addressId}) => {
    const response = axios.delete(`http://localhost:3000/api/shop/address/delete/:${userId}/:${addressId}`);

    return response.data;
})

const shopAddressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload;
            })
            .addCase(addAddress.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload;
            })
            .addCase(getAddress.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(updateAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload;
            })
            .addCase(updateAddress.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload;
            })
            .addCase(deleteAddress.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export default shopAddressSlice.reducer;