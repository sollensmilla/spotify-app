export default function LoginCard({ visible, children }) {
  return (
    <div
      className={`bg-white/5 backdrop-blur-xl p-12 rounded-2xl w-[380px] text-center shadow-2xl text-white transition-all duration-500
      ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
    >
      {children}
    </div>
  );
}