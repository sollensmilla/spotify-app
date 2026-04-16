import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

    const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:3001/auth/me", {
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const loginWithGithub = () => {
    window.location.href = "http://localhost:3001/auth/github";
  };

  const loginWithGoogle = () => {
    window.location.href = "http://localhost:3001/auth/google";
  };

  const logout = async () => {
    await fetch("http://localhost:3001/auth/logout", {
      method: "POST",
      credentials: "include"
    });
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      authLoading,
      loginWithGithub,
      loginWithGoogle,
      logout,
      checkAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);