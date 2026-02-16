 
import { LayoutDashboard, Users, MapPin, ShieldAlert, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ activeTab, setActiveTab }) {
  const { user, logout } = useAuth();

  const tabs = [
    { id: 'overview', icon: LayoutDashboard, label: 'Command Center' },
    { id: 'tourists', icon: Users, label: 'Tourists' },
    { id: 'alerts', icon: ShieldAlert, label: 'Active Alerts' },
    { id: 'map', icon: MapPin, label: 'Live Map' }
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-lg sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all group ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:shadow-lg'
              }`}
            >
              <tab.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
