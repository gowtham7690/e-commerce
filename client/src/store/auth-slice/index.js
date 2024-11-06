import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};
export const registerUser = createAsyncThunk('/signup', 
  async (formData) => {
    const response = await axios.post('http://localhost:3000/api/signup', formData, {
      withCredentials: true,
    });
    return response.data;
  }
);
export const loginUser = createAsyncThunk('/login', 
  async (formData) => {
    const response = await axios.post('http://localhost:3000/api/login', formData, {
      withCredentials: true,
    });
    return response.data;
  }
);
export const logoutUser = createAsyncThunk('/logout', 
  async () => {
    const response = await axios.get('http://localhost:3000/api/logout', {
      withCredentials: true,
    });
    return response.data;
  }
);
export const checkAuth = createAsyncThunk('/checkauth', 
  async () => {
    const response = await axios.get('http://localhost:3000/api/checkauth ', {
      headers :{ "Cache-Control " : "no-store , no-cache ,must-revalidate , proxy-revalidate"},
      withCredentials: true
    });
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser   : () => {

    }
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => { 
        state.isLoading = false;
        state.user = null; 
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => { 
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => { 
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user :  null; 
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => { 
        state.isLoading = false;
        state.user = null; 
        state.isAuthenticated = false;
      }).addCase(checkAuth.pending, (state) => { 
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => { 
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user :  null; 
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => { 
        state.isLoading = false;
        state.user = null; 
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.pending, (state) => { 
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => { 
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state) => { 
        state.isLoading = false;
        state.user = null; 
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
