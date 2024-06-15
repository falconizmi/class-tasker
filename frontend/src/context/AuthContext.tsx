import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { checkUserSession, loginUser, logoutUser, registerUser } from '../api/authApi';
import { Login, Register } from '../models/auth';
import { Result } from '@badrap/result';

interface AuthContextProps {
  isAuthenticated: boolean;
  register: (data: Register) => Promise<Result<void, Error>>;
  login: (data: Login) => Promise<Result<void, Error>>;
  logout: () => Promise<Result<void, Error>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionResult = await checkUserSession();
      if (sessionResult.isOk) {
        setIsAuthenticated(sessionResult.value);
      }
    };

    fetchSession();
  }, []);

  const register = async (data: Register) => {
    const result = await registerUser(data);
    if (result.isOk) {
      setIsAuthenticated(true);
    }
    return result;
  };

  const login = async (data: Login) => {
    const result = await loginUser(data);
    if (result.isOk) {
      setIsAuthenticated(true);
    }
    return result;
  };

  const logout = async () => {
    const result = await logoutUser();
    if (result.isOk) {
      setIsAuthenticated(false);
    }
    return result;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};