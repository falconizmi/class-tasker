import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { checkUserSession, loginUser, logoutUser, registerUser } from '../api/authApi';
import { Login } from '../models/auth';
import { Email, UserWithoutId } from '../models/user';
import { Result } from '@badrap/result';
import { z } from "zod";

interface AuthContextProps {
  isAuthenticated: boolean;
  userEmail: Email | undefined;
  register: (data: UserWithoutId) => Promise<Result<void, Error>>;
  login: (data: Login) => Promise<Result<void, Error>>;
  logout: () => Promise<Result<void, Error>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<Email | undefined>(undefined);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionResult = await checkUserSession();
      if (sessionResult.isOk) {
        setIsAuthenticated(sessionResult.value);
      }
    };

    fetchSession();
  }, []);

  const register = async (data: UserWithoutId) => {
    const result = await registerUser(data);
    if (result.isOk) {
      setIsAuthenticated(true);
      setUserEmail(undefined);
    }
    return result;
  };

  const login = async (data: Login) => {
    const result = await loginUser(data);
    if (result.isOk) {
      setIsAuthenticated(true);
      setUserEmail({ email: data.email });
    }
    return result;
  };

  const logout = async () => {
    const result = await logoutUser();
    if (result.isOk) {
      setIsAuthenticated(false);
      setUserEmail(undefined);
    }
    return result;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, register, login, logout }}>
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