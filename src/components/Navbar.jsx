 
import { Users, MapPin, AlertCircle, Shield } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { icon: Users, label: 'Tourists', tab: 'tourists' },
    { icon: MapPin, label: 'Live Map', tab: 'map' },
    { icon: AlertCircle, label: 'Alerts', tab: 'alerts' },
    { icon: Shield, label: 'Police', tab: 'police' }
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-900 to-purple-900 backdrop-blur-xl sticky top-0 z-50 shadow-2xl border-b border-white/20">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl shadow-xl">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                SafeTravel AI
              </h1>
              <p className="text-xs text-indigo-200">Science Day 2026</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-xl border border-white/20">
            {tabs.map(({ icon: Icon, label, tab }) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  activeTab === tab
                    ? 'bg-white text-indigo-900 shadow-lg scale-105'
                    : 'text-white/80 hover:text-white hover:bg-white/20'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
