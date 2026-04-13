import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import AnalyticsView from "./pages/Analytics";

function App() {
 const [view, setView] = useState("dashboard");
  const [token, setToken] = useState(null);

    useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("jwt", tokenFromUrl);
      window.location.href = "/";
    } else {
      const storedToken = localStorage.getItem("jwt");
      setToken(storedToken);
    }
  }, []);

    const handleLogout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    window.location.href = "/";
  };

    if (!token) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Du måste logga in</h2>

        <button
          onClick={() => {
            window.location.href = "http://localhost:3001/auth/github";
          }}
        >
          Login with GitHub
        </button>

        <br /><br />

        <button
          onClick={() => {
            window.location.href = "http://localhost:3001/auth/google";
          }}
        >
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