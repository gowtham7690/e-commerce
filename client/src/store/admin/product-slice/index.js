import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';
const initialState = {
    isLoading : false,
    productList : []
}

export const addnewProduct = createAsyncThunk('/products/addnewproduct',async (formData) => {
  console.log("adding",formData)
    const result = await axios.post('http://localhost:3000/api/admin/product/add', formData, {
      headers : {
       'Content-Type' : 'application/json'
      }
    });
    return result?.data;
    }
);
export const fetchAllProduct = createAsyncThunk('/products/fetchAllProduct',async (formData) => {
    const result = await axios.get('http://localhost:3000/api/admin/product/get');
    return result?.data;
    }
);
export const editProduct = createAsyncThunk('/products/editProduct',async ({ id, formData }) => {
  console.log("sending",formData)
    const result = await axios.put(`http://localhost:3000/api/admin/product/edit/${id}`, formData, {
      headers : {
        'Content-Type' : 'application/json'
      }
    });
    return result?.data;
    }
);
export const  deleteProduct = createAsyncThunk('/products/deleteroduct',async (id) => {
    const result = await axios.delete(`http://localhost:3000/api/admin/product/delete/${id}`, {
      headers : {
        'Content-Type' : 'application/json'
      }
    });
    return result?.data;
    }
);

const adminProductSlice = createSlice({
    name : "adminProduct",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchAllProduct.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchAllProduct.fulfilled, (state , action) => {
            console.log(action.payload);
            state.isLoading = false
            state.product = action.payload.products
        }).addCase(fetchAllProduct.rejected, (state) => {
            state.isLoading = false
            state.product = []
        })
    }
})


export default adminProductSlice.reducer