import React, {createContext, useState} from 'react';
import {IUserData, loginUser} from '../services/user/user.service.tsx';

interface AuthContextType {
  user: IUserData | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {

  console.log('AuthProvider initialized');

  const [user, setUser] = useState<IUserData | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (username: string, password: string) => {
    try {
      const response = await loginUser({username, password});
      if (response.status === 200) {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        throw new Error('Unexpected response from server.');
      }
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{user, login, logout, isAuthenticated: !!user}}>
      {children}
    </AuthContext.Provider>
  );
};