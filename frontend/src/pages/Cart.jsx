import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
    Box,
    CircularProgress,
    Alert,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
    fetchCart,
    updateCartItem,
    removeFromCart,
    clearCart,
} from '../store/slices/cartSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, isLoading, error } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const handleQuantityChange = (itemId, currentQuantity, change) => {
        const newQuantity = currentQuantity + change;
        if (newQuantity > 0) {
            dispatch(updateCartItem({ cartItemId: itemId, quantity: newQuantity }));
        } else {
            dispatch(removeFromCart(itemId));
        }
    };

    const handleRemoveItem = (itemId) => {
        dispatch(removeFromCart(itemId));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const calculateTotal = () => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    if (isLoading) {
        return (
            <Container sx={{ mt: 4, textAlign: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (items.length === 0) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography variant="h5" align="center">
                    Your cart is empty
                </Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Shopping Cart
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        size="small"
                                        onClick={() =>
                                            handleQuantityChange(item.id, item.quantity, -1)
                                        }
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography
                                        component="span"
                                        sx={{ mx: 2 }}
                                    >
                                        {item.quantity}
                                    </Typography>
                                    <IconButton
                                        size="small"
                                        onClick={() =>
                                            handleQuantityChange(item.id, item.quantity, 1)
                                        }
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="error"
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box
                sx={{
                    mt: 4,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClearCart}
                >
                    Clear Cart
                </Button>
                <Box>
                    <Typography variant="h6" component="span" sx={{ mr: 4 }}>
                        Total: ${calculateTotal().toFixed(2)}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCheckout}
                    >
                        Proceed to Checkout
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Cart;
