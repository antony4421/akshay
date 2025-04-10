import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { profileApi } from '../../services/api';

const initialState = {
    profile: null,
    addresses: [],
    isLoading: false,
    error: null,
};

export const fetchProfile = createAsyncThunk(
    'profile/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await profileApi.get();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
        }
    }
);

export const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            const response = await profileApi.update(profileData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
        }
    }
);

export const fetchAddresses = createAsyncThunk(
    'profile/fetchAddresses',
    async (_, { rejectWithValue }) => {
        try {
            const response = await profileApi.getAddresses();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch addresses');
        }
    }
);

export const addAddress = createAsyncThunk(
    'profile/addAddress',
    async (addressData, { rejectWithValue }) => {
        try {
            const response = await profileApi.addAddress(addressData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add address');
        }
    }
);

export const updateAddress = createAsyncThunk(
    'profile/updateAddress',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await profileApi.updateAddress(id, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update address');
        }
    }
);

export const deleteAddress = createAsyncThunk(
    'profile/deleteAddress',
    async (addressId, { rejectWithValue }) => {
        try {
            await profileApi.deleteAddress(addressId);
            return addressId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete address');
        }
    }
);

export const setDefaultAddress = createAsyncThunk(
    'profile/setDefaultAddress',
    async (addressId, { rejectWithValue }) => {
        try {
            const response = await profileApi.setDefaultAddress(addressId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to set default address');
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        resetProfile: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            // Fetch Profile
            .addCase(fetchProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch profile';
            })
            // Update Profile
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to update profile';
            })
            // Fetch Addresses
            .addCase(fetchAddresses.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAddresses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addresses = action.payload;
            })
            .addCase(fetchAddresses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch addresses';
            })
            // Add Address
            .addCase(addAddress.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addresses.push(action.payload);
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to add address';
            })
            // Update Address
            .addCase(updateAddress.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.addresses.findIndex(addr => addr.id === action.payload.id);
                if (index !== -1) {
                    state.addresses[index] = action.payload;
                }
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to update address';
            })
            // Delete Address
            .addCase(deleteAddress.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addresses = state.addresses.filter(addr => addr.id !== action.payload);
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to delete address';
            })
            // Set Default Address
            .addCase(setDefaultAddress.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(setDefaultAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addresses = state.addresses.map(addr => ({
                    ...addr,
                    isDefault: addr.id === action.payload.id
                }));
            })
            .addCase(setDefaultAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to set default address';
            });
    },
});

export const { clearError, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
