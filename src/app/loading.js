import "./globals.css";

export default function Loading() {
  return (
    <div
      aria-label="Loading..."
      className="spinner-parent
    flex items-center justify-center fixed top-0 left-0 z-50 w-full h-full bg-[#000000b9]"
      role="status"
    >
      <span className="loader-item"></span>
    </div>
  );
}
