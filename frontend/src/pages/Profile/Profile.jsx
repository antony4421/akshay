import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Container,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    Alert,
    Box,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
    fetchProfile,
    updateProfile,
    fetchAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
} from '../../store/slices/profileSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const { profile, addresses, isLoading, error } = useSelector((state) => state.profile);
    const [editMode, setEditMode] = useState(false);
    const [addressDialog, setAddressDialog] = useState({
        open: false,
        mode: 'add',
        data: null,
    });
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [addressForm, setAddressForm] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    });

    useEffect(() => {
        dispatch(fetchProfile());
        dispatch(fetchAddresses());
    }, [dispatch]);

    useEffect(() => {
        if (profile) {
            setFormData({
                firstName: profile.firstName || '',
                lastName: profile.lastName || '',
                email: profile.email || '',
            });
        }
    }, [profile]);

    const handleProfileChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddressChange = (e) => {
        setAddressForm({
            ...addressForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveProfile = async () => {
        try {
            await dispatch(updateProfile(formData)).unwrap();
            setEditMode(false);
        } catch (err) {
            // Error is handled by the profile slice
        }
    };

    const handleOpenAddressDialog = (mode = 'add', address = null) => {
        setAddressDialog({
            open: true,
            mode,
            data: address,
        });
        if (address) {
            setAddressForm(address);
        } else {
            setAddressForm({
                street: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
            });
        }
    };

    const handleCloseAddressDialog = () => {
        setAddressDialog({ open: false, mode: 'add', data: null });
    };

    const handleSaveAddress = async () => {
        try {
            if (addressDialog.mode === 'add') {
                await dispatch(addAddress(addressForm)).unwrap();
            } else {
                await dispatch(
                    updateAddress({
                        id: addressDialog.data.id,
                        data: addressForm,
                    })
                ).unwrap();
            }
            handleCloseAddressDialog();
        } catch (err) {
            // Error is handled by the profile slice
        }
    };

    const handleDeleteAddress = async (addressId) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            try {
                await dispatch(deleteAddress(addressId)).unwrap();
            } catch (err) {
                // Error is handled by the profile slice
            }
        }
    };

    const handleSetDefaultAddress = async (addressId) => {
        try {
            await dispatch(setDefaultAddress(addressId)).unwrap();
        } catch (err) {
            // Error is handled by the profile slice
        }
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

    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h5">Profile Information</Typography>
                            <Button
                                variant={editMode ? "contained" : "outlined"}
                                color={editMode ? "primary" : "secondary"}
                                onClick={() => editMode ? handleSaveProfile() : setEditMode(true)}
                            >
                                {editMode ? "Save" : "Edit"}
                            </Button>
                        </Box>
                        <form>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleProfileChange}
                                margin="normal"
                                disabled={!editMode}
                            />
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleProfileChange}
                                margin="normal"
                                disabled={!editMode}
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleProfileChange}
                                margin="normal"
                                disabled={!editMode}
                                type="email"
                            />
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h5">Addresses</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleOpenAddressDialog()}
                            >
                                Add Address
                            </Button>
                        </Box>
                        <List>
                            {addresses?.map((address) => (
                                <ListItem
                                    key={address.id}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 1,
                                        mb: 1,
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Box display="flex" alignItems="center">
                                                <Typography variant="subtitle1">
                                                    {address.street}
                                                </Typography>
                                                {address.isDefault && (
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            ml: 1,
                                                            px: 1,
                                                            py: 0.5,
                                                            bgcolor: 'primary.main',
                                                            color: 'white',
                                                            borderRadius: 1,
                                                            fontSize: '0.75rem',
                                                        }}
                                                    >
                                                        Default
                                                    </Box>
                                                )}
                                            </Box>
                                        }
                                        secondary={
                                            <>
                                                {address.city}, {address.state} {address.zipCode}
                                                <br />
                                                {address.country}
                                            </>
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            onClick={() => handleOpenAddressDialog('edit', address)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            onClick={() => handleDeleteAddress(address.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        {!address.isDefault && (
                                            <Button
                                                size="small"
                                                onClick={() => handleSetDefaultAddress(address.id)}
                                                sx={{ ml: 1 }}
                                            >
                                                Set Default
                                            </Button>
                                        )}
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>

            <Dialog open={addressDialog.open} onClose={handleCloseAddressDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {addressDialog.mode === 'add' ? 'Add New Address' : 'Edit Address'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Street"
                        name="street"
                        value={addressForm.street}
                        onChange={handleAddressChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="City"
                        name="city"
                        value={addressForm.city}
                        onChange={handleAddressChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="State"
                        name="state"
                        value={addressForm.state}
                        onChange={handleAddressChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="ZIP Code"
                        name="zipCode"
                        value={addressForm.zipCode}
                        onChange={handleAddressChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Country"
                        name="country"
                        value={addressForm.country}
                        onChange={handleAddressChange}
                        margin="normal"
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddressDialog}>Cancel</Button>
                    <Button onClick={handleSaveAddress} variant="contained" color="primary">
                        {addressDialog.mode === 'add' ? 'Add' : 'Update'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Profile;
