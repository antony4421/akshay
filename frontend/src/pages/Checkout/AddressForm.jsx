import React from 'react';
import {
    Box,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material';

const AddressForm = ({
    addresses,
    selectedAddress,
    onAddressSelect,
}) => {
    if (addresses.length === 0) {
        return (
            <Typography color="error">
                Please add a shipping address in your profile before proceeding.
            </Typography>
        );
    }

    return (
        <Box>
            <FormControl component="fieldset">
                <RadioGroup
                    value={selectedAddress?.id || ''}
                    onChange={(e) => {
                        const address = addresses.find(
                            (addr) => addr.id === parseInt(e.target.value)
                        );
                        if (address) {
                            onAddressSelect(address);
                        }
                    }}
                >
                    {addresses.map((address) => (
                        <FormControlLabel
                            key={address.id}
                            value={address.id}
                            control={<Radio />}
                            label={
                                <Box>
                                    <Typography>
                                        {address.street}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {`${address.city}, ${address.state} ${address.zipCode}`}
                                        <br />
                                        {address.country}
                                        {address.isDefault && ' (Default)'}
                                    </Typography>
                                </Box>
                            }
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export default AddressForm;
