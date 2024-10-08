import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register the User
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Login the User
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// On logout, use logout() function from authService.js
export const logout = createAsyncThunk('auth/logout', async() => {
    await authService.logout();
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false,
            state.isSuccess = false,
            state.isError = false,
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            // When register is pending.
            state.isLoading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
            // When register is successful
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
            // When register is unsuccessful.
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
        })
        .addCase(login.pending, (state) => {
            // When login pending
            state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            // When login successful
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
            // When login has an error
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
        })
        .addCase(logout.fulfilled, (state) => {
            // When logout fulfilled, set user to null
            state.user = null;
        })
    }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;