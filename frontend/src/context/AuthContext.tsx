import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getMe, logoutUser } from '../api/client';
import type { User } from '../api/client';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: () => void;
    logout: () => void;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async () => {
        try {
            // Try to fetch user. If cookie exists and is valid, this succeeds.
            const userData = await getMe();
            setUser(userData);
            setIsAuthenticated(true);
        } catch (error) {
            // Not authenticated or session expired
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = () => {
        setIsAuthenticated(true); // Optimistic update or wait for checkAuth?
        // Ideally verify with specific call or just re-fetch me
        checkAuth();
    };

    const logout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error("Logout failed", error);
        }
        localStorage.removeItem('currentPage'); // Clear page persistence
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
