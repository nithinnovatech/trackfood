import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = 'fow_users';
const CURRENT_USER_KEY = 'fow_current_user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem(CURRENT_USER_KEY);
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                localStorage.removeItem(CURRENT_USER_KEY);
            }
        }
        setIsLoading(false);
    }, []);

    // Get all registered users
    const getUsers = (): Record<string, { user: User; password: string }> => {
        const users = localStorage.getItem(USERS_KEY);
        return users ? JSON.parse(users) : {};
    };

    // Save users to localStorage
    const saveUsers = (users: Record<string, { user: User; password: string }>) => {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    };

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const users = getUsers();
        const userRecord = users[email.toLowerCase()];

        if (!userRecord) {
            return { success: false, error: 'No account found with this email' };
        }

        if (userRecord.password !== password) {
            return { success: false, error: 'Incorrect password' };
        }

        setUser(userRecord.user);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userRecord.user));
        return { success: true };
    };

    const register = async (
        name: string,
        email: string,
        phone: string,
        password: string
    ): Promise<{ success: boolean; error?: string }> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const users = getUsers();
        const emailLower = email.toLowerCase();

        if (users[emailLower]) {
            return { success: false, error: 'An account with this email already exists' };
        }

        const newUser: User = {
            id: `user_${Date.now()}`,
            email: emailLower,
            name,
            phone,
            createdAt: new Date().toISOString(),
        };

        users[emailLower] = { user: newUser, password };
        saveUsers(users);

        setUser(newUser);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(CURRENT_USER_KEY);
    };

    const updateUser = (updates: Partial<User>) => {
        if (!user) return;

        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

        // Update in users database too
        const users = getUsers();
        if (users[user.email]) {
            users[user.email].user = updatedUser;
            saveUsers(users);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                login,
                register,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
