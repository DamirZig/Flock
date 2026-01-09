import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
    const queryClient = useQueryClient();

    const { data: user, isLoading, refetch } = useQuery({
        queryKey: ['me'],
        queryFn: getMe,
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const isAuthenticated = !!user;

    const login = () => {
        refetch();
    };

    const logout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error("Logout failed", error);
        }
        localStorage.removeItem('currentPage');
        queryClient.setQueryData(['me'], null);
    };

    const setUser = (userData: User | null) => {
        queryClient.setQueryData(['me'], userData);
    };

    return (
        <AuthContext.Provider value={{ user: user ?? null, isAuthenticated, isLoading, login, logout, setUser }}>
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
