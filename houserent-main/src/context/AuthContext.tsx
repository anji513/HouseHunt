import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

export type Role = 'user' | 'owner' | 'admin';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  avatar?: string;
  isApproved?: boolean;
}

interface AuthContextValue {
  user: User | null;
  token: string | null;
  setAuth: (data: { user: User; token: string }) => void;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (...roles: Role[]) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem('hh_token');
    const u = localStorage.getItem('hh_user');
    if (t) setToken(t);
    if (u) {
      try {
        setUser(JSON.parse(u));
      } catch {
        localStorage.removeItem('hh_user');
      }
    }
  }, []);

  const setAuth = ({ user, token }: { user: User; token: string }) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('hh_token', token);
    localStorage.setItem('hh_user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('hh_token');
    localStorage.removeItem('hh_user');
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      setAuth,
      logout,
      isAuthenticated: !!token && !!user,
      hasRole: (...roles: Role[]) => !!user && roles.includes(user.role === 'user' ? 'user' : user.role),
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
