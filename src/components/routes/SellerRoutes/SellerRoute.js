import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../../context/AuthContext/AuthProvider";
import useSeller from "../../hooks/useSeller";


const SellerRoute = ({ children }) => {
    const { loading, user } = useContext(authContext);
    const [isSeller, isSellerLoading] = useSeller(user?.email);
    const location = useLocation();
    if (loading || isSellerLoading) {
        return <progress className="progress w-56"></progress>
    }
    if (user && isSeller) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default SellerRoute;