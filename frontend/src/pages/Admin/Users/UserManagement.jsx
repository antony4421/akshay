import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    CircularProgress,
    Alert,
    IconButton,
    Chip,
} from '@mui/material';
import { Block as BlockIcon, Check as UnblockIcon } from '@mui/icons-material';
import {
    fetchUsers,
    updateUserStatus,
    updateUserRole,
} from '../../../store/slices/userSlice';

const UserManagement = () => {
    const dispatch = useDispatch();
    const { users, isLoading, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleToggleStatus = (userId, currentStatus) => {
        dispatch(updateUserStatus({
            userId,
            status: currentStatus === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE'
        }));
    };

    const handleToggleRole = (userId, currentRole) => {
        dispatch(updateUserRole({
            userId,
            role: currentRole === 'USER' ? 'ADMIN' : 'USER'
        }));
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
            <Typography variant="h4" gutterBottom>
                User Management
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    {user.firstName} {user.lastName}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.role}
                                        color={user.role === 'ADMIN' ? 'primary' : 'default'}
                                        onClick={() => handleToggleRole(user.id, user.role)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.status}
                                        color={user.status === 'ACTIVE' ? 'success' : 'error'}
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        color={user.status === 'ACTIVE' ? 'error' : 'success'}
                                        onClick={() =>
                                            handleToggleStatus(user.id, user.status)
                                        }
                                    >
                                        {user.status === 'ACTIVE' ? (
                                            <BlockIcon />
                                        ) : (
                                            <UnblockIcon />
                                        )}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default UserManagement;
