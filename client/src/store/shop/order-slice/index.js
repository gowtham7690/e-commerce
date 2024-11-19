import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    approvalUrl : null ,
    isLoading : false ,
    orderId : null ,
    orderList : [],
    orderDetails : null
}

export const createNewOrder = createAsyncThunk('/order/createNewOrder' , async (orderData) => {
    const response = await axios.post('http://localhost:3000/api/shop/order/create',{orderData})

    return response?.data ;
}) 
export const capturePayment = createAsyncThunk('/order/capturePayment' , async ({paymentId , payerId , orderId}) => {
    const response = await axios.post('http://localhost:3000/api/shop/order/capture',{paymentId , payerId , orderId})

    return response?.data ;
}) 
export const getAllOrder = createAsyncThunk('/order/allOrder' , async (id) => {
    const response = await axios.post(`http://localhost:3000/api/shop/order/list/${id}`)

    return response?.data ;
}) 
export const orderDetails = createAsyncThunk('/order/detail' , async (id) => {
    const response = await axios.post(`http://localhost:3000/api/shop/order/details/${id}`)

    return response?.data ;
}) 
const shopOrderSlice = createSlice({
    name : 'order',
    initialState ,
    reducers  : {},
    extraReducers : (builder) => {
        builder.addCase(createNewOrder.pending , (state ) => {
            state.isLoading = true 
        }).addCase(createNewOrder.fulfilled , (state , action) => {
            state.isLoading =  false ,
            state.orderId =  action.payload.orderId,
            state.approvalUrl =  action.payload.approvalUrl,
            sessionStorage.setItem('currentOrderId',JSON.stringify(action.payload.orderId));
        }).addCase(createNewOrder.rejected , (state ) => {
            state.isLoading =  false ,
            state.orderId =  null ,
            state.approvalUrl =  null 
        }).addCase(getAllOrder.pending , (state ) => {
            state.isLoading = true 
        }).addCase(getAllOrder.fulfilled , (state , action) => {
            state.isLoading =  false ,
            state.orderList =  action.payload.orderList,
        }).addCase(getAllOrder.rejected , (state ) => {
            state.isLoading =  false ,
            state.orderList =  null 
        }).addCase(orderDetails.pending , (state ) => {
            state.isLoading = true 
        }).addCase(orderDetails.fulfilled , (state , action) => {
            state.isLoading =  false ,
            state.orderDetails =  action.payload.orderDetails,
        }).addCase(orderDetails.rejected , (state ) => {
            state.isLoading =  false ,
            state.orderDetails =  null 
        });
    }
})
export default shopOrderSlice.reducer;