import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {
    ShoppingCart as OrdersIcon,
    Inventory as ProductsIcon,
    People as UsersIcon,
} from '@mui/icons-material';

const DashboardCard = ({ title, icon: Icon, to }) => (
    <Grid item xs={12} sm={6} md={4}>
        <Paper
            component={Link}
            to={to}
            sx={{
                p: 3,
                textAlign: 'center',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.05)',
                },
            }}
        >
            <Icon sx={{ fontSize: 48 }} />
            <Typography variant="h6">{title}</Typography>
        </Paper>
    </Grid>
);

const Dashboard = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Admin Dashboard
            </Typography>
            <Grid container spacing={4}>
                <DashboardCard
                    title="Manage Orders"
                    icon={OrdersIcon}
                    to="/admin/orders"
                />
                <DashboardCard
                    title="Manage Products"
                    icon={ProductsIcon}
                    to="/admin/products"
                />
                <DashboardCard
                    title="Manage Users"
                    icon={UsersIcon}
                    to="/admin/users"
                />
            </Grid>
        </Container>
    );
};

export default Dashboard;
