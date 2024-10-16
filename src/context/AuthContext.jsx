import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // Admin
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    // Role
    const [role, setRole] = useState(null)
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Save the data into local storage
    const fetchToken = useCallback(async () => {
        const storedUser = localStorage.getItem("userId")
        setUserId(storedUser);
        const storedName = localStorage.getItem("name")
        setUserName(storedName);
        const storedEmail = localStorage.getItem("email")
        setUserEmail(storedEmail);
        const storedRole = localStorage.getItem("role")
        setRole(storedRole);
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        setLoading(false); 
    },[])

    useEffect(() => {
        fetchToken()
    },[fetchToken])

    const context = {
        token,
        setToken,
        loading,
        setLoading,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        userId,
        setUserId,
        role,
        setRole
    }

    return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export default AuthProvider