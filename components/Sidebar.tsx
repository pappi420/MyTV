export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-8">MyTV</h1>

      <nav className="space-y-4">
        <div>🏠 Home</div>
        <div>🎬 Movies</div>
        <div>📺 TV Shows</div>
        <div>📡 Live TV</div>
        <div>🔍 Search</div>
        <div>⚙️ Settings</div>
      </nav>
    </aside>
  );
}