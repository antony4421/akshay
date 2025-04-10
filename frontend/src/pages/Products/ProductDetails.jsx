import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Container,
    Grid,
    Typography,
    Button,
    Paper,
    Box,
    TextField,
    CircularProgress,
    Alert,
    Snackbar,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { fetchProductById } from '../../store/slices/productSlice';
import { addToCart } from '../../store/slices/cartSlice';

const ProductDetails = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const { items: products, isLoading, error } = useSelector((state) => state.products);
    const product = products.find((p) => p.id === productId);
    const [quantity, setQuantity] = useState(1);
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    useEffect(() => {
        if (!product) {
            dispatch(fetchProductById(productId));
        }
    }, [dispatch, product, productId]);

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = async () => {
        try {
            await dispatch(
                addToCart({ productId: product.id, quantity })
            ).unwrap();
            setSnackbar({
                open: true,
                message: 'Product added to cart successfully',
            });
        } catch (err) {
            setSnackbar({
                open: true,
                message: 'Failed to add product to cart',
            });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
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

    if (!product) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="info">Product not found</Alert>
            </Container>
        );
    }

    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper
                        sx={{
                            p: 2,
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '400px',
                                objectFit: 'contain',
                            }}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography
                        variant="h5"
                        color="primary"
                        gutterBottom
                    >
                        ${product.price.toFixed(2)}
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        paragraph
                    >
                        {product.description}
                    </Typography>

                    <Box sx={{ mt: 4 }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Quantity:
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                mb: 3,
                            }}
                        >
                            <Button
                                variant="outlined"
                                onClick={() => handleQuantityChange(-1)}
                                disabled={quantity <= 1}
                            >
                                <RemoveIcon />
                            </Button>
                            <TextField
                                value={quantity}
                                size="small"
                                inputProps={{
                                    readOnly: true,
                                    style: { textAlign: 'center' },
                                }}
                                sx={{ width: 60 }}
                            />
                            <Button
                                variant="outlined"
                                onClick={() => handleQuantityChange(1)}
                                disabled={quantity >= product.stock}
                            >
                                <AddIcon />
                            </Button>
                        </Box>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                        >
                            {product.stock} items in stock
                        </Typography>

                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                        >
                            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={snackbar.message}
            />
        </Container>
    );
};

export default ProductDetails;
