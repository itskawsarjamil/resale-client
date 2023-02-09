import { useContext } from "react";
import { authContext } from "../../context/AuthContext/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoute = ({ children }) => {
    const { loading, user } = useContext(authContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const location = useLocation();
    if (loading || isAdminLoading) {
        return <progress className="progress w-56"></progress>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;