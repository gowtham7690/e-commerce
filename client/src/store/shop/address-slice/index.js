import axios from "axios";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading : false ,
    addressList : []
}

export const getAddress = createAsyncThunk('/get/address',async (userId) => {
    const response = await axios.get(`http://localhost:3000/api/shop/address/get/${userId}`);

    return response.data;
})
export const addAddress = createAsyncThunk('/add/address', async ({ userId, Address, city, pincode, phone, state }) => {
        const response = await axios.post('http://localhost:3000/api/shop/address/add', { userId,Address,city,pincode,phone,state});
        return response.data;
});
export const updateAddress = createAsyncThunk('/update/address',async ({userId , addressId , formData}) => {
    
    const response = await axios.put(`http://localhost:3000/api/shop/address/update/${userId}/${addressId}`,{formData});

    return response.data;
})
export const deleteAddress = createAsyncThunk('/delete/address',async ({userId , addressId}) => {
    const response = await axios.delete(`http://localhost:3000/api/shop/address/delete/${userId}/${addressId}`);

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