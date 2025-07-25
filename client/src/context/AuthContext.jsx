import { createContext, useContext, useEffect, useState } from "react";
import API from "../api";
const AuthContext = createContext();

// custom hook to use context easily
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(token) {
            API.get('/users/me')
            .then((res) => setUser(res.data))
            .catch((err) => console.log("Auth error", err))
        }
        setLoading(false)
    }, [])


const login = (token) => {
    localStorage.setItem("token", token);
}

const logout = () => {
    localStorage.removeItem("token");
    setUser(null)
}

return (
    <AuthContext.Provider value={{user, setUser, login, logout, loading}}>
        {children}
    </AuthContext.Provider>
)
}