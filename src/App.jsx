import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';

function App() {
  const [activeTab, setActiveTab] = useState('tourists');
  const [tourists, setTourists] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${API_BASE}/api/tourists`).then(r => r.json()).then(setTourists);
    fetch(`${API_BASE}/api/alerts`).then(r => r.json()).then(setAlerts);
  }, []);

  const addTourist = async () => {
    const tourist = await fetch(`${API_BASE}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Tourist ' + Date.now() })
    }).then(r => r.json());
    setTourists(prev => [...prev, tourist]);
  };

  const triggerPanic = async () => {
    const alert = await fetch(`${API_BASE}/api/alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ touristId: tourists[0]?.id || Date.now() })
    }).then(r => r.json());
    setAlerts(prev => [alert, ...prev.slice(0, 4)]);
  };

  const renderTab = () => {
    switch(activeTab) {
      case 'tourists':
        return (
          <div className="max-w-6xl mx-auto p-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Live Map Placeholder */}
              <div className="h-96 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-2xl flex items-center justify-center text-white font-bold text-2xl">
                🗺️ Live Map<br/>Location Tracking
              </div>
              
              {/* Tourists List */}
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-gray-900 mb-6">👥 Active Tourists ({tourists.length})</h2>
                {tourists.slice(0, 5).map(t => (
                  <div key={t.id} className="glass-card p-6 hover:shadow-3xl">
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-bold text-xl">{t.name}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        t.safetyScore > 80 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {t.safetyScore}%
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      🆔 Digital ID: <strong>{t.digitalID}</strong>
                    </div>
                    <button onClick={triggerPanic} className="btn-danger w-full">
                      🚨 PANIC - File E-FIR
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-card p-8 text-center">
              <button onClick={addTourist} className="btn-primary text-xl px-12">
                ➕ Add New Tourist
              </button>
            </div>
          </div>
        );

      case 'police':
        return (
          <div className="max-w-6xl mx-auto p-8 space-y-8">
            <h1 className="text-4xl font-black text-center bg-gradient-to-r from-indigo-900 to-purple-900 bg-clip-text text-transparent">
              👮‍♂️ Police Command Center
            </h1>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card p-8 text-center">
                <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
                <div className="text-4xl font-black text-red-600 mb-2">{alerts.length}</div>
                <div className="text-xl font-bold text-gray-700">Active Alerts</div>
                <div className="text-red-600 mt-2">E-FIRs Filed</div>
              </div>
              
              <div className="glass-card p-8 text-center">
                <Users className="w-20 h-20 text-emerald-500 mx-auto mb-4" />
                <div className="text-4xl font-black text-emerald-600 mb-2">{tourists.length}</div>
                <div className="text-xl font-bold text-gray-700">Tourists Tracked</div>
              </div>
              
              <div className="glass-card p-8 text-center">
                <Shield className="w-20 h-20 text-blue-500 mx-auto mb-4" />
                <div className="text-4xl font-black text-blue-600 mb-2">{tourists.reduce((a, t) => a + t.safetyScore, 0) / Math.max(1, tourists.length)}%</div>
                <div className="text-xl font-bold text-gray-700">Avg Safety</div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Coming Soon: {activeTab}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="pt-4 pb-12 px-4">
        {renderTab()}
      </main>
      
      <footer className="bg-gradient-to-r from-indigo-900/80 to-purple-900/80 text-white py-12 mt-24">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-4">SafeTravel AI</h2>
          <p>Production Ready • Render + Vercel • Science Day 2026</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
