import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

import LoginCard from "../components/login/LoginCard";
import LoginButton from "../components/login/LoginButton";
import Spinner from "../components/login/Spinner";
import GithubIcon from "../components/login/icons/GithubIcon";
import GoogleIcon from "../components/login/icons/GoogleIcon";

export default function Login() {
  const { loginWithGithub, loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(null);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => setVisible(true), []);

const handleLogin = (provider) => {
  try {
    setLoading(provider);
    setError(null);

    if (provider === "github") loginWithGithub();
    if (provider === "google") loginWithGoogle();
  } catch (err) {
    setError("Login failed");
    setLoading(null);
  }
};

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <LoginCard visible={visible}>
        <h2 className="text-base font-medium mb-8 text-slate-200">
          Welcome! To use the app you must first log in or register a new account.
        </h2>

        <LoginButton
          onClick={() => handleLogin("github")}
          loading={loading}
          provider="github"
          variant="github"
          icon={loading === "github" ? <Spinner /> : <GithubIcon />}
        >
          Login with GitHub
        </LoginButton>

        <LoginButton
          onClick={() => handleLogin("google")}
          loading={loading}
          provider="google"
          variant="google"
          icon={loading === "google" ? <Spinner /> : <GoogleIcon />}
        >
          Login with Google
        </LoginButton>

          {error && (
    <p className="text-red-400 mt-4 text-sm text-center">
      {error}
    </p>
  )}
      </LoginCard>
    </div>
  );
}