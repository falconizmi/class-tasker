import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { checkUserSession, loginUser, logoutUser, registerUser } from '../api/authApi';
import { Login } from '../models/auth';
import { Email, UserWithoutId } from '../models/user';
import { Result } from '@badrap/result';

interface AuthContextProps {
  isAuthenticated: boolean;
  userEmail: Email | undefined;
  register: (data: UserWithoutId) => Promise<Result<void, Error>>;
  login: (data: Login) => Promise<Result<void, Error>>;
  logout: () => Promise<Result<void, Error>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<Email | undefined>(() => {
    const storedEmail = localStorage.getItem('userEmail');
    return storedEmail ? { email: storedEmail } : undefined;
  });

  useEffect(() => {
    const fetchSession = async () => {
      const sessionResult = await checkUserSession();
      if (sessionResult.isOk) {
        setIsAuthenticated(sessionResult.value);
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
          setUserEmail({ email: storedEmail });
        }
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
      localStorage.setItem('userEmail', data.email);
    }
    return result;
  };

  const logout = async () => {
    const result = await logoutUser();
    if (result.isOk) {
      setIsAuthenticated(false);
      setUserEmail(undefined);
      localStorage.removeItem('userEmail');
    }
    return result;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};