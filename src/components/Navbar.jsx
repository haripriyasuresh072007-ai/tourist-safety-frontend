 
import { LayoutDashboard, Users, ShieldAlert, MapPin } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'tourists', icon: Users, label: 'Tourists' },
    { id: 'alerts', icon: ShieldAlert, label: 'Alerts' },
    { id: 'map', icon: MapPin, label: 'Live Map' }
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-xl border-b border-blue-100 shadow-xl sticky top-20 z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto flex gap-3 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-2xl'
                : 'text-gray-700 hover:bg-blue-50 hover:shadow-lg bg-white/50'
            }`}
          >
            <tab.icon className="w-6 h-6" />
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
