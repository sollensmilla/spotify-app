/**
 * ProtectedRoute: A React component that serves as a wrapper for routes that require authentication. It checks if the user is authenticated and either renders the child components (using <Outlet />) or redirects the user to the login page if they are not authenticated. The component also handles a loading state while checking authentication status.
 * 
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";

/**
 * Renders a protected route that requires authentication.
 * @returns {JSX.Element} - The rendered ProtectedRoute component.
 */
export default function ProtectedRoute() {
  const { isAuthenticated, authLoading } = useAuth();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}