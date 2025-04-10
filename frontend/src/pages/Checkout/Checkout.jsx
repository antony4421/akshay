import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    Container,
    Typography,
    Button,
    Box,
    Paper,
    Grid,
    CircularProgress,
    Alert,
} from '@mui/material';
import { createOrder, clearCart, fetchAddresses } from '../../store/slices';
import AddressForm from './AddressForm';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { items, isLoading: cartLoading } = useSelector((state) => state.cart);
    const { addresses, isLoading: profileLoading } = useSelector((state) => state.profile);

    useEffect(() => {
        if (items.length === 0) {
            navigate('/cart');
        }
    }, [items, navigate]);

    useEffect(() => {
        dispatch(fetchAddresses());
    }, [dispatch]);

    const total = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            setError('Please select a shipping address');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await dispatch(
                createOrder({
                    addressId: selectedAddress.id,
                    items: items.map((item) => ({
                        productId: item.product.id,
                        quantity: item.quantity,
                    })),
                })
            ).unwrap();

            await dispatch(clearCart()).unwrap();
            navigate('/orders');
        } catch (err) {
            setError(err.message || 'Failed to place order');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cartLoading || profileLoading) {
        return (
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Checkout
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 2, mb: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Shipping Address
                        </Typography>
                        <AddressForm
                            addresses={addresses}
                            selectedAddress={selectedAddress}
                            onAddressSelect={setSelectedAddress}
                        />
                    </Paper>

                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Order Summary
                        </Typography>
                        {items.map((item) => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    mb: 1,
                                }}
                            >
                                <Typography>
                                    {item.product.name} x {item.quantity}
                                </Typography>
                                <Typography>
                                    ${(item.product.price * item.quantity).toFixed(2)}
                                </Typography>
                            </Box>
                        ))}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mt: 2,
                                pt: 2,
                                borderTop: 1,
                                borderColor: 'divider',
                            }}
                        >
                            <Typography variant="h6">Total</Typography>
                            <Typography variant="h6">${total.toFixed(2)}</Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            onClick={handlePlaceOrder}
                            disabled={isSubmitting || !selectedAddress}
                        >
                            {isSubmitting ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Place Order'
                            )}
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Checkout;
