import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import Header from './Header';
import ErrorBoundary from '../ErrorBoundary';

const Layout = () => {
    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',
            width: '100vw',
            margin: 0,
            padding: 0,
            overflow: 'hidden'
        }}>
            <Header />
            <Box 
                component="main" 
                sx={{ 
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                    bgcolor: 'background.default'
                }}
            >
                <ErrorBoundary>
                    <Suspense fallback={
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            minHeight: '100%',
                            width: '100%'
                        }}>
                            <CircularProgress />
                        </Box>
                    }>
                        <Outlet />
                    </Suspense>
                </ErrorBoundary>
            </Box>
        </Box>
    );
};

export default Layout;
