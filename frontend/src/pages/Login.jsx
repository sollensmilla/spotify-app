import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { loginWithGithub, loginWithGoogle } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome! To use the app you must first log in or register a new account.</h2>

      <button onClick={loginWithGithub}>
        Login with GitHub
      </button>

      <br /><br />

      <button onClick={loginWithGoogle}>
        Login with Google
      </button>
    </div>
  );
}