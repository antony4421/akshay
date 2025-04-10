import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Link,
    Alert,
    CircularProgress,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { register } from '../../store/slices/authSlice';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.auth);
    const [success, setSuccess] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [passwordError, setPasswordError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        if (e.target.name === 'confirmPassword' || e.target.name === 'password') {
            setPasswordError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            return;
        }

        const { confirmPassword, ...registerData } = formData;

        try {
            await dispatch(register(registerData)).unwrap();
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            // Error is handled by the auth slice
        }
    };

    const containerStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
        width: '100%',
        p: 2,
    };

    const paperStyles = {
        width: '100%',
        maxWidth: isMobile ? '100%' : '500px',
        p: isMobile ? 3 : 6,
        borderRadius: 2,
        boxShadow: theme.shadows[3],
    };

    const inputStyles = {
        '& .MuiInputBase-root': {
            fontSize: '1.1rem',
            borderRadius: 1.5,
        },
        '& .MuiInputLabel-root': {
            fontSize: '1.1rem',
        },
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
            },
        },
    };

    if (success) {
        return (
            <Box sx={containerStyles}>
                <Paper sx={paperStyles}>
                    <Alert 
                        severity="success" 
                        sx={{ 
                            mb: 2,
                            fontSize: '1.1rem',
                            '& .MuiAlert-message': {
                                padding: '10px 0',
                            }
                        }}
                    >
                        Registration successful! Redirecting to login...
                    </Alert>
                </Paper>
            </Box>
        );
    }

    return (
        <Box sx={containerStyles}>
            <Paper sx={paperStyles}>
                <Typography 
                    variant="h4" 
                    align="center" 
                    gutterBottom 
                    sx={{ 
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                        mb: 4,
                        fontSize: isMobile ? '1.8rem' : '2.2rem',
                    }}
                >
                    Create Account
                </Typography>

                {error && (
                    <Alert 
                        severity="error" 
                        sx={{ 
                            mb: 3,
                            fontSize: '1rem',
                            '& .MuiAlert-message': {
                                padding: '8px 0',
                            }
                        }}
                    >
                        {error}
                    </Alert>
                )}

                {passwordError && (
                    <Alert 
                        severity="error" 
                        sx={{ 
                            mb: 3,
                            fontSize: '1rem',
                            '& .MuiAlert-message': {
                                padding: '8px 0',
                            }
                        }}
                    >
                        {passwordError}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        margin="normal"
                        required
                        sx={{ ...inputStyles, mb: 2.5 }}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                        sx={{ ...inputStyles, mb: 2.5 }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        required
                        helperText="Password must be at least 6 characters long"
                        sx={{ ...inputStyles, mb: 2.5 }}
                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        margin="normal"
                        required
                        sx={{ ...inputStyles, mb: 3 }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        sx={{
                            mt: 2,
                            mb: 3,
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            borderRadius: 1.5,
                        }}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <CircularProgress size={28} color="inherit" />
                        ) : (
                            'Create Account'
                        )}
                    </Button>

                    <Box textAlign="center">
                        <Link 
                            component={RouterLink} 
                            to="/login" 
                            variant="body1"
                            sx={{
                                color: theme.palette.primary.main,
                                textDecoration: 'none',
                                fontWeight: 500,
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            Already have an account? Login
                        </Link>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default Register;
