import axios from '../utils/axios';

const BASE_URL = '/api';

export const authApi = {
    login: (credentials) => axios.post(`${BASE_URL}/auth/login`, credentials),
    register: (userData) => axios.post(`${BASE_URL}/auth/register`, userData),
};

export const productApi = {
    getAll: (page = 0, size = 12, category, search) => {
        const params = new URLSearchParams({
            page: page.toString(),
            size: size.toString(),
        });
        if (category) params.append('category', category);
        if (search) params.append('search', search);
        return axios.get(`${BASE_URL}/products?${params.toString()}`);
    },
    getById: (id) => axios.get(`${BASE_URL}/products/${id}`),
    create: (product) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(`${BASE_URL}/products`, product, config);
    },
    update: (id, product) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.put(`${BASE_URL}/products/${id}`, product, config);
    },
    delete: (id) => axios.delete(`${BASE_URL}/products/${id}`),
};

export const cartApi = {
    get: () => axios.get(`${BASE_URL}/cart`),
    addItem: (item) => axios.post(`${BASE_URL}/cart/items`, item),
    updateItem: (cartItemId, quantity) => axios.put(`${BASE_URL}/cart/items/${cartItemId}`, { quantity }),
    removeItem: (itemId) => axios.delete(`${BASE_URL}/cart/items/${itemId}`),
    clear: () => axios.delete(`${BASE_URL}/cart`),
};

export const orderApi = {
    getAll: () => axios.get(`${BASE_URL}/orders`),
    getAllUser: () => axios.get(`${BASE_URL}/orders/user`),
    getById: (id) => axios.get(`${BASE_URL}/orders/${id}`),
    create: (order) => axios.post(`${BASE_URL}/orders`, order),
    updateStatus: (id, status) => axios.put(`${BASE_URL}/orders/${id}/status`, { status }),
};

export const profileApi = {
    get: () => axios.get(`${BASE_URL}/users/profile`),
    update: (data) => axios.put(`${BASE_URL}/users/profile`, data),
    getAddresses: () => axios.get(`${BASE_URL}/users/addresses`),
    addAddress: (address) => axios.post(`${BASE_URL}/users/addresses`, address),
    updateAddress: (id, address) => axios.put(`${BASE_URL}/users/addresses/${id}`, address),
    deleteAddress: (id) => axios.delete(`${BASE_URL}/users/addresses/${id}`),
    setDefaultAddress: (id) => axios.put(`${BASE_URL}/users/addresses/${id}/default`),
};

export const adminApi = {
    getUsers: () => axios.get(`${BASE_URL}/admin/users`),
    updateUser: (id, data) => axios.put(`${BASE_URL}/admin/users/${id}`, data),
    deleteUser: (id) => axios.delete(`${BASE_URL}/admin/users/${id}`),
    getDashboardStats: () => axios.get(`${BASE_URL}/admin/dashboard/stats`),
};
