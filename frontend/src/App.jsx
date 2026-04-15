import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import AnalyticsView from "./pages/Analytics";

function App() {
  const [view, setView] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/auth/me", {
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:3001/auth/logout", {
      method: "POST",
      credentials: "include"
    });

    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return <div>Laddar...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Du måste logga in</h2>

        <button onClick={() => {
          window.location.href = "http://localhost:3001/auth/github";
        }}>
          Login with GitHub
        </button>

        <br /><br />

        <button onClick={() => {
          window.location.href = "http://localhost:3001/auth/google";
        }}>
          Login with Google
        </button>
      </div>
    );
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

        <button onClick={handleLogout}>
          Logga ut
        </button>
      </div>

      {view === "dashboard" && <Dashboard />}
      {view === "analytics" && <AnalyticsView />}
    </div>
  );
}

export default App;