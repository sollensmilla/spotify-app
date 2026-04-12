import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import AnalyticsView from "./pages/Analytics";

function App() {
 const [view, setView] = useState("dashboard");

  return (
    <div>
      <div style={{ padding: "1rem" }}>
        <button onClick={() => setView("dashboard")}>
          Dashboard
        </button>

        <button onClick={() => {
  window.location.href = "http://localhost:3001/auth/github"
}}>
  Login with GitHub
</button>

        <button onClick={() => setView("analytics")}>
          Analytics
        </button>
      </div>

      {view === "dashboard" && <Dashboard />}
      {view === "analytics" && <AnalyticsView />}
    </div>
  );
}

export default App;