import React, {createContext, useState, useEffect} from 'react';
import {fetchUserData, loginUser, logoutUser} from '../services/user.service.tsx';
import {IUserData} from "../App.constants.tsx";

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
    const response = await loginUser({username, password});
    if (response.status === 200 && response.data.token) {
      const jwtToken = response.data.token;
      console.log(jwtToken);

      localStorage.setItem("token", jwtToken);
      await getUserInfo()

    } else {
      throw new Error('Unexpected response from server.');
    }
  };

  const getUserInfo = async () => {
    try {
      console.log("Getting user information");
      const response = await fetchUserData();
      if (response.status === 200) {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      } else {
        logout(); // If fetching fails, log out
      }
    } catch (err) {
      console.error("Failed to fetch user info:", err);
      logout();
    }
  };

  const logout = () => {
    console.log('Logout');
    logoutUser();
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{user, login, logout, isAuthenticated: !!user}}>
      {children}
    </AuthContext.Provider>
  );
};
