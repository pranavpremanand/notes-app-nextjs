import './style.css'

export default function HomeLoading() {
  return (
    <div
      aria-label="Loading..."
      className="spinner-parent
    flex items-center justify-center w-full h-full"
      role="status"
    >
      <span className="loader"></span>
    </div>
  );
}
