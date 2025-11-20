export default function Loading() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-3 bg-white">
      <div className="w-4 h-4 bg-purple-600 rounded-full animate-ping"></div>
      <p className="text-purple-700 font-semibold animate-pulse">
        Loading...
      </p>
    </div>
  );
}
