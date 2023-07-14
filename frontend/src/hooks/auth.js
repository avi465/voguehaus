import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';

// Login hook
export const useLogin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const loginMutation = useMutation((data) => {
        const { credentials, role } = data;
        if (role === 'admin') {
            return apiClient.post('/api/admin/login', credentials);
        } else if (role === 'seller') {
            return apiClient.post('/api/seller/login', credentials);
        } else {
            return apiClient.post('/api/auth/login', credentials);
        }
    });

    const login = async (credentials, role) => {
        try {
            await loginMutation.mutateAsync({ credentials, role });
            // Login successful
            queryClient.invalidateQueries('user'); // Invalidate the user query to trigger a refetch
            if (role === 'admin') {
                navigate('/admin/dashboard');
            } else if (role === 'seller') {
                navigate('/seller/dashboard');
            } else {
                navigate('/');
            }
        } catch (error) {
            // Handle login error
            console.error('Login error', error);
            throw error;
        }
    };

    return { login, isLoading: loginMutation.isLoading, error: loginMutation.error };
};

// Register hook
export const useRegister = () => {
    const navigate = useNavigate();

    const registerMutation = useMutation((data) => {
        const { userData, role } = data;
        if (role === 'seller') {
            return apiClient.post('api/seller/register', userData);
        } else if (role === 'user') {
            return apiClient.post('api/auth/register', userData);
        }
    });

    const register = async (userData, role) => {
        try {
            await registerMutation.mutateAsync({ userData, role });
            // Registration successful
            if (role === 'seller') {
                navigate('/seller/login');
            } else if (role === 'user') {
                navigate('/auth/login');
            }
        } catch (error) {
            // Handle registration error
            console.error('Registration Error:', error);
            throw error;
        }
    };

    return { register, isLoading: registerMutation.isLoading, error: registerMutation.error };
};

// Logout hook
export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const logoutMutation = useMutation((role) => {
        if (role === 'admin') {
            return apiClient.post('/api/admin/logout');
        } else if (role === 'seller') {
            return apiClient.post('/api/seller/logout');
        } else {
            return apiClient.post('/api/auth/logout');
        }
    });

    const logout = async (role) => {
        try {
            await logoutMutation.mutateAsync(role);
            // Logout successful
            if (role === 'admin') {
                navigate('/admin');
            } else if (role === 'seller') {
                navigate('/seller');
            } else {
                navigate('/');
            }
            queryClient.clear(); // Clear the query cache
        } catch (error) {
            // Handle logout error
            console.error('Logout Error:', error);
            throw error;
        }
    };

    return { logout, isLoading: logoutMutation.isLoading };
};

// Reset password hook
export const useResetPassword = () => {
    const resetPasswordMutation = useMutation((data) => {
        const { email, role } = data;
        if (role === 'admin') {
            return apiClient.post('api/admin/reset-password', { email });
        } else if (role === 'seller') {
            return apiClient.post('api/seller/reset-password', { email });
        } else {
            return apiClient.post('api/auth/reset-password', { email });
        }
    });

    const resetPassword = async (email, role) => {
        try {
            await resetPasswordMutation.mutateAsync({ email, role });
            // Reset password request successful
            if (role === 'admin') {
                navigate('/admin/login');
            } else if (role === 'seller') {
                navigate('/seller/login');
            } else {
                navigate('/auth/login');
            }
        } catch (error) {
            // Handle reset password error
            console.error('Reset Password Error:', error);
            throw error;
        }
    };

    return { resetPassword, isLoading: resetPasswordMutation.isLoading };
};

export const useIsAuthenticated = () => {
    const isAuthenticatedQuery = useQuery(['isAuthenticated'], async () => {
        const response = await apiClient.get('/api/auth/check-session');
        return response.status === 200;
    });

    const { data: isAuthenticated, isLoading, isError } = isAuthenticatedQuery;

    return { isAuthenticated, isLoading, isError };
};