import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Container,
    Typography,
    Paper,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    CircularProgress,
    Alert,
} from '@mui/material';
import { fetchOrderById } from '../../store/slices/orderSlice';

const OrderDetails = () => {
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const { orders, isLoading, error } = useSelector((state) => state.orders);
    const order = orders.find((o) => o.id === orderId);

    useEffect(() => {
        if (!order) {
            dispatch(fetchOrderById(orderId));
        }
    }, [dispatch, order, orderId]);

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

    if (!order) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="info">Order not found</Alert>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Order Details
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Order Information
                        </Typography>
                        <Typography>
                            <strong>Order ID:</strong> {order.id}
                        </Typography>
                        <Typography>
                            <strong>Date:</strong>{' '}
                            {new Date(order.createdAt).toLocaleDateString()}
                        </Typography>
                        <Typography>
                            <strong>Status:</strong>{' '}
                            <Chip
                                label={order.status}
                                color={
                                    order.status === 'DELIVERED'
                                        ? 'success'
                                        : order.status === 'CANCELLED'
                                        ? 'error'
                                        : 'primary'
                                }
                                size="small"
                            />
                        </Typography>
                        <Typography>
                            <strong>Total:</strong> ${order.total.toFixed(2)}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Shipping Address
                        </Typography>
                        <Typography>{order.shippingAddress.street}</Typography>
                        <Typography>
                            {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                            {order.shippingAddress.zipCode}
                        </Typography>
                        <Typography>{order.shippingAddress.country}</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order.items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.product.name}</TableCell>
                                        <TableCell align="right">
                                            ${item.price.toFixed(2)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {item.quantity}
                                        </TableCell>
                                        <TableCell align="right">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={3} align="right">
                                        <strong>Total</strong>
                                    </TableCell>
                                    <TableCell align="right">
                                        <strong>${order.total.toFixed(2)}</strong>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    );
};

export default OrderDetails;
