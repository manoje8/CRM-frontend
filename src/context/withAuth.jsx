import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

// Restricted access ensures only authorized users
const withAuth = (WrapperComponent) => (props) => {
    const {token, loading, role} = useContext(AuthContext)

    if(loading)
    {
        return null;
    }

    if (!token) 
    {
        return <Navigate to="/user/login" replace />; 
    }

    if (role === 'new') 
    {
        return <Navigate to="/" replace />; 
    }

    return <WrapperComponent {...props}/>
}

export default withAuth