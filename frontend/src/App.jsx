import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import AnalyticsView from "./pages/Analytics";
import Login from "./pages/Login";
import { useState } from "react";

function App() {
  const { isAuthenticated, logout } = useAuth();
  const [view, setView] = useState("dashboard");

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div>
      <div style={{ padding: "1rem" }}>
        <button onClick={() => setView("dashboard")}>
          Dashboard
        </button>

        <button onClick={() => setView("analytics")}>
          Analytics
        </button>

        <button onClick={logout}>
          Logout
        </button>
      </div>

      {view === "dashboard" && <Dashboard />}
      {view === "analytics" && <AnalyticsView />}
    </div>
  );
}

export default App;