import { configureStore } from '@reduxjs/toolkit';
import {
    authReducer,
    productReducer,
    cartReducer,
    orderReducer,
    profileReducer,
} from './slices';

// Custom middleware to handle API errors
const errorMiddleware = () => (next) => (action) => {
    // Check if the action is a rejected action from an async thunk
    if (action.type.endsWith('/rejected')) {
        console.error('API Error:', action.error);
        // You could dispatch additional actions here if needed
    }
    return next(action);
};

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        cart: cartReducer,
        orders: orderReducer,
        profile: profileReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['auth/login/rejected', 'auth/register/rejected'],
            },
        }).concat(errorMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
