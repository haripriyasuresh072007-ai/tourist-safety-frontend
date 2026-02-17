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
    touristDashboard: "உங்கள் பாதுகாப்பு இயக்குபலகை",
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

  // BLOCKCHAIN-STYLE PERMANENT STORAGE (unchanged)
  useEffect(() => {
    const saved = localStorage.getItem('safetravel_blockchain');
    if (saved) {
      const data = JSON.parse(saved);
      setTourists(data.tourists || []);
      setAlerts(data.alerts || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('safetravel_blockchain', JSON.stringify({ tourists, alerts, timestamp: Date.now() }));
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
    <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300">
      <span className="text-slate-700 font-semibold">🌐</span>
      <select 
        value={lang} 
        onChange={(e) => setLang(e.target.value)}
        className="bg-transparent border-none outline-none text-slate-800 font-semibold cursor-pointer hover:text-[#2563EB] transition-colors"
      >
        <option value="en">EN</option>
        <option value="ta">தமிழ்</option>
        <option value="hi">हिंदी</option>
      </select>
    </div>
  );

  // REGISTER PAGE - CLEAN LAYOUT
  if (showRegister) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-8 font-sans">
        <style jsx>{`
          .register-container {
            max-width: 480px;
            width: 100%;
            animation: slideUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        <div className="register-container bg-white/95 backdrop-blur-2xl shadow-2xl border border-white/70 rounded-3xl p-10 md:p-12">
          <div className="flex items-center justify-between mb-10">
            <LanguageSwitcher />
            <button onClick={() => setShowRegister(false)} className="text-2xl font-bold text-slate-600 hover:text-slate-900 transition-colors">
              {t.backToLogin}
            </button>
          </div>
          
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-white/50">
              <span className="text-2xl">📝</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 leading-tight">Register Tourist</h2>
            <p className="text-lg text-slate-600 font-medium max-w-md mx-auto">{t.registerSuccess}</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">{t.name}</label>
              <input
                type="text"
                value={registerForm.name}
                onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                required
                className="w-full px-5 py-4 text-lg border-2 border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100/50 shadow-lg hover:shadow-xl transition-all duration-300 placeholder-slate-400"
                placeholder="Enter full name"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">{t.email}</label>
              <input
                type="email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                required
                className="w-full px-5 py-4 text-lg border-2 border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100/50 shadow-lg hover:shadow-xl transition-all duration-300 placeholder-slate-400"
                placeholder="tourist@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">{t.phone}</label>
              <input
                type="tel"
                value={registerForm.phone}
                onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                required
                className="w-full px-5 py-4 text-lg border-2 border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100/50 shadow-lg hover:shadow-xl transition-all duration-300 placeholder-slate-400"
                placeholder="+91 98765 43210"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:scale-[0.98] text-white font-bold py-6 px-8 rounded-2xl text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-green-400/50"
            >
              {t.registerButton} 🔗
            </button>
          </form>

          <div className="text-center mt-10 pt-8 border-t-2 border-slate-100/50">
            <p className="text-sm text-slate-500">Data secured on Blockchain</p>
          </div>
        </div>
      </div>
    );
  }

  // CLEAN SPLIT-SCREEN LOGIN
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50 flex flex-col lg:flex-row font-['Inter',sans-serif]">
        <style jsx>{`
          .hero-section { 
            display: flex; 
            flex-direction: column; 
            justify-content: center; 
            padding: 3rem 2rem; 
          }
          .login-card { 
            max-width: 420px; 
            margin: 0 auto; 
            animation: fadeInUp 0.8s ease-out; 
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (max-width: 1024px) {
            .hero-section { order: 2; padding: 2rem 1.5rem; }
            .login-section { order: 1; padding: 2rem 1rem; }
          }
        `}</style>
        
        {/* HERO SECTION */}
        <div className="lg:w-1/2 hero-section lg:order-1 order-2 relative overflow-hidden">
          <LanguageSwitcher />
          <div className="max-w-lg mx-auto lg:ml-0 mt-8 lg:mt-0 space-y-8">
            <div className="w-24 h-24 bg-gradient-to-r from-[#2563EB] via-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/30 mx-auto lg:mx-0">
              <span className="text-3xl">🛡️</span>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-slate-900 via-gray-800 to-[#2563EB] bg-clip-text text-transparent leading-tight">
                {t.appTitle}
              </h1>
              <p className="text-xl lg:text-2xl text-slate-600 font-medium leading-relaxed max-w-md">
                {t.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="group p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-slate-200/60 hover:scale-105 hover:shadow-2xl transition-all duration-300 text-center">
                <div className="text-3xl font-black text-[#2563EB] mb-2 group-hover:scale-110 transition-transform">24/7</div>
                <div className="text-slate-700 font-semibold text-sm">{t.liveLocations}</div>
              </div>
              <div className="group p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-slate-200/60 hover:scale-105 hover:shadow-2xl transition-all duration-300 text-center">
                <div className="text-3xl font-black text-emerald-600 mb-2 group-hover:scale-110 transition-transform">1-Click</div>
                <div className="text-slate-700 font-semibold text-sm">SOS Alert</div>
              </div>
              <div className="group p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-slate-200/60 hover:scale-105 hover:shadow-2xl transition-all duration-300 text-center">
                <div className="text-3xl font-black text-orange-600 mb-2 group-hover:scale-110 transition-transform">Live GPS</div>
                <div className="text-slate-700 font-semibold text-sm">{t.liveLocationMap}</div>
              </div>
            </div>
          </div>
        </div>

        {/* LOGIN CARD */}
        <div className="lg:w-1/2 flex items-center justify-center lg:order-2 login-section order-1 p-8 lg:p-12">
          <div className="login-card bg-white/95 backdrop-blur-2xl shadow-2xl border border-white/70 rounded-3xl p-10 lg:p-12">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-r from-[#2563EB] to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl border-4 border-white/40">
                <span className="text-2xl">🔐</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 leading-tight">{t.welcomeBack}</h2>
              <p className="text-lg text-slate-600 font-medium">{t.signIn}</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const email = formData.get('email');
              const password = formData.get('password');
              if (handleLogin(email, password)) return;
              alert(`❌ ${t.demoInfo}`);
            }}>
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700">{t.role}</label>
                <select name="role" className="w-full px-5 py-4 text-lg border-2 border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <option value="tourist">👤 Tourist</option>
                  <option value="admin">🛡️ Police Admin</option>
                </select>
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700">{t.email}</label>
                <input name="email" type="email" required placeholder="admin@police.gov" className="w-full px-5 py-4 text-lg border-2 border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-300 placeholder-slate-400" />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700">{t.password}</label>
                <input name="password" type="password" required placeholder="••••••••" className="w-full px-5 py-4 text-lg border-2 border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-300 placeholder-slate-400" />
              </div>

              <div className="pt-2">
                <a href="#" className="block text-right text-sm text-[#2563EB] hover:text-blue-700 font-semibold hover:underline transition-all">{t.forgotPassword}</a>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-[#2563EB] to-blue-600 hover:from-blue-600 hover:to-blue-700 active:scale-[0.98] text-white font-black py-6 px-8 rounded-2xl text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-blue-300/50">
                {t.loginButton} →
              </button>
            </form>

            <div className="text-center mt-10 pt-8 border-t-2 border-slate-100/50 space-y-3">
              <p className="text-sm text-slate-600 font-medium">{t.createAccount}</p>
              <button onClick={() => setShowRegister(true)} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 border border-green-400/50">
                {t.registerButton}
              </button>
            </div>

            <div className="text-center mt-8 pt-6 border-t border-slate-100/50">
              <p className="text-xs text-slate-500 font-medium">© 2026 {t.appTitle} • All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CLEAN ADMIN DASHBOARD - HUGE MAP
  if (user.role === "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50">
        <style jsx>{`
          .dashboard-header {
            position: sticky;
            top: 0;
            z-index: 50;
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.95);
          }
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
          }
          .map-section {
            grid-column: 1 / -1;
            height: 650px;
            margin: 4rem 0;
          }
          .table-section {
            max-height: 600px;
            overflow-y: auto;
          }
          @media (max-width: 1024px) {
            .map-section { height: 500px; margin: 2rem 0; }
          }
        `}</style>
        
        <header className="dashboard-header shadow-xl border-b border-slate-200/50">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-r from-[#2563EB] to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/50">
                  🛡️
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-slate-900 to-[#2563EB] bg-clip-text text-transparent">
                    {t.policeCommandCenter}
                  </h1>
                  <p className="text-slate-600 font-semibold text-lg mt-1">Immutable Blockchain Registry</p>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <LanguageSwitcher />
                <button onClick={() => setUser(null)} className="px-8 py-4 bg-slate-100 hover:bg-slate-200 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 whitespace-nowrap">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20 space-y-16">
          {/* PERFECTLY SPACED STATS */}
          <section className="stats-grid">
            <div className="group p-12 rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl border border-slate-200/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 text-center">
              <div className="text-5xl mb-6">👥</div>
              <div className="text-6xl lg:text-7xl font-black text-[#2563EB] mb-4 group-hover:scale-110 transition-transform">{tourists.length}</div>
              <h3 className="text-2xl font-black text-slate-900">{t.activeTourists}</h3>
            </div>
            
            <div className="group p-12 rounded-3xl bg-gradient-to-br from-red-500/95 to-red-600/95 backdrop-blur-xl shadow-2xl border-4 border-red-400/50 text-white hover:shadow-[0_0_60px_rgba(239,68,68,0.4)] transition-all duration-500 hover:scale-[1.02] text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-5xl mb-6 relative z-10 animate-pulse">🚨</div>
              <div className="text-6xl lg:text-7xl font-black mb-4 relative z-10 group-hover:scale-110 transition-transform">{alerts}</div>
              <h3 className="text-2xl font-black relative z-10">{t.panicAlerts}</h3>
            </div>
            
            <div className="group p-12 rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl border border-emerald-200/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 text-center">
              <div className="text-5xl mb-6">⛓️</div>
              <div className="text-6xl lg:text-7xl font-black text-emerald-600 mb-4 group-hover:scale-110 transition-transform">{tourists.length}</div>
              <h3 className="text-2xl font-black text-slate-900">Blockchain Records</h3>
            </div>
          </section>

          {/* HUGE MAP SECTION */}
          <section className="map-section bg-white/90 backdrop-blur-2xl rounded-4xl shadow-3xl border-4 border-slate-200/50 p-8">
            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-slate-100">
              <h2 className="text-4xl font-black bg-gradient-to-r from-slate-900 to-[#2563EB] bg-clip-text text-transparent flex items-center gap-4">
                {t.liveLocationMap}
              </h2>
              <div className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm rounded-2xl border border-blue-300/50 text-blue-800 font-bold text-lg">
                Ranipet District Coverage
              </div>
            </div>
            {position ? (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15585.70012874812!2d79.1643633172324!3d12.95427799078565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU3JzEzLjIiTiA3OOCowMTAnMTIuMiJF!5e0!3m2!1sen!2sin!4v1700000000000"
                className="w-full h-full rounded-3xl shadow-2xl border-4 border-blue-200/50 !min-h-[600px]"
                style={{ minHeight: '600px', borderRadius: '1.5rem' }}
                allowFullScreen=""
                loading="lazy"
              />
            ) : (
              <div className="h-full min-h-[600px] bg-gradient-to-br from-blue-400/80 to-indigo-500/80 rounded-3xl flex items-center justify-center text-white text-2xl font-bold shadow-2xl border-4 border-dashed border-blue-300/50 backdrop-blur-xl">
                <div className="text-center p-12">
                  <div className="text-6xl mb-6 animate-bounce">📍</div>
                  <p className="text-2xl mb-4">Activate Live Tracking</p>
                  <p className="text-lg opacity-90">Click "Share Location" from Tourist Dashboard</p>
                </div>
              </div>
            )}
          </section>

          {/* CLEAN BLOCKCHAIN TABLE */}
          <section className="table-section bg-white/90 backdrop-blur-2xl rounded-4xl shadow-3xl border-4 border-blue-200/50 overflow-hidden">
            <div className="p-10 lg:p-12 border-b-4 border-gradient-to-r from-blue-500/30 to-indigo-500/30 bg-gradient-to-r from-slate-50/80 to-blue-50/50 backdrop-blur-xl">
              <h2 className="text-4xl font-black bg-gradient-to-r from-slate-900 via-blue-900 to-[#2563EB] bg-clip-text text-transparent flex items-center gap-4 mb-3">
                ⛓️ {t.registeredTourists}
              </h2>
              <p className="text-blue-700 font-semibold text-xl">({tourists.length}) Immutable Records</p>
            </div>
            
            {tourists.length === 0 ? (
              <div className="py-32 text-center">
                <div className="text-8xl mb-8 animate-bounce opacity-60">👋</div>
                <h3 className="text-4xl font-black text-slate-400 mb-4">{t.noTourists}</h3>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto">Register tourists via the login page to populate the blockchain registry</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 backdrop-blur-sm sticky top-0">
                    <tr>
                      <th className="px-8 py-6 text-left text-slate-800 font-black text-xl border-t-0">🆔 ID</th>
                      <th className="px-8 py-6 text-left text-slate-800 font-black text-xl border-t-0">👤 Name</th>
                      <th className="px-8 py-6 text-left text-slate-800 font-black text-xl border-t-0">📧 Email</th>
                      <th className="px-8 py-6 text-left text-slate-800 font-black text-xl border-t-0">📱 Phone</th>
                      <th className="px-8 py-6 text-left text-slate-800 font-black text-xl border-t-0">⛓️ Hash</th>
                      <th className="px-8 py-6 text-left text-slate-800 font-black text-xl border-t-0">✅ Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tourists.map((tourist, index) => (
                      <tr key={tourist.id} className="hover:bg-white/50 transition-all border-b-2 border-slate-100/50 hover:border-blue-200/50 group">
                        <td className="px-8 py-8 font-mono font-black text-lg text-[#2563EB] bg-gradient-to-r from-blue-100/50 to-blue-200/50 rounded-2xl group-hover:from-blue-200/70">{tourist.id}</td>
                        <td className="px-8 py-8 font-bold text-2xl text-slate-900">{tourist.name}</td>
                        <td className="px-8 py-8 font-mono text-xl text-slate-700">{tourist.email}</td>
                        <td className="px-8 py-8 font-mono text-xl text-slate-700">{tourist.phone}</td>
                        <td className="px-8 py-8">
                          <span className="font-mono text-emerald-700 text-lg bg-emerald-100/80 px-4 py-2 rounded-full border-2 border-emerald-200/50">{tourist.blockchainHash}</span>
                        </td>
                        <td className="px-8 py-8">
                          <span className="inline-block px-8 py-4 bg-emerald-100/80 text-emerald-800 font-black text-xl rounded-2xl border-4 border-emerald-200/50 shadow-lg">✓ {tourist.status}</span>
                        </td>
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

  // TOURIST DASHBOARD - CLEAN LAYOUT
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/80 via-red-50/50 to-blue-50/80 py-20 px-6 lg:px-12">
      <style jsx>{`
        .sos-glow {
          box-shadow: 0 0 60px rgba(239, 68, 68, 0.4);
        }
        .sos-glow-active {
          box-shadow: 0 0 120px rgba(239, 68, 68, 0.8);
        }
        @keyframes sosPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
      
      <div className="max-w-4xl mx-auto space-y-20 text-center">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-8 pb-16">
          <LanguageSwitcher />
          <button onClick={() => setUser(null)} className="px-10 py-5 bg-gradient-to-r from-slate-200 to-slate-300 hover:from-slate-300 hover:to-slate-400 font-black text-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-slate-200/50 lg:ml-auto">
            Sign Out →
          </button>
        </div>

        {/* MAIN TITLE */}
        <h1 className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-slate-900 via-red-600 to-[#2563EB] bg-clip-text text-transparent drop-shadow-2xl leading-tight">
          {t.touristDashboard}
        </h1>

        {/* LOCATION SECTION */}
        <div className="bg-white/95 backdrop-blur-2xl rounded-4xl shadow-3xl border border-white/50 p-12 lg:p-16 max-w-2xl mx-auto">
          <h2 className="text-4xl font-black text-slate-900 mb-12 flex items-center justify-center gap-4">
            📍 {t.shareLocation}
          </h2>
          <button 
            onClick={startLocationWatch}
            className="w-full bg-gradient-to-r from-[#2563EB] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-black py-8 px-10 rounded-3xl text-2xl shadow-3xl hover:shadow-4xl hover:-translate-y-3 transition-all duration-500 border-4 border-blue-300/50 mb-12 block mx-auto"
          >
            {t.getLiveLocation}
          </button>
          {shareUrl && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-4 border-blue-200/50 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
              <p className="font-black text-blue-900 text-2xl mb-6 flex items-center justify-center gap-3">
                ✅ Share with Police:
              </p>
              <div className="bg-white/90 p-6 rounded-3xl border-2 border-blue-200/50 backdrop-blur-xl">
                <a href={shareUrl} target="_blank" className="font-mono text-blue-800 hover:text-blue-900 text-xl block truncate lg:block lg:truncate-none p-4 rounded-2xl hover:bg-blue-50 transition-colors" rel="noreferrer">
                  📱 {shareUrl}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* MASSIVE RED SOS BUTTON */}
        <div className="relative group pt-20 pb-32">
          <div className={`absolute inset-0 w-[500px] h-[500px] mx-auto bg-gradient-to-r from-red-400/40 to-red-500/40 rounded-full blur-3xl ${panicHold ? 'animate-ping' : 'animate-pulse'} group-hover:scale-110 transition-all duration-1000`}></div>
          <button
            onMouseDown={startPanicHold}
            onMouseUp={cancelPanicHold}
            onMouseLeave={cancelPanicHold}
            onTouchStart={startPanicHold}
            onTouchEnd={cancelPanicHold}
            className={`relative z-20 w-[420px] h-[420px] mx-auto lg:w-[500px] lg:h-[500px] text-6xl font-black shadow-[0_35px_80px_-20px_rgba(239,68,68,0.6)] border-12 border-red-400/60 rounded-full transition-all duration-700 flex flex-col items-center justify-center mx-auto ${sosGlow} ${
              panicHold
                ? 'bg-red-600 scale-110 animate-sosPulse sos-glow-active border-red-500/90'
                : 'bg-gradient-to-br from-red-500 via-red-600 to-red-700 hover:scale-[1.08] hover:shadow-[0_0_120px_rgba(239,68,68,0.8)] hover:border-red-500/90 sos-glow'
            } text-white drop-shadow-4xl backdrop-blur-xl`}
          >
            <span className="text-8xl lg:text-9xl mb-8 drop-shadow-2xl">🚨</span>
            <span className="text-4xl lg:text-5xl tracking-widest font-black drop-shadow-2xl uppercase">
              {panicHold ? 'HOLDING... 3s' : t.emergencyPanicButton}
            </span>
            {panicHold && <span className="text-2xl mt-6 animate-ping tracking-wider font-black drop-shadow-lg">SOS ACTIVATING!</span>}
          </button>
          <div className="mt-16 text-3xl lg:text-4xl font-black text-red-600 animate-pulse drop-shadow-2xl tracking-wider">
            {t.hold3Seconds}
          </div>
        </div>

        {/* USER INFO */}
        <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 backdrop-blur-xl rounded-4xl border-4 border-red-300/50 p-12 shadow-3xl max-w-2xl mx-auto">
          <p className="text-2xl font-black text-red-900">
            Your Blockchain ID: <span className="font-mono bg-red-100/80 px-8 py-4 rounded-3xl text-3xl text-red-800 border-4 border-red-300/50 shadow-2xl block mt-4">{user.id}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;


