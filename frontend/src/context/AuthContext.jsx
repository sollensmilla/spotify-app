/**
 * AuthContext: A React context that provides authentication state and functions for managing user authentication in the application. It includes functions for logging in with GitHub or Google, logging out, and checking the current authentication status. 
 * 
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

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
    try {
    await fetch("http://localhost:3001/auth/logout", {
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