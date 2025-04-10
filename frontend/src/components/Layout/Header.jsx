import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Badge,
    Box,
} from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { logout } from '../../store/slices/authSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const cartItems = useSelector((state) => state.cart.items);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const isAdmin = user?.roles?.includes('ROLE_ADMIN');

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    component={RouterLink}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        textDecoration: 'none',
                        color: 'inherit',
                    }}
                >
                    E-Commerce
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    {isAuthenticated ? (
                        <>
                            <IconButton
                                color="inherit"
                                component={RouterLink}
                                to="/cart"
                            >
                                <Badge
                                    badgeContent={cartItems.length}
                                    color="secondary"
                                >
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>

                            <Button
                                color="inherit"
                                component={RouterLink}
                                to="/orders"
                            >
                                Orders
                            </Button>

                            <Button
                                color="inherit"
                                component={RouterLink}
                                to="/profile"
                            >
                                Profile
                            </Button>

                            {isAdmin && (
                                <Button
                                    color="inherit"
                                    component={RouterLink}
                                    to="/admin"
                                >
                                    Admin
                                </Button>
                            )}

                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                color="inherit"
                                component={RouterLink}
                                to="/login"
                            >
                                Login
                            </Button>
                            <Button
                                color="inherit"
                                component={RouterLink}
                                to="/register"
                            >
                                Register
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
