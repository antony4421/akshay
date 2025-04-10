import React from 'react';
import {
    Box,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';

interface AddressFormProps {
    formData: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectChange: (e: SelectChangeEvent) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ formData, handleChange, handleSelectChange }) => {
    return (
        <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="street"
                        name="street"
                        label="Street Address"
                        fullWidth
                        value={formData.street}
                        onChange={handleChange}
                        autoComplete="shipping address-line1"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        value={formData.city}
                        onChange={handleChange}
                        autoComplete="shipping address-level2"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        value={formData.state}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zipCode"
                        name="zipCode"
                        label="Zip / Postal code"
                        fullWidth
                        value={formData.zipCode}
                        onChange={handleChange}
                        autoComplete="shipping postal-code"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel id="country-label">Country</InputLabel>
                        <Select
                            labelId="country-label"
                            id="country"
                            name="country"
                            value={formData.country}
                            label="Country"
                            onChange={handleSelectChange}
                            autoComplete="shipping country"
                        >
                            <MenuItem value="US">United States</MenuItem>
                            <MenuItem value="CA">Canada</MenuItem>
                            <MenuItem value="GB">United Kingdom</MenuItem>
                            <MenuItem value="FR">France</MenuItem>
                            <MenuItem value="DE">Germany</MenuItem>
                            <MenuItem value="IN">India</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddressForm;
