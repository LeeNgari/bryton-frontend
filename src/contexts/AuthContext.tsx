import React, { createContext, useState, useEffect } from 'react';
import { User } from '../types';
import api from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users/me')
      .then(response => {
        setUser(response.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (identifier: string, password: string) => {
    await api.post('/auth/local', {
      identifier,
      password,
    });
    const { data: user } = await api.get('/users/me');
    setUser(user);
  };

  const logout = async () => {
    await api.delete('/auth/local');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext };