import React, {createContext, useState, useEffect} from 'react';
import {IUserData, loginUser, logoutUser} from '../services/user/user.service.tsx';

interface AuthContextType {
  user: IUserData | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  console.log('AuthProvider initialized');

  const [user, setUser] = useState<IUserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await loginUser({username, password});
      if (response.status === 200) {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data)); // ✅ Store correct user data
      } else {
        throw new Error('Unexpected response from server.');
      }
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    console.log('Logout');
    logoutUser();
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{user, login, logout, isAuthenticated: !!user}}>
      {children}
    </AuthContext.Provider>
  );
};
