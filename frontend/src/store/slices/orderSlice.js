import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderApi } from '../../services/api';

const initialState = {
    orders: [],
    isLoading: false,
    error: null,
};

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async () => {
        const response = await orderApi.getAll();
        return response.data.data;
    }
);

export const fetchOrderById = createAsyncThunk(
    'orders/fetchOrderById',
    async (orderId) => {
        const response = await orderApi.getById(orderId);
        return response.data.data;
    }
);

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData) => {
        const response = await orderApi.create(orderData);
        return response.data.data;
    }
);

export const updateOrderStatus = createAsyncThunk(
    'orders/updateStatus',
    async ({ orderId, status }) => {
        const response = await orderApi.updateStatus(orderId, status);
        return response.data.data;
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Orders
            .addCase(fetchOrders.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload || [];
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch orders';
            })
            // Fetch Order by ID
            .addCase(fetchOrderById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload) {
                    const index = state.orders.findIndex(order => order.id === action.payload.id);
                    if (index !== -1) {
                        state.orders[index] = action.payload;
                    } else {
                        state.orders.push(action.payload);
                    }
                }
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch order';
            })
            // Create Order
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload) {
                    state.orders.push(action.payload);
                }
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to create order';
            })
            // Update Order Status
            .addCase(updateOrderStatus.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload) {
                    const index = state.orders.findIndex(order => order.id === action.payload.id);
                    if (index !== -1) {
                        state.orders[index] = action.payload;
                    }
                }
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to update order status';
            });
    }
});

export default orderSlice.reducer;
