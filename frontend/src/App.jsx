import { Outlet, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div>
      {isAuthenticated && (
        <div style={{ padding: "1rem" }}>
          <Link to="/dashboard">
            <button>Dashboard</button>
          </Link>

          <Link to="/analytics">
            <button>Analytics</button>
          </Link>

          <button onClick={logout}>
            Logout
          </button>
        </div>
      )}

      <Outlet /> 
    </div>
  );
}

export default App;