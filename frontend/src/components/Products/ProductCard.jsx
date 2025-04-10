import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    IconButton,
    Box,
    TextField,
    Snackbar,
    Alert,
    CardActions,
    Skeleton,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, ShoppingCart as CartIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleQuantityChange = (value) => {
        const newQuantity = Math.max(1, Math.min(value, product.stockQuantity));
        setQuantity(newQuantity);
    };

    const handleAddToCart = async () => {
        try {
            setIsLoading(true);
            setError(null);
            await dispatch(addToCart({ productId: product.id, quantity })).unwrap();
            setSuccess(true);
        } catch (err) {
            setError(err.message || 'Failed to add item to cart');
        } finally {
            setIsLoading(false);
        }
    };

    const handleProductClick = () => {
        navigate(`/products/${product.id}`);
    };

    return (
        <>
            <Card 
                sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4,
                        cursor: 'pointer'
                    }
                }}
            >
                <CardMedia
                    component="img"
                    height="200"
                    image={product.imageUrl || 'https://via.placeholder.com/200'}
                    alt={product.name}
                    sx={{ objectFit: 'cover' }}
                    onClick={handleProductClick}
                />
                <CardContent sx={{ flexGrow: 1 }} onClick={handleProductClick}>
                    <Typography gutterBottom variant="h6" component="div" noWrap>
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ 
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        minHeight: '40px'
                    }}>
                        {product.description}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                        ${product.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color={product.stockQuantity > 0 ? 'success.main' : 'error.main'}>
                        {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
                    </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1 }}>
                        <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(quantity - 1)}
                            disabled={quantity <= 1 || isLoading}
                        >
                            <RemoveIcon />
                        </IconButton>
                        <TextField
                            size="small"
                            type="number"
                            value={quantity}
                            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                            inputProps={{ min: 1, max: product.stockQuantity }}
                            sx={{ width: '70px' }}
                        />
                        <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(quantity + 1)}
                            disabled={quantity >= product.stockQuantity || isLoading}
                        >
                            <AddIcon />
                        </IconButton>
                        <Button
                            variant="contained"
                            startIcon={<CartIcon />}
                            onClick={handleAddToCart}
                            disabled={product.stockQuantity === 0 || isLoading}
                            sx={{ ml: 'auto', minWidth: '120px' }}
                        >
                            {isLoading ? 'Adding...' : 'Add to Cart'}
                        </Button>
                    </Box>
                </CardActions>
            </Card>
            <Snackbar 
                open={error !== null} 
                autoHideDuration={6000} 
                onClose={() => setError(null)}
            >
                <Alert severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
            <Snackbar 
                open={success} 
                autoHideDuration={3000} 
                onClose={() => setSuccess(false)}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Product added to cart successfully!
                </Alert>
            </Snackbar>
        </>
    );
};

export default ProductCard;
