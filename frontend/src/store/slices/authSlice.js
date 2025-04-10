import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../services/api';
import { setAuthToken } from '../../utils/axios';
import { jwtDecode } from 'jwt-decode';

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await authApi.login(credentials);
            const { token } = response.data.data;
            setAuthToken(token);
            localStorage.setItem('token', token);
            
            // Decode token to get user data
            const decoded = jwtDecode(token);
            const user = {
                id: decoded.id,
                name: decoded.name,
                email: decoded.email,
                roles: decoded.roles
            };
            
            return { token, user };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 
                error.response?.data?.error || 
                'Login failed. Please check your credentials.'
            );
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await authApi.register(userData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 
                error.response?.data?.error || 
                'Registration failed. Please try again.'
            );
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('token');
    setAuthToken(null);
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        initializeAuth: (state) => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    const currentTime = Date.now() / 1000;
                    
                    if (decoded.exp && decoded.exp < currentTime) {
                        localStorage.removeItem('token');
                        state.token = null;
                        state.user = null;
                        state.isAuthenticated = false;
                    } else {
                        state.token = token;
                        state.user = {
                            id: decoded.id,
                            name: decoded.name,
                            email: decoded.email,
                            roles: decoded.roles
                        };
                        state.isAuthenticated = true;
                        setAuthToken(token);
                    }
                } catch (error) {
                    localStorage.removeItem('token');
                    state.token = null;
                    state.user = null;
                    state.isAuthenticated = false;
                }
            }
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Register
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.error = null;
            });
    },
});

export const { initializeAuth, clearError } = authSlice.actions;
export default authSlice.reducer;
