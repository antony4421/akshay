import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Load token from localStorage on startup
const token = localStorage.getItem('token');
if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const setAuthToken = (token) => {
    if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', token);
    } else {
        delete instance.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
    }
};

// Add request interceptor
instance.interceptors.request.use(
    (config) => {
        // Get the latest token from localStorage
        const currentToken = localStorage.getItem('token');
        if (currentToken) {
            config.headers['Authorization'] = `Bearer ${currentToken}`;
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor
instance.interceptors.response.use(
    (response) => {
        // If response includes a new token, update it
        const newToken = response.headers['authorization'];
        if (newToken) {
            setAuthToken(newToken.replace('Bearer ', ''));
        }
        return response;
    },
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response error data:', error.response.data);
            console.error('Response error status:', error.response.status);
            
            // Handle authentication errors
            if (error.response.status === 401 || error.response.status === 403) {
                // Clear token and redirect to login only if not already on login page
                if (!window.location.pathname.includes('/login')) {
                    setAuthToken(null);
                    window.location.href = '/login';
                }
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up request:', error.message);
        }
        return Promise.reject(error);
    }
);

export default instance;
