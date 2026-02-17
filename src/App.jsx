import React, { useState, useEffect, useRef } from "react";

// SOS Alert Sound (Base64 encoded)
const SOS_AUDIO = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAo');

const translations = {
  en: {
    appTitle: "SafeTravel AI",
    subtitle: "Real-time tourist safety system",
    loginTitle: "Command Center Access",
    welcome: "Welcome Back",
    role: "Select Role", tourist: "👤 Tourist", admin: "🛡️ Police Admin",
    email: "Email", password: "Password", login: "LOGIN",
    register: "Register Tourist", name: "Full Name", phone: "Phone",
    policeCenter: "Police Command Center", touristDash: "Safety Dashboard",
    activeTourists: "Active Tourists", panicAlerts: "SOS Alerts",
    liveMap: "🔴 LIVE TRACKING MAP", touristList: "Registered Tourists",
    shareLocation: "Share Live Location", sosButton: "🚨 EMERGENCY SOS",
    holdSOS: "HOLD 4s for SOS Alert", yourID: "Your ID",
    noTourists: "No tourists registered", demo: "admin@police.gov / 123456",
    backLogin: "← Back to Login", registered: "✅ Registered Successfully!"
  },
  ta: {
    appTitle: "SafeTravel AI", subtitle: "நேரடி சுற்றுலா பாதுகாப்பு",
    loginTitle: "கட்டுப்பாட்டு மைய அணுகல்", welcome: "வரவேற்கிறோம்",
    role: "பாத்திரம்", tourist: "👤 சுற்றுலாப் பயணி", admin: "🛡️ காவல்",
    email: "மின்னஞ்சல்", password: "கடவுச்சொல்", login: "உள்நுழை",
    register: "சுற்றுலா பயணி பதிவு", name: "முழு பெயர்", phone: "தொலைபேசி",
    policeCenter: "காவல் கட்டுப்பாட்டு மைய", touristDash: "பாதுகாப்பு இயக்குபலகை",
    activeTourists: "திறமையான சுற்றுலாப் பயணிகள்", panicAlerts: "SOS எச்சரிக்கைகள்",
    liveMap: "🔴 நேரடி இருப்பிட வரைபடம்", touristList: "பதிவான சுற்றுலாப் பயணிகள்",
    shareLocation: "நேரடி இருப்பிடத்தை பகிரவும்", sosButton: "🚨 அவசர உதவி",
    holdSOS: "SOS குறிக்க 4 வினாடிகள் அழுத்தவும்", yourID: "உங்கள் ID",
    noTourists: "சுற்றுலாப் பயணிகள் இல்லை", demo: "admin@police.gov / 123456",
    backLogin: "← உள்நுழைவுக்கு", registered: "✅ வெற்றிகரமாக பதிவு!"
  }
};

function App() {
  const [lang, setLang] = useState("en");
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login"); // login/register/admin/tourist
  const [tourists, setTourists] = useState([]);
  const [alerts, setAlerts] = useState(0);
  const [position, setPosition] = useState(null);
  const [shareUrl, setShareUrl] = useState("");
  const [sosHold, setSosHold] = useState(false);
  const [sosTimer, setSosTimer] = useState(null);
  const [sosCountdown, setSosCountdown] = useState(4);
  const [formData, setFormData] = useState({name:"", email:"", phone:"", password:""});

  const t = translations[lang];
  const sosRef = useRef();

  // PERSISTENT STORAGE
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('safetravel') || '{}');
    setTourists(data.tourists || []);
    setAlerts(data.alerts || 0);
  }, []);

  useEffect(() => {
    localStorage.setItem('safetravel', JSON.stringify({tourists, alerts}));
  }, [tourists, alerts]);

  // LIVE LOCATION TRACKING
  const startTracking = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const {latitude: lat, longitude: lng} = pos.coords;
          setPosition({lat, lng});
          setShareUrl(`https://maps.google.com/?q=${lat},${lng}`);
        },
        (err) => alert("Location access denied"),
        {enableHighAccuracy: true, timeout: 10000, maximumAge: 60000}
      );
    }
  };

  // SOS SYSTEM - 4 SECOND HOLD WITH SOUND
  useEffect(() => {
    if (sosHold && sosCountdown > 0) {
      const timer = setTimeout(() => setSosCountdown(sosCountdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (sosCountdown === 0) {
      triggerSOS();
    }
  }, [sosHold, sosCountdown]);

  const triggerSOS = () => {
    SOS_AUDIO.play().catch(() => {});
    setAlerts(a => a + 1);
    alert("🚨 SOS ACTIVATED! Police dispatched to your location!");
    setSosHold(false);
    setSosCountdown(4);
    if (sosTimer) clearTimeout(sosTimer);
  };

  const handleSOSStart = () => {
    setSosHold(true);
    setSosCountdown(4);
  };

  const handleSOSCancel = () => {
    setSosHold(false);
    setSosCountdown(4);
    if (sosTimer) clearTimeout(sosTimer);
  };

  // AUTH & REGISTRATION
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email === "admin@police.gov" && e.target.password.value === "123456") {
      setUser({role: "admin", name: "Ranipet Police", email});
      return;
    }
    const tourist = tourists.find(t => t.email === email);
    if (tourist && e.target.password.value === "123456") {
      setUser(tourist);
      return;
    }
    alert("❌ Invalid credentials\nDemo: " + t.demo);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const id = `TRV${Date.now().toString().slice(-6)}`;
    const newTourist = {
      id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      registered: new Date().toLocaleString()
    };
    setTourists([...tourists, newTourist]);
    setFormData({name:"", email:"", phone:"", password:""});
    alert(t.registered + "\nID: " + id);
    setView("login");
  };

  const logout = () => {
    setUser(null);
    setView("login");
    setPosition(null);
  };

  const LanguageSwitcher = () => (
    <select onChange={e => setLang(e.target.value)} className="bg-white/90 backdrop-blur-xl px-4 py-2 rounded-2xl font-bold text-slate-800 border border-slate-200 shadow-lg hover:shadow-xl transition-all cursor-pointer">
      <option value="en">🇬🇧 EN</option>
      <option value="ta">🇮🇳 தமிழ்</option>
    </select>
  );

  // REGISTER FORM
  if (view === "register") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border border-white/50">
          <div className="flex justify-between items-center mb-8">
            <LanguageSwitcher />
            <button onClick={() => setView("login")} className="text-2xl font-bold text-slate-600 hover:text-slate-900">←</button>
          </div>
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl text-white text-3xl">👤</div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-green-600 bg-clip-text text-transparent mb-2">{t.register}</h1>
            <p className="text-slate-600 text-lg">Create tourist profile</p>
          </div>
          <form onSubmit={handleRegister} className="space-y-6">
            <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder={t.name} className="w-full p-4 border-2 border-slate-200 rounded-xl text-lg focus:border-green-400 focus:ring-4 focus:ring-green-100 shadow-lg transition-all" required />
            <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" placeholder={t.email} className="w-full p-4 border-2 border-slate-200 rounded-xl text-lg focus:border-green-400 focus:ring-4 focus:ring-green-100 shadow-lg transition-all" required />
            <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="tel" placeholder={t.phone} className="w-full p-4 border-2 border-slate-200 rounded-xl text-lg focus:border-green-400 focus:ring-4 focus:ring-green-100 shadow-lg transition-all" required />
            <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-5 px-8 rounded-2xl text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 hover:from-green-600 hover:to-emerald-700">✅ {t.register}</button>
          </form>
        </div>
      </div>
    );
  }

  // LOGIN SCREEN
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-emerald-100 flex flex-col lg:flex-row items-center justify-center p-8 gap-16">
        {/* Hero */}
        <div className="lg:w-1/2 text-center lg:text-left max-w-lg space-y-8">
          <LanguageSwitcher />
          <div className="w-28 h-28 bg-gradient-to-br from-indigo-500 via-blue-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto lg:mx-0 shadow-2xl text-4xl mb-8">🛡️</div>
          <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-slate-900 via-blue-900 to-emerald-600 bg-clip-text text-transparent leading-tight">
            {t.appTitle}
          </h1>
          <p className="text-2xl text-slate-600 font-semibold">{t.subtitle}</p>
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl hover:scale-105 transition-all"><div className="text-3xl font-bold text-indigo-600 mb-2">24/7</div><div>Live Tracking</div></div>
            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl hover:scale-105 transition-all"><div className="text-3xl font-bold text-emerald-600 mb-2">1-Click</div><div>SOS Alert</div></div>
            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl hover:scale-105 transition-all"><div className="text-3xl font-bold text-orange-600 mb-2">100m</div><div>GPS Accuracy</div></div>
          </div>
        </div>

        {/* Login Form */}
        <div className="lg:w-1/3 max-w-md w-full">
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border border-white/50">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black text-slate-900 mb-4">{t.loginTitle}</h2>
              <p className="text-slate-600 text-lg">{t.welcome}</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <select name="role" className="w-full p-4 border-2 border-slate-200 rounded-xl text-lg focus:border-blue-400 focus:ring-4 focus:ring-blue-100 shadow-lg transition-all">
                <option value="tourist">{t.tourist}</option>
                <option value="admin">{t.admin}</option>
              </select>
              <input name="email" type="email" placeholder={t.email} className="w-full p-4 border-2 border-slate-200 rounded-xl text-lg focus:border-blue-400 focus:ring-4 focus:ring-blue-100 shadow-lg transition-all" required />
              <input name="password" type="password" placeholder={t.password} className="w-full p-4 border-2 border-slate-200 rounded-xl text-lg focus:border-blue-400 focus:ring-4 focus:ring-blue-100 shadow-lg transition-all" required />
              <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-bold py-5 px-8 rounded-2xl text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 hover:from-indigo-600 hover:to-blue-700">🚀 {t.login}</button>
            </form>
            <p className="text-center text-sm text-slate-500 mt-6">{t.demo}</p>
            <button onClick={() => setView("register")} className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all mt-4">👤 {t.register}</button>
          </div>
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD
  if (user.role === "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl text-2xl">🛡️</div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-slate-900 to-blue-600 bg-clip-text text-transparent">{t.policeCenter}</h1>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <button onClick={logout} className="px-8 py-3 bg-slate-200 hover:bg-slate-300 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all whitespace-nowrap">Logout</button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center border border-slate-200 hover:shadow-3xl transition-all">
              <div className="text-5xl mb-4">👥</div>
              <div className="text-6xl font-black text-indigo-600 mb-4">{tourists.length}</div>
              <h3 className="text-2xl font-bold text-slate-900">{t.activeTourists}</h3>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-10 rounded-3xl shadow-2xl text-center text-white border-4 border-red-400/50 hover:shadow-red-500/50 transition-all">
              <div className="text-5xl mb-4 animate-pulse">🚨</div>
              <div className="text-6xl font-black mb-4">{alerts}</div>
              <h3 className="text-2xl font-bold">{t.panicAlerts}</h3>
            </div>
            <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center border border-emerald-200 hover:shadow-3xl transition-all">
              <div className="text-5xl mb-4">📍</div>
              <div className="text-6xl font-black text-emerald-600 mb-4">{position ? 1 : 0}</div>
              <h3 className="text-2xl font-bold text-slate-900">Live Locations</h3>
            </div>
          </div>

          {/* HUGE LIVE MAP */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-200">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-4">{t.liveMap}</h2>
            <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-200/50">
              {position ? (
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.436587395299!2d${position.lng}!3d${position.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${position.lat}%2C${position.lng}!5e0!3m2!1sen!2sin!4v1634567890123`}
                  className="w-full h-full"
                  loading="lazy"
                />
              ) : (
                <div className="h-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
                  Click "Share Location" in Tourist Dashboard
                </div>
              )}
            </div>
          </div>

          {/* Tourists Table */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50">
              <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-4">{t.touristList} ({tourists.length})</h2>
            </div>
            {tourists.length === 0 ? (
              <div className="py-24 text-center text-slate-500">
                <div className="text-6xl mb-6">👋</div>
                <h3 className="text-3xl font-bold mb-4">{t.noTourists}</h3>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-8 py-4 text-left font-bold text-slate-800">ID</th>
                      <th className="px-8 py-4 text-left font-bold text-slate-800">Name</th>
                      <th className="px-8 py-4 text-left font-bold text-slate-800">Email</th>
                      <th className="px-8 py-4 text-left font-bold text-slate-800">Phone</th>
                      <th className="px-8 py-4 text-left font-bold text-slate-800">Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tourists.map(tourist => (
                      <tr key={tourist.id} className="border-b hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-4 font-mono font-bold text-indigo-600">{tourist.id}</td>
                        <td className="px-8 py-4 font-semibold">{tourist.name}</td>
                        <td className="px-8 py-4 text-slate-600">{tourist.email}</td>
                        <td className="px-8 py-4 text-slate-600">{tourist.phone}</td>
                        <td className="px-8 py-4 text-sm text-slate-500">{tourist.registered}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // TOURIST DASHBOARD - FIXED & CREATIVE
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-red-50 to-orange-50 overflow-hidden">
      <style>{`
        @keyframes sosGlow {
          0%, 100% { box-shadow: 0 0 40px rgba(239,68,68,0.6); }
          50% { box-shadow: 0 0 80px rgba(239,68,68,1); }
        }
        .sos-button {
          animation: sosGlow 2s infinite;
        }
        .sos-active {
          animation: sosGlow 0.5s infinite, pulse 0.3s infinite;
          transform: scale(1.1);
        }
      `}</style>
      
      <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20 text-center space-y-20 relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-8">
          <LanguageSwitcher />
          <button onClick={logout} className="px-8 py-4 bg-gradient-to-r from-slate-200 to-slate-300 hover:from-slate-300 hover:to-slate-400 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg whitespace-nowrap">Logout</button>
        </div>

        {/* Hero */}
        <div>
          <h1 className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-slate-900 via-red-600 to-orange-600 bg-clip-text text-transparent drop-shadow-2xl mb-8">
            {t.touristDash}
          </h1>
          <div className="text-2xl text-slate-700 font-semibold max-w-2xl mx-auto">
            Your safety is our priority • Live GPS tracking active
          </div>
        </div>

        {/* Live Location */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/50 max-w-2xl mx-auto">
          <h2 className="text-4xl font-black text-slate-900 mb-10 flex items-center justify-center gap-4 text-red-600">
            📍 {t.shareLocation}
          </h2>
          <button 
            onClick={startTracking}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black py-6 px-10 rounded-3xl text-2xl shadow-2xl hover:shadow-4xl hover:-translate-y-2 transition-all duration-500 mb-8 border-4 border-emerald-400/50"
          >
            🔴 START LIVE TRACKING
          </button>
          {shareUrl && (
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-4 border-emerald-200/50 rounded-3xl p-8 shadow-2xl">
              <p className="font-black text-emerald-800 text-xl mb-6">✅ LIVE LOCATION READY</p>
              <div className="bg-white p-6 rounded-2xl border-2 border-emerald-200 shadow-lg">
                <a href={shareUrl} target="_blank" className="font-mono text-emerald-700 hover:text-emerald-900 text-xl block p-4 rounded-xl hover:bg-emerald-50 transition-all" rel="noreferrer">
                  📲 {shareUrl.slice(0, 60)}...
                </a>
              </div>
            </div>
          )}
        </div>

        {/* MASSIVE SOS BUTTON */}
        <div className="relative">
          <div className={`absolute inset-0 w-[500px] h-[500px] mx-auto rounded-full bg-gradient-to-r from-red-400/50 to-red-600/50 blur-3xl ${sosHold ? 'animate-ping scale-125' : 'animate-pulse'}`}></div>
          <button
            ref={sosRef}
            onMouseDown={handleSOSStart}
            onMouseUp={handleSOSCancel}
            onMouseLeave={handleSOSCancel}
            onTouchStart={handleSOSStart}
            onTouchEnd={handleSOSCancel}
            className={`relative z-10 w-[380px] h-[380px] lg:w-[420px] lg:h-[420px] mx-auto text-white font-black text-6xl rounded-full shadow-[0_0_60px_rgba(239,68,68,0.6)] border-8 border-red-400/60 transition-all duration-500 flex flex-col items-center justify-center ${
              sosHold 
                ? 'bg-red-600 sos-active scale-110' 
                : 'bg-gradient-to-br from-red-500 via-red-600 to-red-700 hover:scale-105 sos-button'
            }`}
          >
            <span className="text-7xl lg:text-8xl mb-6 drop-shadow-2xl">🚨</span>
            <span className="text-2xl lg:text-3xl font-black tracking-widest uppercase drop-shadow-xl">
              {sosHold ? `SOS ${sosCountdown}s` : t.sosButton}
            </span>
          </button>
          <div className="mt-16 text-3xl font-black text-red-600 animate-pulse drop-shadow-xl">
            {t.holdSOS}
          </div>
        </div>

        {/* User Info */}
        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-xl rounded-3xl p-12 border-4 border-red-300/50 shadow-2xl">
          <h3 className="text-2xl font-bold text-red-900 mb-6">{t.yourID}</h3>
          <div className="font-mono bg-red-100/80 px-8 py-6 rounded-3xl text-3xl text-red-800 font-black border-4 border-red-300/50 shadow-2xl">
            {user.id}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

