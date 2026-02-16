import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SafetyMap from './components/SafetyMap';

function App() {
  const [activeTab, setActiveTab] = useState('tourists');
  const [tourists, setTourists] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  
  const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${API_BASE}/api/tourists`)
      .then(r => r.json())
      .then(setTourists);
    
    fetch(`${API_BASE}/api/alerts`)
      .then(r => r.json())
      .then(setAlerts);
  }, []);

  const handlePanic = async (touristId) => {
    const response = await fetch(`${API_BASE}/api/alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        touristId, 
        location: [13.9167 + (Math.random() - 0.5)*0.01, 78.4867 + (Math.random() - 0.5)*0.01],
        timestamp: Date.now()
      })
    });
    const alert = await response.json();
    setAlerts(prev => [alert, ...prev]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'tourists':
        return (
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <SafetyMap tourists={tourists} alerts={alerts} currentLocation={currentLocation} />
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-200/50 backdrop-blur-xl p-8 rounded-3xl">
                  <h2 className="text-3xl font-black text-emerald-900 mb-4">👥 Active Tourists</h2>
                  <div className="grid gap-4">
                    {tourists.map(tourist => (
                      <div key={tourist.id} className="group p-6 bg-white/70 hover:bg-white rounded-2xl shadow-lg border border-emerald-100 hover:shadow-2xl transition-all">
                        <div className="flex justify-between items-start mb-3">
                          <div className="font-bold text-xl">{tourist.name}</div>
                          <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                            tourist.safetyScore > 80 ? 'bg-emerald-100 text-emerald-800' :
                            tourist.safetyScore > 60 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {tourist.safetyScore}%
                          </div>
                        </div>
                        <div className="flex gap-4 text-sm text-gray-600 mb-4">
                          <span>ID: {tourist.id}</span>
                          <span>{new Date(tourist.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <button 
                          onClick={() => handlePanic(tourist.id)}
                          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-xl font-bold hover:shadow-xl transition-all group-hover:scale-[1.02]"
                        >
                          🚨 PANIC BUTTON
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'police':
        return (
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/50 p-8 rounded-3xl backdrop-blur-xl">
              <h2 className="text-3xl font-black text-indigo-900 mb-6">👮‍♂️ Police Command Center</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/70 p-6 rounded-2xl shadow-lg text-center">
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <div className="text-4xl font-black text-red-600 mb-2">{alerts.length}</div>
                  <div className="text-gray-700 font-bold">Active Alerts</div>
                </div>
                <div className="bg-white/70 p-6 rounded-2xl shadow-lg text-center">
                  <Users className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <div className="text-4xl font-black text-emerald-600 mb-2">{tourists.length}</div>
                  <div className="text-gray-700 font-bold">Tourists Tracked</div>
                </div>
                <div className="bg-white/70 p-6 rounded-2xl shadow-lg text-center">
                  <Shield className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <div className="text-4xl font-black text-blue-600 mb-2">98.7%</div>
                  <div className="text-gray-700 font-bold">Avg Safety Score</div>
                </div>
              </div>
            </div>
            <SafetyMap tourists={tourists} alerts={alerts} />
          </div>
        );

      default:
        return <SafetyMap tourists={tourists} alerts={alerts} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="pt-4 pb-12">
        {renderContent()}
      </main>
      
      <footer className="bg-gradient-to-r from-indigo-900/80 to-purple-900/80 backdrop-blur-xl border-t border-white/20 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center text-white/90">
          <div className="text-2xl font-black mb-4">SafeTravel AI</div>
          <p>Production Deployment: Render + Vercel | Science Day 2026</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
