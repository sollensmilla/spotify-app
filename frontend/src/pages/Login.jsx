import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function Login() {
  const { loginWithGithub, loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleLogin = (provider) => {
    setLoading(provider);

    if (provider === "github") loginWithGithub();
    if (provider === "google") loginWithGoogle();
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      
      <div
        className={`bg-white/5 backdrop-blur-xl p-12 rounded-2xl w-[380px] text-center shadow-2xl text-white transform transition-all duration-500
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <h2 className="text-base font-medium mb-8 leading-relaxed text-slate-200">
          Welcome! To use the app you must first log in or register a new account.
        </h2>

        <button
          onClick={() => handleLogin("github")}
          disabled={loading !== null}
          className="w-full py-3 mt-2 rounded-xl font-semibold bg-black text-white flex items-center justify-center gap-2 transition hover:bg-neutral-800 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
        >
          {loading === "github" ? <Spinner /> : <GithubIcon />}
          {loading === "github" ? "Redirecting..." : "Login with GitHub"}
        </button>

        <button
          onClick={() => handleLogin("google")}
          disabled={loading !== null}
          className="w-full py-3 mt-4 rounded-xl font-semibold bg-white text-black flex items-center justify-center gap-2 transition hover:bg-gray-100 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
        >
          {loading === "google" ? <Spinner /> : <GoogleIcon />}
          {loading === "google" ? "Redirecting..." : "Login with Google"}
        </button>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
  );
}

function GithubIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
      0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61
      -.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.084-.729.084-.729
      1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.304 3.492.997
      .108-.775.418-1.305.76-1.605-2.665-.3-5.467-1.332-5.467-5.93
      0-1.31.47-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176
      0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404
      c1.02.005 2.047.138 3.003.404 2.29-1.552 3.296-1.23
      3.296-1.23.653 1.653.242 2.873.118 3.176
      .77.84 1.235 1.91 1.235 3.22
      0 4.61-2.807 5.625-5.48 5.92
      .43.37.823 1.102.823 2.222
      0 1.606-.015 2.896-.015 3.286
      0 .322.216.694.825.576C20.565 21.795 24 17.296 24 12
      24 5.37 18.63 0 12 0z"/>
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 
      0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 
      7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4
      12.9 4 4 12.9 4 24s8.9 20 20 20
      20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16.1 18.9 12 24 12c3 
      0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 
      29.3 4 24 4c-7.7 0-14.3 4.4-17.7 10.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.3l-6.2-5.1C29.2 
      35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.6 
      5.1C9.7 39.6 16.3 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 
      3.1-3.5 5.5-6.5 6.8l6.2 5.1C39.5 36.5 44 30.8 
      44 24c0-1.3-.1-2.7-.4-3.5z"/>
    </svg>
  );
}