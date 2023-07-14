import { Navigate, Outlet } from 'react-router-dom';
import { useIsAuthenticated } from '../hooks/auth';

const ProtectedRoutes = () => {
    const { isAuthenticated, isLoading, isError } = useIsAuthenticated();
    console.log("authenticated?", isAuthenticated);
    console.log("isLoading?", isLoading);
    console.log("isError?", isError);
    return (
        isLoading ? <div>Loading...</div> :
            isAuthenticated ? <Outlet /> :
                <Navigate to="/auth/login" />
    )
};

export default ProtectedRoutes;
