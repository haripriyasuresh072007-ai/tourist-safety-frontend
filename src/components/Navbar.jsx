import { LayoutDashboard, Users, ShieldAlert, MapPin } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="bg-white/90 backdrop-blur-xl border-b border-blue-100 shadow-xl sticky top-20 z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-3 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-2xl'
                : 'text-gray-700 hover:bg-blue-50 hover:shadow-lg bg-white/50'
            }`}
          >
            <LayoutDashboard className="w-6 h-6" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('tourists')}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
              activeTab === 'tourists'
                ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-2xl'
                : 'text-gray-700 hover:bg-blue-50 hover:shadow-lg bg-white/50'
            }`}
          >
            <Users className="w-6 h-6" />
            Tourists
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
              activeTab === 'alerts'
                ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-2xl'
                : 'text-gray-700 hover:bg-blue-50 hover:shadow-lg bg-white/50'
            }`}
          >
            <ShieldAlert className="w-6 h-6" />
            Alerts
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
              activeTab === 'map'
                ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-2xl'
                : 'text-gray-700 hover:bg-blue-50 hover:shadow-lg bg-white/50'
            }`}
          >
            <MapPin className="w-6 h-6" />
            Live Map
          </button>
        </div>
      </div>
    </nav>
  );
}
