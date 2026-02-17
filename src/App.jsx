import React, { useState, useEffect } from "react";

function App() {
  const [lang, setLang] = useState("en");
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [tourists, setTourists] = useState([]);
  const [alerts, setAlerts] = useState(0);
  const [position, setPosition] = useState(null);
  const [shareUrl, setShareUrl] = useState("");
  const [panicHold, setPanicHold] = useState(false);
  const [panicTimerId, setPanicTimerId] = useState(null);

  const translations = {
    en: {
      appTitle: "Smart Tourist Safety System",
      subtitle: "Your safety companion while travelling",
      loginTitle: "Welcome Back",
      email: "Email Address",
      password: "Password",
      loginButton: "Sign In",
      roleTourist: "Tourist", roleAdmin: "Admin",
      demoInfo: "admin@police.gov / 123456"
    }
  };

  const t = translations[lang] || translations.en;

  // YOUR ORIGINAL PERSISTENT STORAGE
  useEffect(() => {
    const saved = localStorage.getItem('safetravel_data');
    if (saved) {
      const data = JSON.parse(saved);
      setTourists(data.tourists || []);
      setAlerts(data.alerts || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('safetravel_data', JSON.stringify({ tourists, alerts }));
  }, [tourists, alerts]);

  // YOUR ORIGINAL LOCATION CODE
  const startLocationWatch = () => {
    if (!navigator.geolocation) return alert("GPS not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setPosition({ lat, lng });
        setShareUrl(`https://maps.app.goo.gl/?q=${lat},${lng}`);
      },
      () => alert("Location access denied")
    );
  };

  const handleLogin = (email, password) => {
    if (email === "admin@police.gov" && password === "123456") {
      setUser({ role: "admin", email, name: "Ranipet Police Admin" });
      return true;
    }
    const found = tourists.find(t => t.email === email);
    if (found && password === "123456") {
      setUser({ role: "tourist", ...found });
      return true;
    }
    return false;
  };

  // YOUR ORIGINAL FUNCTIONS (panic, register, etc.)
  const handleRegister = (form) => {
    const id = `TRV${(tourists.length + 1).toString().padStart(4, "0")}`;
    const newTourist = { id, ...form, registeredAt: new Date().toLocaleString() };
    setTourists(prev => [...prev, newTourist]);
    alert(`✅ Registered! ID: ${id}`);
    setShowRegister(false);
  };

  const triggerPanic = () => {
    setAlerts(a => a + 1);
    alert("🚨 PANIC ALERT! Police notified!");
    setPanicHold(false);
    if (panicTimerId) clearTimeout(panicTimerId);
  };

  const startPanicHold = () => {
    setPanicHold(true);
    const timer = setTimeout(triggerPanic, 3000);
    setPanicTimerId(timer);
  };

  const cancelPanicHold = () => {
    setPanicHold(false);
    if (panicTimerId) clearTimeout(panicTimerId);
  };

  // SPLIT-SCREEN LOGIN PAGE (Your exact specs)
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-blue-50 to-[#f8fafc] flex flex-col lg:flex-row font-['Inter',sans-serif]">
        {/* LEFT: Hero Section */}
        <div className="lg:w-1/2 flex flex-col justify-center p-12 lg:p-24 order-2 lg:order-1">
          <div className="max-w-md mx-auto lg:mx-0">
            <div className="w-20 h-20 bg-gradient-to-r from-[#2563EB] to-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl">
              <span className="text-2xl">🛡️</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-slate-800 to-[#2563EB] bg-clip-text text-transparent mb-6 leading-tight">
              Smart Tourist Safety System
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Your safety companion while travelling
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm mb-12 opacity-90">
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl text-center border border-slate-200/50 hover:scale-105 transition-all duration-300">
                <div className="text-2xl font-bold text-[#2563EB]">24/7</div>
                <div className="text-slate-700 font-medium">Monitoring</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl text-center border border-slate-200/50 hover:scale-105 transition-all duration-300">
                <div className="text-2xl font-bold text-green-600">1-Click</div>
                <div className="text-slate-700 font-medium">SOS Alert</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl text-center border border-slate-200/50 hover:scale-105 transition-all duration-300">
                <div className="text-2xl font-bold text-orange-600">Live GPS</div>
                <div className="text-slate-700 font-medium">Tracking</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Login Card */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12 order-1 lg:order-2">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-xl shadow-2xl border border-white/60 rounded-3xl p-12 animate-[fade-in-up_0.8s_ease-out]">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-gradient-to-r from-[#2563EB] to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl border-4 border-white/40">
                <span className="text-xl">🔐</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">Welcome Back</h2>
              <p className="text-lg text-slate-600 font-medium">Sign in to your account</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const email = formData.get('email');
              const password = formData.get('password');
              if (handleLogin(email, password)) return;
              alert("❌ Invalid: admin@police.gov / 123456");
            }}>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Role</label>
                <select name="role" className="w-full px-5 py-4 text-lg border border-slate-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all duration-300 hover:border-slate-300 shadow-sm">
                  <option value="tourist">👤 Tourist</option>
                  <option value="admin">🛡️ Police Admin</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="admin@police.gov"
                  className="w-full px-5 py-4 text-lg border border-slate-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all duration-300 hover:border-slate-300 shadow-sm placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-5 py-4 text-lg border border-slate-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all duration-300 hover:border-slate-300 shadow-sm placeholder-slate-400"
                />
              </div>

              <div className="flex items-center justify-between text-sm pt-2">
                <a href="#" className="text-[#2563EB] hover:text-blue-700 font-semibold hover:underline transition-all">Forgot Password?</a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-5 px-6 rounded-2xl text-xl shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all duration-300 hover:-translate-y-0.5 border border-blue-200/50"
              >
                Sign In Securely
              </button>
            </form>

            <div className="text-center mt-12 pt-8 border-t border-slate-200/50">
              <p className="text-xs text-slate-500 font-medium">
                © 2026 Smart Tourist Safety System. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  // YOUR ORIGINAL ADMIN DASHBOARD WITH LIVEMAP
  if (user.role === "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-2xl border-b border-white/50">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#2563EB] to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                🛡️
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-900">Police Command Center</h1>
                <p className="text-slate-600 font-semibold">Live tourist monitoring</p>
              </div>
            </div>
            <button onClick={() => setUser(null)} className="px-8 py-3 bg-slate-200 hover:bg-slate-300 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all">
              Logout
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
          {/* Stats */}
          <section className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center hover:scale-[1.02] transition-all">
              <div className="text-4xl mb-4">👥</div>
              <div className="text-5xl font-black text-[#2563EB] mb-2">{tourists.length}</div>
              <h3 className="text-2xl font-bold text-slate-800">Active Tourists</h3>
            </div>
            <div className="bg-gradient-to-br from-red-500/90 to-red-600/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center text-white hover:scale-[1.02] transition-all">
              <div className="text-4xl mb-4">🚨</div>
              <div className="text-5xl font-black mb-2">{alerts}</div>
              <h3 className="text-2xl font-bold">Panic Alerts</h3>
            </div>
            <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center hover:scale-[1.02] transition-all">
              <div className="text-4xl mb-4">📍</div>
              <div className="text-5xl font-black text-green-600 mb-2">{position ? 1 : 0}</div>
              <h3 className="text-2xl font-bold text-slate-800">Live Locations</h3>
            </div>
          </section>

          {/* YOUR ORIGINAL LIVEMAP SECTION */}
          <section className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
              🗺️ Live Location Map
            </h2>
            {position ? (
              <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-200/50">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.436587395299!2d${position.lng}!3d${position.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${position.lat}%2C${position.lng}!5e0!3m2!1sen!2sin!4v1634567890123`}
                  width="100%"
                  height="100%"
                  style={{border:0}}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="h-[500px] bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                Click "Share Location" to activate live tracking
              </div>
            )}
          </section>

          {/* Tourist Table */}
          <section className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-slate-100">
              <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                📋 Registered Tourists ({tourists.length})
              </h2>
            </div>
            {tourists.length === 0 ? (
              <div className="py-20 text-center text-slate-500">
                <div className="text-6xl mb-6">👋</div>
                <h3 className="text-2xl font-bold mb-2">No tourists registered</h3>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-8 py-6 text-left text-slate-700 font-bold">ID</th>
                      <th className="px-8 py-6 text-left text-slate-700 font-bold">Name</th>
                      <th className="px-8 py-6 text-left text-slate-700 font-bold">Email</th>
                      <th className="px-8 py-6 text-left text-slate-700 font-bold">Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tourists.map(tourist => (
                      <tr key={tourist.id} className="border-b hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-6 font-mono font-bold text-[#2563EB]">{tourist.id}</td>
                        <td className="px-8 py-6 font-semibold">{tourist.name}</td>
                        <td className="px-8 py-6 text-slate-600">{tourist.email}</td>
                        <td className="px-8 py-6 text-sm text-slate-500">{tourist.registeredAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>
      </div>
    );
  }

  // YOUR ORIGINAL TOURIST DASHBOARD
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-red-50 p-12">
      <div className="max-w-2xl mx-auto space-y-12 text-center">
        <button onClick={() => setUser(null)} className="absolute top-6 right-6 px-6 py-3 bg-slate-200 hover:bg-slate-300 font-bold rounded-2xl shadow-xl">
          Logout
        </button>
        <h1 className="text-5xl font-black bg-gradient-to-r from-slate-800 to-[#2563EB] bg-clip-text text-transparent">
          Your Safety Dashboard
        </h1>
        
        <div className="bg-white/90 backdrop-blur-xl p-12 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">📍 Share Location</h2>
          <button 
            onClick={startLocationWatch}
            className="w-full bg-gradient-to-r from-[#2563EB] to-blue-600 text-white font-bold py-6 px-8 rounded-3xl text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all mb-8"
          >
            📍 Get Live Location
          </button>
          {shareUrl && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <p className="font-bold text-blue-800 mb-2">✅ Share this link:</p>
              <a href={shareUrl} target="_blank" className="text-blue-600 hover:text-blue-700 font-mono text-sm bg-white px-4 py-2 rounded-xl border inline-block">
                {shareUrl}
              </a>
            </div>
          )}
        </div>

        {/* YOUR RED PANIC BUTTON */}
        <div className="relative">
          <button
            onMouseDown={startPanicHold}
            onMouseUp={cancelPanicHold}
            onMouseLeave={cancelPanicHold}
            onTouchStart={startPanicHold}
            onTouchEnd={cancelPanicHold}
            className={`w-72 h-72 mx-auto text-4xl font-black shadow-4xl border-8 rounded-full transition-all duration-300 ${
              panicHold 
                ? 'bg-red-600 scale-110 animate-pulse shadow-red-500/50' 
                : 'bg-gradient-to-br from-red-500 to-red-700 hover:scale-105 hover:shadow-[0_0_60px_rgba(239,68,68,0.4)]'
            } text-white`}
          >
            {panicHold ? 'HOLDING... 3s' : '🚨 PANIC'}
          </button>
          <div className="mt-8 text-xl font-bold text-red-600 animate-pulse">
            Hold 3 seconds for EMERGENCY
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
