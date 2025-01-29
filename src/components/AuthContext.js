import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isAuthorized, setIsAuthorized] = useState(() => {
        return localStorage.getItem('isAuthorized') === 'true'
    })

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthorized(localStorage.getItem('isAuthorized') === 'true');
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [])

    const login = () => {
        setIsAuthorized(true)
        localStorage.setItem('isAuthorized', 'true')
    }

    const logout = () => {
        setIsAuthorized(false)
        localStorage.setItem('isAuthorized', 'false')
    }

    return (
        <AuthContext.Provider value={{isAuthorized, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}