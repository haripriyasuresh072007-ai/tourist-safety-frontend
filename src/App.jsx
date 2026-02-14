import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tourists, setTourists] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Test backend connection
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tourists`)
      .then(r => r.json())
      .then(setTourists)
      .catch(console.error);
  }, []);

  const registerTourist = () => {
    fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Tourist ' + Math.floor(Math.random() * 1000) })
    }).then(r => r.json()).then(tourist => {
      setTourists(prev => [...prev, tourist]);
    });
  };

  const panic = () => {
    setAlerts(prev => [{
      id: Date.now(),
      type: 'panic',
      timestamp: new Date().toISOString()
    }, ...prev.slice(0, 3)]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-black bg-gradient-to-r from-blue-900 to-cyan-600 bg-clip-text text-transparent mb-4">
          🚀 Smart Tourist Safety System
        </h1>
        <p className="text-2xl text-gray-700">Science Day 2026 - Production Ready!</p>
      </div>

      <div className="max-w-4xl mx-auto mb-12 flex flex-wrap gap-4 justify-center">
        <button 
          onClick={registerTourist}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 px-12 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all"
        >
          ➕ Add Tourist ({tourists.length})
        </button>
        <button 
          onClick={panic}
          className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 px-12 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all animate-pulse"
        >
          🚨 PANIC ({alerts.length})
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold mb-6">👥 Active Tourists ({tourists.length})</h2>
          <div className="space-y-4">
            {tourists.map(t => (
              <div key={t.id} className="p-6 bg-blue-50 rounded-2xl border-l-4 border-blue-400">
                <div className="font-bold text-xl">{t.name}</div>
                <div className="text-2xl font-black text-green-600">{t.safetyScore}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold mb-6">🚨 Live Alerts ({alerts.length})</h2>
          <div className="space-y-4">
            {alerts.map(a => (
              <div key={a.id} className="bg-white border-l-6 border-red-500 p-6 rounded-2xl shadow-lg animate-pulse">
                <div className="font-black text-xl text-red-800">PANIC ALERT!</div>
                <div className="text-lg">{new Date(a.timestamp).toLocaleTimeString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
