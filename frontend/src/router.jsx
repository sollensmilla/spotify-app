import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import AnalyticsView from "./pages/Analytics";
import Login from "./pages/Login";
import ProtectedRoute from "./components/routing/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
        index: true, 
        element: <Navigate to="/dashboard" />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "analytics",
            element: <AnalyticsView />
          }
        ]
      }
    ]
  }
]);