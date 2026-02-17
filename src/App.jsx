import React, { useState, useEffect } from "react";

const translations = {
  en: {
    appTitle: "Smart Tourist Safety System",
    subtitle: "Your safety companion while travelling",
    loginTitle: "Welcome Back",
    welcomeBack: "Welcome Back",
    signIn: "Sign in to your account",
    role: "Role",
    email: "Email Address",
    password: "Password",
    name: "Full Name",
    phone: "Phone Number",
    loginButton: "Sign In Securely",
    registerButton: "Register Now",
    forgotPassword: "Forgot Password?",
    createAccount: "Don't have an account?",
    policeCommandCenter: "Police Command Center",
    touristDashboard: "Your Safety Dashboard",
    activeTourists: "Active Tourists",
    panicAlerts: "Panic Alerts",
    liveLocations: "Live Locations",
    liveLocationMap: "🗺️ Live Location Map",
    registeredTourists: "Registered Tourists (Blockchain)",
    shareLocation: "Share Location",
    getLiveLocation: "Get Live Location",
    emergencyPanicButton: "🚨 EMERGENCY SOS",
    hold3Seconds: "Hold 3 seconds to activate SOS",
    demoInfo: "admin@police.gov / 123456",
    noTourists: "No tourists registered yet",
    touristRegistered: "✅ Tourist registered on Blockchain!\nID: ",
    registerSuccess: "Registration successful!",
    backToLogin: "← Back to Login"
  },
  ta: {
    appTitle: "சமார்ட் சுற்றுலா பாதுகாப்பு அமைப்பு",
    subtitle: "பயணத்தின்போது உங்கள் பாதுகாப்பு துணைவர்",
    loginTitle: "மீண்டும் வரவேற்கிறோம்",
    welcomeBack: "மீண்டும் வரவேற்கிறோம்",
    signIn: "உங்கள் கணக்கில் உள்நுழையவும்",
    role: "பாத்திரம்",
    email: "மின்னஞ்சல் முகவரி",
    password: "கடவுச்சொல்",
    name: "முழு பெயர்",
    phone: "தொலைபேசி எண்",
    loginButton: "பாதுகாப்பாக உள்நுழையவும்",
    registerButton: "இப்போது பதிவு செய்யவும்",
    forgotPassword: "கடவுச்சொல்லை மறந்துவிட்டீர்களா?",
    createAccount: "கணக்கு இல்லையா?",
    policeCommandCenter: "காவல் தலைமையகம்",
    touristDashboard: "உங்கள் பாதுகா ப்பு இயக்குபலகை",
    activeTourists: "திறமையான சுற்றுலாப் பயணிகள்",
    panicAlerts: "அவசர எச்சரிக்கைகள்",
    liveLocations: "நேரடி இடங்கள்",
    liveLocationMap: "🗺️ நேரடி இருப்பிட வரைபடம்",
    registeredTourists: "பதிவு செய்யப்பட்ட சுற்றுலாப் பயணிகள் (பிளாக்செயின்)",
    shareLocation: "இருப்பிடத்தைப் பகிரவும்",
    getLiveLocation: "நேரடி இருப்பிடத்தைப் பெறவும்",
    emergencyPanicButton: "🚨 அவசர உதவி",
    hold3Seconds: "SOS செயல்படுத்த 3 வினாடிகள் காத்திருக்கவும்",
    demoInfo: "admin@police.gov / 123456",
    noTourists: "இதுவரை சுற்றுலாப் பயணிகள் இல்லை",
    touristRegistered: "✅ பிளாக்செயினில் சுற்றுலா பயணி பதிவு!\nID: ",
    registerSuccess: "பதிவு வெற்றிகரமாக முடிந்தது!",
    backToLogin: "← உள்நுழைவுக்கு"
  },
  hi: {
    appTitle: "स्मार्ट पर्यटक सुरक्षा प्रणाली",
    subtitle: "यात्रा के दौरान आपका सुरक्षा सहायक",
    loginTitle: "स्वागत है",
    welcomeBack: "स्वागत है वापस",
    signIn: "अपने खाते में साइन इन करें",
    role: "भूमिका",
    email: "ईमेल पता",
    password: "पासवर्ड",
    name: "पूरा नाम",
    phone: "फ़ोन नंबर",
    loginButton: "सुरक्षित रूप से साइन इन करें",
    registerButton: "अभी रजिस्टर करें",
    forgotPassword: "पासवर्ड भूल गए?",
    createAccount: "खाता नहीं है?",
    policeCommandCenter: "पुलिस कमांड सेंटर",
    touristDashboard: "आपका सुरक्षा डैशबोर्ड",
    activeTourists: "सक्रिय पर्यटक",
    panicAlerts: "पैनिक अलर्ट",
    liveLocations: "लाइव स्थान",
    liveLocationMap: "🗺️ लाइव लोकेशन मैप",
    registeredTourists: "पंजीकृत पर्यटक (ब्लॉकचेन)",
    shareLocation: "स्थान साझा करें",
    getLiveLocation: "लाइव लोकेशन प्राप्त करें",
    emergencyPanicButton: "🚨 आपातकालीन SOS",
    hold3Seconds: "SOS के लिए 3 सेकंड होल्ड करें",
    demoInfo: "admin@police.gov / 123456",
    noTourists: "अभी तक कोई पर्यटक पंजीकृत नहीं",
    touristRegistered: "✅ ब्लॉकचेन पर पर्यटक पंजीकृत!\nID: ",
    registerSuccess: "पंजीकरण सफल!",
    backToLogin: "← लॉगिन पर वापस"
  }
};

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
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", phone: "" });

  const t = translations[lang];

  // BLOCKCHAIN-STYLE PERMANENT STORAGE (Multiple storage layers)
  useEffect(() => {
    // Load from localStorage (primary)
    const saved = localStorage.getItem('safetravel_blockchain');
    if (saved) {
      const data = JSON.parse(saved);
      setTourists(data.tourists || []);
      setAlerts(data.alerts || 0);
    }
    
    // Load from IndexedDB (permanent backup)
    if ('indexedDB' in window) {
      const request = indexedDB.open('SafeTravelDB', 1);
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(['blockchain'], 'readonly');
        const store = transaction.objectStore('blockchain');
        const getAll = store.getAll();
        getAll.onsuccess = () => {
          if (getAll.result && getAll.result.length > 0) {
            const blockchainData = getAll.result[0];
            setTourists(blockchainData.tourists || []);
            setAlerts(blockchainData.alerts || 0);
          }
        };
      };
    }
  }, []);

  // Save to MULTIPLE storage layers (BLOCKCHAIN simulation)
  useEffect(() => {
    // 1. localStorage (immediate)
    localStorage.setItem('safetravel_blockchain', JSON.stringify({ tourists, alerts, timestamp: Date.now() }));
    
    // 2. IndexedDB (permanent)
    if ('indexedDB' in window) {
      const request = indexedDB.open('SafeTravelDB', 1);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('blockchain')) {
          db.createObjectStore('blockchain', { keyPath: 'id' });
        }
      };
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(['blockchain'], 'readwrite');
        const store = transaction.objectStore('blockchain');
        store.put({ id: 1, tourists, alerts, timestamp: Date.now() });
      };
    }
  }, [tourists, alerts]);

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

  const handleRegister = (e) => {
    e.preventDefault();
    const id = `TRV${(tourists.length + 1).toString().padStart(4, "0")}-B${Date.now().toString().slice(-6)}`;
    const newTourist = { 
      id, 
      ...registerForm, 
      registeredAt: new Date().toLocaleString(),
      blockchainHash: `0x${Math.random().toString(16).slice(2, 10)}`,
      status: "verified"
    };
    setTourists(prev => [...prev, newTourist]);
    alert(`${t.touristRegistered}${id}`);
    setRegisterForm({ name: "", email: "", phone: "" });
    setShowRegister(false);
  };

  const triggerPanic = () => {
    setAlerts(a => a + 1);
    alert("🚨 SOS ACTIVATED! Police dispatched to your location!");
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

  const LanguageSwitcher = () => (
    <div className="flex items-center gap-2 p-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50">
      <span className="text-slate-700 font-semibold text-sm">🌐</span>
      <select 
        value={lang} 
        onChange={(e) => setLang(e.target.value)}
        className="bg-transparent border-none outline-none text-slate-800 font-semibold text-sm cursor-pointer hover:text-[#2563EB]"
      >
        <option value="en">EN</option>
        <option value="ta">தமிழ்</option>
        <option value="hi">हिंदी</option>
      </select>
    </div>
  );

  // REGISTER PAGE
  if (showRegister) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-blue-50 to-[#f8fafc] flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-xl shadow-2xl border border-white/60 rounded-3xl p-12">
          <div className="flex items-center justify-between mb-12">
            <LanguageSwitcher />
            <button onClick={() => setShowRegister(false)} className="text-2xl font-bold text-slate-600 hover:text-slate-800">
              {t.backToLogin}
            </button>
          </div>
          
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl border-4 border-white/40">
              <span className="text-2xl">📝</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-3">Register Tourist</h2>
            <p className="text-lg text-slate-600">{t.registerSuccess}</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">{t.name}</label>
              <input
                type="text"
                value={registerForm.name}
                onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                required
                className="w-full px-5 py-4 text-lg border border-slate-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                placeholder="Enter full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">{t.email}</label>
              <input
                type="email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                required
                className="w-full px-5 py-4 text-lg border border-slate-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                placeholder="tourist@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">{t.phone}</label>
              <input
                type="tel"
                value={registerForm.phone}
                onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                required
                className="w-full px-5 py-4 text-lg border border-slate-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                placeholder="+91 98765 43210"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-5 px-6 rounded-2xl text-xl shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all duration-300"
            >
              {t.registerButton} 🔗
            </button>
          </form>
        </div>
      </div>
    );
  }

  // LOGIN PAGE
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-blue-50 to-[#f8fafc] flex flex-col lg:flex-row">
        <div className="lg:w-1/2 flex flex-col justify-center p-12 lg:p-24 order-2 lg:order-1 relative">
          <LanguageSwitcher />
          <div className="max-w-md mx-auto lg:mx-0 mt-8 lg:mt-0">
            <div className="w-20 h-20 bg-gradient-to-r from-[#2563EB] to-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl">
              <span className="text-2xl">🛡️</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-slate-800 to-[#2563EB] bg-clip-text text-transparent mb-6">
              {t.appTitle}
            </h1>
            <p className="text-xl text-slate-600 mb-8">{t.subtitle}</p>
            <div className="grid grid-cols-3 gap-4 text-sm mb-12">
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl text-center border border-slate-200/50 hover:scale-105 transition-all">
                <div className="text-2xl font-bold text-[#2563EB]">24/7</div>
                <div className="text-slate-700 font-medium">{t.liveLocations}</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl text-center border border-slate-200/50 hover:scale-105 transition-all">
                <div className="text-2xl font-bold text-green-600">1-Click</div>
                <div className="text-slate-700 font-medium">SOS Alert</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl text-center border border-slate-200/50 hover:scale-105 transition-all">
                <div className="text-2xl font-bold text-orange-600">Live GPS</div>
                <div className="text-slate-700 font-medium">{t.liveLocationMap}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12 order-1 lg:order-2">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-xl shadow-2xl border border-white/60 rounded-3xl p-12">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-gradient-to-r from-[#2563EB] to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                <span className="text-xl">🔐</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">{t.loginTitle}</h2>
              <p className="text-lg text-slate-600">{t.signIn}</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const email = formData.get('email');
              const password = formData.get('password');
              if (handleLogin(email, password)) return;
              alert(`❌ ${t.demoInfo}`);
            }}>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">{t.role}</label>
                <select name="role" className="w-full px-5 py-4 text-lg border border-slate-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-[#2563EB]/20 focus:border-[#2563EB]">
                  <option value="tourist">👤 {t.roleTourist || 'Tourist'}</option>
                  <option value="admin">🛡️ {t.roleAdmin || 'Admin'}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">{t.email}</label>
                <input name="email" type="email" required placeholder="admin@police.gov" className="w-full px-5 py-4 text-lg border border-slate-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">{t.password}</label>
                <input name="password" type="password" required placeholder="••••••••" className="w-full px-5 py-4 text-lg border border-slate-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all" />
              </div>

              <div className="flex items-center justify-between text-sm pt-2">
                <a href="#" className="text-[#2563EB] hover:text-blue-700 font-semibold hover:underline">{t.forgotPassword}</a>
              </div>

              <button type="submit" className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-5 px-6 rounded-2xl text-xl shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all">
                {t.loginButton}
              </button>
            </form>

            <div className="text-center mt-8 pt-6 border-t border-slate-200/50 space-y-2">
              <p className="text-xs text-slate-500">{t.createAccount}</p>
              <button onClick={() => setShowRegister(true)} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-6 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all">
                {t.registerButton}
              </button>
            </div>

            <div className="text-center mt-6 pt-6 border-t border-slate-200/50">
              <p className="text-xs text-slate-500">© 2026 {t.appTitle}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD WITH BLOCKCHAIN DATA
  if (user.role === "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-2xl border-b border-white/50">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#2563EB] to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white/50">
                🛡️
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-900">{t.policeCommandCenter}</h1>
                <p className="text-slate-600 font-semibold">Blockchain Tourist Registry</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <button onClick={() => setUser(null)} className="px-8 py-3 bg-slate-200 hover:bg-slate-300 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
          <section className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center hover:scale-[1.02] transition-all border border-blue-200/50">
              <div className="text-4xl mb-4">👥</div>
              <div className="text-5xl font-black text-[#2563EB] mb-2">{tourists.length}</div>
              <h3 className="text-2xl font-bold text-slate-800">{t.activeTourists}</h3>
            </div>
            <div className="bg-gradient-to-br from-red-500/95 to-red-600/95 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center text-white hover:scale-[1.02] transition-all border-4 border-red-400/50">
              <div className="text-4xl mb-4">🚨</div>
              <div className="text-5xl font-black mb-2">{alerts}</div>
              <h3 className="text-2xl font-bold">{t.panicAlerts}</h3>
            </div>
            <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center hover:scale-[1.02] transition-all border border-green-200/50">
              <div className="text-4xl mb-4">⛓️</div>
              <div className="text-5xl font-black text-green-600 mb-2">{tourists.length}</div>
              <h3 className="text-2xl font-bold text-slate-800">Blockchain Records</h3>
            </div>
          </section>

          <section className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
              {t.liveLocationMap}
            </h2>
            {position ? (
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.436587395299!2d79.1717!3d12.9543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU3JzEzLjQiTiA3O8KwMTAnMTguNSJF!5e0!3m2!1sen!2sin!4v1634567890123`}
                className="w-full h-[500px] rounded-2xl border-4 border-blue-200/50 shadow-2xl"
              />
            ) : (
              <div className="h-[500px] bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold border-4 border-dashed border-blue-300/50">
                Click "Share Location" to activate live tracking
              </div>
            )}
          </section>

          <section className="bg-gradient-to-r from-slate-50 to-blue-50/30 backdrop-blur-xl rounded-3xl shadow-3xl border-4 border-blue-200/50 overflow-hidden">
            <div className="p-10 border-b-4 border-blue-200/50 bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
              <h2 className="text-4xl font-black bg-gradient-to-r from-slate-900 to-[#2563EB] bg-clip-text text-transparent flex items-center gap-4">
                ⛓️ {t.registeredTourists} ({tourists.length})
              </h2>
              <p className="text-blue-700 font-semibold mt-2">Immutable Blockchain Records</p>
            </div>
            {tourists.length === 0 ? (
              <div className="py-20 text-center text-slate-500">
                <div className="text-6xl mb-6 animate-bounce">👋</div>
                <h3 className="text-3xl font-bold mb-2">{t.noTourists}</h3>
                <p className="text-xl">Register first tourist via login page</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm">
                      <th className="px-10 py-8 text-left text-slate-800 font-black text-lg">🆔 ID</th>
                      <th className="px-10 py-8 text-left text-slate-800 font-black text-lg">👤 Name</th>
                      <th className="px-10 py-8 text-left text-slate-800 font-black text-lg">📧 Email</th>
                      <th className="px-10 py-8 text-left text-slate-800 font-black text-lg">📱 Phone</th>
                      <th className="px-10 py-8 text-left text-slate-800 font-black text-lg">⛓️ Hash</th>
                      <th className="px-10 py-8 text-left text-slate-800 font-black text-lg">✅ Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tourists.map((tourist) => (
                      <tr key={tourist.id} className="hover:bg-white/80 transition-all border-b-2 border-slate-100/50">
                        <td className="px-10 py-8 font-mono font-bold text-[#2563EB] text-lg bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl">{tourist.id}</td>
                        <td className="px-10 py-8 font-bold text-xl text-slate-900">{tourist.name}</td>
                        <td className="px-10 py-8 font-mono text-slate-700">{tourist.email}</td>
                        <td className="px-10 py-8 font-mono text-slate-700">{tourist.phone}</td>
                        <td className="px-10 py-8 font-mono text-green-600 text-sm bg-green-100 px-3 py-1 rounded-full">{tourist.blockchainHash}</td>
                        <td><span className="inline-block px-6 py-2 bg-green-100 text-green-800 font-bold rounded-full text-lg border-2 border-green-200">{tourist.status}</span></td>
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

  // TOURIST DASHBOARD WITH RED ROUND SOS
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-red-50/50 to-blue-50 p-12">
      <div className="max-w-2xl mx-auto space-y-12 text-center relative">
        <div className="flex justify-between items-center mb-12">
          <LanguageSwitcher />
          <button onClick={() => setUser(null)} className="px-8 py-4 bg-slate-200 hover:bg-slate-300 font-bold rounded-3xl shadow-2xl hover:shadow-3xl transition-all text-lg">
            Logout
          </button>
        </div>
        
        <h1 className="text-5xl font-black bg-gradient-to-r from-slate-800 via-red-600 to-[#2563EB] bg-clip-text text-transparent drop-shadow-2xl">
          {t.touristDashboard}
        </h1>
        
        <div className="bg-white/95 backdrop-blur-xl p-12 rounded-3xl shadow-3xl border border-white/50">
          <h2 className="text-4xl font-black text-slate-900 mb-12">{t.shareLocation}</h2>
          <button 
            onClick={startLocationWatch}
            className="w-full bg-gradient-to-r from-[#2563EB] to-blue-600 text-white font-bold py-6 px-8 rounded-3xl text-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all mb-12 border-4 border-blue-200/50"
          >
            📍 {t.getLiveLocation}
          </button>
          {shareUrl && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-4 border-blue-200/50 rounded-3xl p-8 shadow-2xl">
              <p className="font-black text-blue-800 text-2xl mb-4">✅ Share with Police:</p>
              <div className="bg-white p-4 rounded-2xl border-2 border-blue-200">
                <a href={shareUrl} target="_blank" className="font-mono text-blue-700 hover:text-blue-900 text-lg block truncate" rel="noreferrer">
                  {shareUrl}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* MASSIVE RED ROUND SOS BUTTON */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-red-400/30 to-red-600/30 rounded-3xl blur-xl animate-pulse group-hover:animate-ping"></div>
          <button
            onMouseDown={startPanicHold}
            onMouseUp={cancelPanicHold}
            onMouseLeave={cancelPanicHold}
            onTouchStart={startPanicHold}
            onTouchEnd={cancelPanicHold}
            className={`relative z-10 w-96 h-96 mx-auto text-5xl font-black shadow-[0_25px_50px_-12px_rgba(239,68,68,0.6)] border-12 border-red-400/50 rounded-full transition-all duration-500 flex flex-col items-center justify-center ${
              panicHold
                ? 'bg-red-600 scale-110 animate-ping shadow-[0_0_100px_rgba(239,68,68,0.8)] border-red-500/80'
                : 'bg-gradient-to-br from-red-500 via-red-600 to-red-700 hover:scale-105 hover:shadow-[0_0_80px_rgba(239,68,68,0.7)] hover:border-red-500/80'
            } text-white drop-shadow-2xl`}
          >
            <span className="text-6xl mb-4">🚨</span>
            <span className="text-3xl tracking-wider font-black drop-shadow-lg">
              {panicHold ? 'HOLDING...' : t.emergencyPanicButton}
            </span>
            {panicHold && <span className="text-xl mt-2 animate-ping">3s → SOS!</span>}
          </button>
          <div className="mt-12 text-2xl font-black text-red-600 animate-pulse drop-shadow-lg">
            {t.hold3Seconds}
          </div>
        </div>

        <div className="text-center p-8 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-3xl border-4 border-red-200/50">
          <p className="text-xl text-red-800 font-bold">Your ID: <span className="font-mono bg-red-100 px-4 py-2 rounded-2xl text-lg">{user.id}</span></p>
        </div>
      </div>
    </div>
  );
}

export default App;


