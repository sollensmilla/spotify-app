export default function LoginButton({
  onClick,
  loading,
  provider,
  icon,
  children,
  variant
}) {
  const isLoading = loading === provider;

  const base =
    "w-full py-3 mt-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition hover:-translate-y-0.5 active:scale-95 disabled:opacity-50";

  const styles = {
    github: "bg-black text-white hover:bg-neutral-800",
    google: "bg-white text-black hover:bg-gray-100"
  };

  return (
    <button
      onClick={onClick}
      disabled={loading !== null}
      className={`${base} ${styles[variant]}`}
    >
      {icon}
      {isLoading ? "Redirecting..." : children}
    </button>
  );
}