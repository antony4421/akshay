import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Grid, 
    Container, 
    Typography, 
    CircularProgress, 
    Alert, 
    Box,
    Pagination,
    TextField,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import ProductCard from '../components/Products/ProductCard';
import { fetchProducts } from '../store/slices/productSlice';

const Home = () => {
    const dispatch = useDispatch();
    const { items: products, isLoading, error, pagination } = useSelector((state) => state.products);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                await dispatch(fetchProducts({ page, search })).unwrap();
            } catch (err) {
                console.error('Failed to fetch products:', err);
            }
        };
        loadProducts();
    }, [dispatch, page, search]);

    const handlePageChange = (event, value) => {
        setPage(value - 1); // Convert to 0-based index
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(searchInput);
        setPage(0); // Reset to first page when searching
    };

    const handleClearSearch = () => {
        setSearchInput('');
        setSearch('');
        setPage(0);
    };

    if (isLoading && !products.length) {
        return (
            <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="body1">
                        Please try refreshing the page or check your connection.
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    Our Products
                </Typography>
                <form onSubmit={handleSearch}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search products..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                            endAdornment: searchInput && (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClearSearch} edge="end">
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 3 }}
                    />
                </form>
            </Box>

            {products.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Typography variant="h6" color="text.secondary">
                        No products available at the moment.
                    </Typography>
                </Box>
            ) : (
                <>
                    <Grid container spacing={4}>
                        {products.map((product) => (
                            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>

                    {pagination.totalPages > 1 && (
                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                            <Pagination
                                count={pagination.totalPages}
                                page={pagination.currentPage + 1}
                                onChange={handlePageChange}
                                color="primary"
                                size="large"
                            />
                        </Box>
                    )}
                </>
            )}
        </Container>
    );
};

export default Home;
