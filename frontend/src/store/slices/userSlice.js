import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
    users: [],
    isLoading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const response = await axios.get('/api/admin/users');
        return response.data;
    }
);

export const updateUserStatus = createAsyncThunk(
    'users/updateStatus',
    async ({ userId, status }) => {
        const response = await axios.put(`/api/admin/users/${userId}/status`, { status });
        return response.data;
    }
);

export const updateUserRole = createAsyncThunk(
    'users/updateRole',
    async ({ userId, role }) => {
        const response = await axios.put(`/api/admin/users/${userId}/role`, { role });
        return response.data;
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Users
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch users';
            })
            // Update User Status
            .addCase(updateUserStatus.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUserStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to update user status';
            })
            // Update User Role
            .addCase(updateUserRole.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserRole.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUserRole.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to update user role';
            });
    },
});

export default userSlice.reducer;
