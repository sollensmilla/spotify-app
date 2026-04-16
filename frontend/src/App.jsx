import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";

  return (
    <div>
      {isAuthenticated && (
        <div
          style={{
            position: "relative",
            padding: "1.5rem 2rem",
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link to="/dashboard">
              <button
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "999px",
                  border: "none",
                  background: isDashboard ? "#000" : "#eee",
                  color: isDashboard ? "#fff" : "#000",
                  cursor: "pointer"
                }}
              >
                Dashboard
              </button>
            </Link>

            <Link to="/analytics">
              <button
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "999px",
                  border: "none",
                  background: !isDashboard ? "#000" : "#eee",
                  color: !isDashboard ? "#fff" : "#000",
                  cursor: "pointer"
                }}
              >
                Analytics
              </button>
            </Link>
          </div>

          <button
            onClick={logout}
            style={{
              position: "absolute",
              right: "2rem",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              border: "none",
              background: "#ff4d4f",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      )}

      <Outlet />
    </div>
  );
}

export default App;