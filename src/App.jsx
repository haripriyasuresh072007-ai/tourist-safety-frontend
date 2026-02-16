import { useState, useEffect } from 'react';
import { Users, MapPin, AlertCircle, Shield, LogIn, UserPlus, ShieldCheck } from 'lucide-react';
import Navbar from './components/Navbar';

function App() {
  const [view, setView] = useState('login'); // login, dashboard, admin
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [tourists, setTourists] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [activeTab, setActiveTab] = useState('tourists');
  
  const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  // Demo users for login
  const demoLogin = (email, password, role = 'tourist') => {
    if ((email === 'admin@police.gov' || email === 'tourist@test.com') && password === '123456') {
      setUser({ email, role });
      setRole(role);
      setView('dashboard');
      return true;
    }
    return false;
  };

  const registerTourist = async () => {
    const tourist = {
      id: Date.now(),
      name: `Tourist ${tourists.length + 1}`,
      email: user?.email || 'demo@test.com',
      location: { lat: 13.9167 + (Math.random() - 0.5)*0.01, lng: 78.4867 + (Math.random() - 0.5)*0.01 },
      safetyScore: 85 + Math.floor(Math.random() * 15),
      digitalID: `ID${Date.now().toString().slice(-6)}`,
      status: 'active'
    };
    setTourists(prev => [...prev, tourist]);
  };

  const panicAlert = () => {
    const alertData = {
      id: Date.now(),
      touristId: tourists[0]?.id || 'demo',
      location: { lat: 13.92, lng: 78.48 },
      type: 'panic',
      efirId: `E-FIR${Date.now().toString().slice(-6)}`,
      status: 'police-dispatched',
      timestamp: new Date().toISOString()
    };
    setAlerts(prev => [alertData, ...prev.slice(0, 4)]);
  };

  const renderView = () => {
    if (view === 'login') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center px-4">
          <div className="glass-card max-w-md w-full p-12 text-center">
            <div className="mb-12">
              <ShieldCheck className="w-24 h-24 text-emerald-500 mx-auto mb-6" />
              <h1 className="text-4xl font-black bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent mb-4">
                SafeTravel AI
              </h1>
              <p className="text-xl text-gray-300">Science Day 2026</p>
            </div>

            <div className="space-y-6">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
                value={user?.email || ''}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
                value={user?.password || ''}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <div className="text-sm text-emerald-200 space-y-2">
                <div>👮‍♂️ Police: admin@police.gov / 123456</div>
                <div>🧳 Tourist: tourist@test.com / 123456</div>
              </div>
              
              <button
                onClick={() => {
                  if (demoLogin(user?.email || '', user?.password || '')) {
                    // Success
                  } else {
                    alert('Invalid credentials! Use demo accounts above.');
                  }
                }}
                className="btn-primary w-full text-xl py-5"
              >
                <LogIn className="w-6 h-6 inline mr-2" />
                Enter Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="pt-4 pb-12 px-4">
          {activeTab === 'tourists' && (
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Live Map */}
              <div className="glass-card h-96 rounded-3xl overflow-hidden shadow-3xl">
                <div className="h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex flex-col items-center justify-center text-white p-8">
                  <MapPin className="w-20 h-20 mb-6 opacity-80" />
                  <div className="text-center">
                    <h2 className="text-3xl font-black mb-4">🗺️ Live Location Tracking</h2>
                    <p className="text-xl opacity-90">{tourists.length} tourists tracked in real-time</p>
                    <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
                      <div className="bg-white/20 p-3 rounded-xl">📍 Ranipet District</div>
                      <div className="bg-white/20 p-3 rounded-xl">🟢 92% Safe Zone</div>
                      <div className="bg-white/20 p-3 rounded-xl">🚨 {alerts.length} Alerts</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tourists + Panic */}
              <div className="glass-card p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-8">
                  <div>
                    <h2 className="text-4xl font-black text-gray-900 mb-2">👥 Active Tourists</h2>
                    <div className="text-2xl text-emerald-600 font-bold">({tourists.length} tracked)</div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={registerTourist} className="btn-primary text-xl px-12">
                      ➕ Add Tourist
                    </button>
                    <button onClick={panicAlert} className="btn-danger text-xl px-12">
                      🚨 PANIC ALERT
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {tourists.slice(0, 6).map(tourist => (
                    <div key={tourist.id} className="glass-card p-6 hover:shadow-3xl border-l-4 border-emerald-400">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="font-black text-xl text-gray-900">{tourist.name}</div>
                          <div className="text-3xl font-black text-emerald-600">{tourist.safetyScore}%</div>
                        </div>
                        <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                          tourist.safetyScore > 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          Safe
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600 mb-6">
                        <div>🆔 <strong>{tourist.digitalID}</strong></div>
                        <div>📍 Ranipet District</div>
                        <div>🕒 Active now</div>
                      </div>
                      <button onClick={panicAlert} className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-xl font-bold hover:shadow-xl transition-all">
                        🚨 Send Panic Alert
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'police' && (
            <div className="max-w-6xl mx-auto p-8 space-y-12">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-900 to-purple-900 bg-clip-text text-transparent mb-4">
                  👮‍♂️ Police Command Center
                </h1>
                <p className="text-2xl text-gray-600">Real-time incident response dashboard</p>
              </div>

              {/* Live Metrics */}
              <div className="grid md:grid-cols-4 gap-8 mb-12">
                <div className="glass-card p-8 text-center group hover:scale-105 transition-all">
                  <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6 group-hover:animate-bounce" />
                  <div className="text-5xl font-black text-red-600 mb-2">{alerts.length}</div>
                  <div className="text-2xl font-bold text-gray-700">Active Alerts</div>
                  <div className="text-red-600 font-semibold mt-2">{alerts.length} E-FIRs</div>
                </div>

                <div className="glass-card p-8 text-center group hover:scale-105 transition-all">
                  <Users className="w-20 h-20 text-emerald-500 mx-auto mb-6 group-hover:animate-bounce" />
                  <div className="text-5xl font-black text-emerald-600 mb-2">{tourists.length}</div>
                  <div className="text-2xl font-bold text-gray-700">Tourists Tracked</div>
                  <div className="text-emerald-600 font-semibold mt-2">Live GPS</div>
                </div>

                <div className="glass-card p-8 text-center group hover:scale-105 transition-all">
                  <ShieldCheck className="w-20 h-20 text-blue-500 mx-auto mb-6 group-hover:animate-bounce" />
                  <div className="text-5xl font-black text-blue-600 mb-2">
                    {Math.round(tourists.reduce((a, t) => a + t.safetyScore, 0) / Math.max(1, tourists.length))}%
                  </div>
                  <div className="text-2xl font-bold text-gray-700">Safety Score</div>
                  <div className="text-blue-600 font-semibold mt-2">District Average</div>
                </div>

                <div className="glass-card p-8 text-center group hover:scale-105 transition-all md:col-span-1">
                  <Shield className="w-20 h-20 text-purple-500 mx-auto mb-6 group-hover:animate-bounce" />
                  <div className="text-5xl font-black text-purple-600 mb-2">24/7</div>
                  <div className="text-2xl font-bold text-gray-700">Response Time</div>
                  <div className="text-purple-600 font-semibold mt-2">AI Dispatch</div>
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="glass-card p-8">
                <h2 className="text-3xl font-black text-gray-900 mb-8">🚨 Recent E-FIRs ({alerts.length})</h2>
                <div className="space-y-4">
                  {alerts.map(alert => (
                    <div key={alert.id} className="flex items-center gap-6 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border-l-6 border-red-500 hover:shadow-xl transition-all">
                      <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                        🚨
                      </div>
                      <div className="flex-1">
                        <div className="font-black text-xl text-red-800 mb-1">Panic Alert #{alert.efirId}</div>
                        <div className="text-gray-700 mb-2">Ranipet District • {new Date(alert.timestamp).toLocaleString()}</div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full">Police Dispatched</span>
                          <span>ETA: 8 min</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <button className="px-6 py-2 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600">
                          RESOLVE
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="bg-gradient-to-r from-indigo-900/95 to-purple-900/95 backdrop-blur-xl text-white py-8 mt-24 border-t border-white/20">
          <div className="max-w-6xl mx-auto text-center px-4">
            <h3 className="text-2xl font-black mb-4">SafeTravel AI</h3>
            <p>Production Deployment • Render Backend + Vercel Frontend • Science Day 2026</p>
          </div>
        </footer>
      </div>
    );
  };

  return renderView();
}

export default App;
