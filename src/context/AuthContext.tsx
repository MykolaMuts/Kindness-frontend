import React, { createContext, useState, ReactNode } from 'react';

type Role = 'USER' | 'ADMIN';

interface AuthContextType {
  isAuthenticated: boolean;
  userRoles: Role[];
  login: (roles: Role[]) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRoles, setUserRoles] = useState<Role[]>([]);

  const login = (roles: Role[]) => {
    setIsAuthenticated(true);
    setUserRoles(roles);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRoles([]);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRoles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
