/**
 * AuthContext: A React context that provides authentication state and functions for managing user authentication in the application. It includes functions for logging in with GitHub or Google, logging out, and checking the current authentication status. 
 * 
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const API_URL = "https://dazzling-learning-production-9c39.up.railway.app";

/**
 * AuthProvider: A React component that provides authentication state and functions to its child components.
 * 
 * @param {*} param0 
 * @returns {JSX.Element} - The rendered AuthProvider component.
 */
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

    const checkAuth = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
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
    window.location.href = `${API_URL}/auth/github`;
  };

  const loginWithGoogle = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const logout = async () => {
    try {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include"
    });

    setIsAuthenticated(false);
     } catch (err) {
        console.error("Logout failed", err);
     }
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