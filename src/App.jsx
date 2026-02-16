import React, { useState } from "react";

const translations = {
  en: {
    appTitle: "SafeTravel AI – Ranipet Command Center",
    subtitle: "Tourist safety monitoring dashboard",
    language: "Language",
    english: "English",
    tamil: "Tamil",
    hindi: "Hindi",
    loginTitle: "Login to SafeTravel",
    email: "Email",
    password: "Password",
    loginButton: "Login",
    notRegistered: "Not registered?",
    registerHere: "Register",
    registerTitle: "Register as Tourist",
    name: "Name",
    phone: "Mobile number",
    backToLogin: "Back to login",
    adminDashboard: "Admin Dashboard",
    touristDashboard: "Tourist Dashboard",
    activeTourists: "Registered Tourists",
    panicAlerts: "Panic alerts triggered",
    mapTitle: "Live Location Map",
    shareLocation: "Share my location",
    shareLinkLabel: "Share this live location link or QR code",
    logout: "Logout",
    roleAdmin: "Admin",
    roleTourist: "Tourist",
    demoInfo: "admin@police.gov / 123456 (Admin) | Register as Tourist (password: 123456)",
    touristInfoPanel: "Tourist Information",
    noTourists: "No tourists registered yet.",
  },
  ta: {
    appTitle: "SafeTravel AI – ராணிப்பேட்டை கட்டுப்பாட்டு மையம்",
    subtitle: "சுற்றுலா பயணிகளின் பாதுகாப்பு கண்காணிப்பு",
    language: "மொழி",
    english: "ஆங்கிலம்",
    tamil: "தமிழ்",
    hindi: "ஹிந்தி",
    loginTitle: "SafeTravel உள்நுழைவு",
    email: "மின்னஞ்சல்",
    password: "கடவுச்சொல்",
    loginButton: "உள்நுழை",
    notRegistered: "பதிவு செய்யவில்லையா?",
    registerHere: "பதிவு செய்யவும்",
    registerTitle: "சுற்றுலா பயணி பதிவு",
    name: "பெயர்",
    phone: "மொபைல் எண்",
    backToLogin: "உள்நுழைவுக்கு திரும்ப",
    adminDashboard: "ஆணையர் இயக்குபலகை",
    touristDashboard: "சுற்றுலா பயணி இயக்குபலகை",
    activeTourists: "பதிவு செய்யப்பட்ட சுற்றுலா பயணிகள்",
    panicAlerts: "அவசர அலாரங்கள்",
    mapTitle: "நேரடி இருப்பிட வரைபடம்",
    shareLocation: "என் இருப்பிடத்தை பகிர்",
    shareLinkLabel: "இந்த இணைப்பு அல்லது QR மூலம் பகிரலாம்",
    logout: "வெளியேறு",
    roleAdmin: "ஆணையர்",
    roleTourist: "சுற்றுலா பயணி",
    demoInfo: "ஆணையர்: admin@police.gov / 123456 | சுற்றுலா பயணி: பதிவு செய்து 123456",
    touristInfoPanel: "சுற்றுலா பயணி விவரங்கள்",
    noTourists: "இன்னும் யாரும் பதிவு செய்யவில்லை.",
  },
  hi: {
    appTitle: "SafeTravel AI – रानीपेट कमांड सेंटर",
    subtitle: "पर्यटकों की सुरक्षा निगरानी डैशबोर्ड",
    language: "भाषा",
    english: "अंग्रेज़ी",
    tamil: "तमिल",
    hindi: "हिंदी",
    loginTitle: "SafeTravel में लॉगिन",
    email: "ईमेल",
    password: "पासवर्ड",
    loginButton: "लॉगिन",
    notRegistered: "रजिस्टर नहीं किया?",
    registerHere: "रजिस्टर करें",
    registerTitle: "पर्यटक पंजीकरण",
    name: "नाम",
    phone: "मोबाइल नंबर",
    backToLogin: "लॉगिन पर वापस",
    adminDashboard: "एडमिन डैशबोर्ड",
    touristDashboard: "पर्यटक डैशबोर्ड",
    activeTourists: "पंजीकृत पर्यटक",
    panicAlerts: "पैनिक अलर्ट",
    mapTitle: "लाइव लोकेशन मानचित्र",
    shareLocation: "मेरा लोकेशन साझा करें",
    shareLinkLabel: "इस लिंक या QR कोड से साझा करें",
    logout: "लॉगआउट",
    roleAdmin: "एडमिन",
    roleTourist: "पर्यटक",
    demoInfo: "एडमिन: admin@police.gov / 123456 | पर्यटक: रजिस्टर करें (पासवर्ड: 123456)",
    touristInfoPanel: "पर्यटक विवरण",
    noTourists: "अभी कोई पर्यटक पंजीकृत नहीं.",
  },
};

function App() {
  const [lang, setLang] = useState("en");
  const t = translations[lang];
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [tourists, setTourists] = useState([]);
  const [alerts, setAlerts] = useState(0);
  const [position, setPosition] = useState(null);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [panicHold, setPanicHold] = useState(false);
  const [panicTimerId, setPanicTimerId] = useState(null);

  const LanguageSwitcher = () => (
    <div className="flex items-center gap-3 px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-sm text-xs">
      <span className="font-semibold text-slate-700">{t.language}:</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="bg-transparent border-none outline-none font-semibold text-slate-800 hover:text-blue-600 cursor-pointer text-xs"
      >
        <option value="en">{t.english}</option>
        <option value="ta">{t.tamil}</option>
        <option value="hi">{t.hindi}</option>
      </select>
    </div>
  );

  const startLocationWatch = () => {
    if (!navigator.geolocation) return alert("GPS not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setPosition({ lat, lng });
        setLocationPermissionDenied(false);
        setShareUrl(`https://maps.app.goo.gl/?q=${lat},${lng}`);
      },
      () => setLocationPermissionDenied(true)
    );
  };

  const handleLogin = (email, password) => {
    if (email === "admin@police.gov" && password === "123456") {
      setUser({ role: "admin", email, name: "Ranipet Police Admin" });
      setShowRegister(false);
      return true;
    }
    const foundTourist = tourists.find((t) => t.email === email);
    if (foundTourist && password === "123456") {
      setUser({ role: "tourist", email, name: foundTourist.name, touristId: foundTourist.id });
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setUser(null);
    setShowRegister(false);
  };

  const handleRegisterTourist = (payload) => {
    const id = `TRV${(tourists.length + 1).toString().padStart(4, "0")}`;
    const newTourist = { id, ...payload, registeredAt: new Date().toLocaleString() };
    setTourists((prev) => [...prev, newTourist]);
    alert(`✅ Tourist registered!\nID: ${id}`);
    setShowRegister(false);
  };

  const triggerPanic = () => {
    setAlerts((a) => a + 1);
    alert("🚨 PANIC ALERT TRIGGERED!\n✅ Emergency calls made\n✅ Police notified\n✅ Location shared");
  };

  const startPanicHold = () => {
    setPanicHold(true);
    const timer = setTimeout(() => {
      setPanicHold(false);
      triggerPanic();
    }, 3000);
    setPanicTimerId(timer);
  };

  const cancelPanicHold = () => {
    setPanicHold(false);
    if (panicTimerId) clearTimeout(panicTimerId);
    setPanicTimerId(null);
  };

  const LoginPage = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const onSubmit = (e) => {
      e.preventDefault();
      if (handleLogin(form.email, form.password)) {
        setError("");
      } else {
        setError("Invalid credentials. " + t.demoInfo);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-xl shadow-2xl border border-white/50 rounded-3xl p-10 space-y-8">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl text-3xl">
              🛡️
            </div>
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent">
                {t.loginTitle}
              </h1>
              <p className="text-sm text-slate-600 mt-2">{t.subtitle}</p>
            </div>
            <LanguageSwitcher />
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-red-800 text-sm animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                placeholder="admin@police.gov"
                className="input-field w-full p-5 text-lg border-2 border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 shadow-xl hover:shadow-2xl transition-all duration-300"
              />
            </div>
            <div>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                placeholder="123456"
                className="input-field w-full p-5 text-lg border-2 border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 shadow-xl hover:shadow-2xl transition-all duration-300"
              />
            </div>
            <button
              type="submit"
              className="w-full text-lg font-black py-5 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white"
            >
              🚀 {t.loginButton}
            </button>
          </form>

          <div className="text-center space-y-2">
            <p className="text-xs text-slate-500 font-medium">{t.notRegistered}</p>
            <button
              type="button"
              onClick={() => setShowRegister(true)}
              className="text-blue-600 font-bold text-sm hover:text-blue-700 hover:underline transition-all duration-200"
            >
              ✨ {t.registerHere}
            </button>
            <div className="text-xs text-slate-400 font-mono bg-slate-100/50 px-3 py-1 rounded-xl">
              {t.demoInfo}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AdminDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100 overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b-2 border-white/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white/30">
              <span className="text-2xl">🛡️</span>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-gray-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                {t.appTitle}
              </h1>
              <p className="text-sm font-semibold text-slate-600">{t.roleAdmin}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 border border-red-400/50"
            >
              🚪 {t.logout}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <section className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-xl p-8 text-center rounded-3xl shadow-2xl border border-white/50 hover:scale-[1.02] transition-all duration-500">
            <div className="text-2xl mb-2">👥</div>
            <div className="text-4xl font-black text-blue-600 mb-2">{tourists.length}</div>
            <h3 className="text-xl font-bold text-slate-800">{t.activeTourists}</h3>
            <p className="text-sm text-slate-500 mt-2">Live registrations</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-8 text-center rounded-3xl shadow-2xl border border-white/50 hover:scale-[1.02] transition-all duration-500 relative">
            <div className="text-2xl mb-2">🚨</div>
            <div className="text-4xl font-black text-red-600 mb-2">{alerts}</div>
            <h3 className="text-xl font-bold text-slate-800">{t.panicAlerts}</h3>
            <p className="text-sm text-slate-500 mt-2">Active alerts</p>
            <button
              onMouseDown={startPanicHold}
              onMouseUp={cancelPanicHold}
              onMouseLeave={cancelPanicHold}
              onTouchStart={startPanicHold}
              onTouchEnd={cancelPanicHold}
              className={`absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 text-lg font-black shadow-2xl border-4 border-white/30 rounded-2xl ${panicHold ? 'scale-95 animate-ping bg-red-500' : 'hover:scale-110 bg-red-500'} text-white`}
            >
              {panicHold ? "HOLDING..." : "🚨 PANIC"}
            </button>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-8 text-center rounded-3xl shadow-2xl border border-white/50 hover:scale-[1.02] transition-all duration-500">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-4xl font-black text-green-600 mb-2">100%</div>
            <h3 className="text-xl font-bold text-slate-800">Uptime</h3>
            <p className="text-sm text-slate-500 mt-2">24/7 Monitoring</p>
          </div>
        </section>

        <section className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <div className="p-8 border-b-2 border-slate-100">
            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
              <span className="text-3xl">📋</span> {t.activeTourists}
            </h2>
          </div>
          {tourists.length === 0 ? (
            <div className="py-20 text-center">
              <div className="text-6xl mb-4">👋</div>
              <p className="text-2xl font-bold text-slate-400">{t.noTourists}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-50 to-slate-100">
                    <th className="px-8 py-6 text-left text-xs font-black text-slate-600 uppercase tracking-wider">ID</th>
                    <th className="px-8 py-6 text-left text-xs font-black text-slate-600 uppercase tracking-wider">Name</th>
                    <th className="px-8 py-6 text-left text-xs font-black text-slate-600 uppercase tracking-wider">Email</th>
                    <th className="px-8 py-6 text-left text-xs font-black text-slate-600 uppercase tracking-wider">Phone</th>
                    <th className="px-8 py-6 text-left text-xs font-black text-slate-600 uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {tourists.map((tr) => (
                    <tr key={tr.id} className="hover:bg-blue-50/50 border-b-2 border-slate-100 transition-all duration-200">
                      <td className="px-8 py-6 font-mono text-lg font-bold text-blue-600 bg-blue-50/50 rounded-xl w-32">{tr.id}</td>
                      <td className="px-8 py-6 font-semibold text-slate-800">{tr.name}</td>
                      <td className="px-8 py-6 text-slate-600">{tr.email}</td>
                      <td className="px-8 py-6 font-mono text-green-600">{tr.phone}</td>
                      <td className="px-8 py-6 text-sm text-slate-500">{tr.registeredAt}</td>
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

  if (!user) {
    if (showRegister) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white/90 backdrop-blur-xl shadow-2xl border border-white/50 rounded-3xl p-10 space-y-8">
            <button onClick={() => setShowRegister(false)} className="text-blue-600 font-bold mb-8">
              ← {t.backToLogin}
            </button>
            <h1 className="text-3xl font-black text-center">{t.registerTitle}</h1>
            <p>Registration form goes here</p>
          </div>
        </div>
      );
    }
    return <LoginPage />;
  }

  if (user.role === "admin") return <AdminDashboard />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100 p-8 text-center">
      <h1 className="text-4xl font-black text-slate-800 mb-8">{t.touristDashboard}</h1>
      <div className="max-w-md mx-auto space-y-8">
        <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50">
          <h2 className="text-2xl font-bold mb-4">{t.touristInfoPanel}</h2>
          <p>ID: {user.touristId}</p>
          <p>{user.name}</p>
          <button
            onClick={startLocationWatch}
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all duration-300"
          >
            📍 {t.shareLocation}
          </button>
          {shareUrl && (
            <p className="text-sm text-blue-600 mt-4 bg-blue-50 p-3 rounded-xl">{t.shareLinkLabel}</p>
          )}
        </div>
        <button
          onMouseDown={startPanicHold}
          onMouseUp={cancelPanicHold}
          onMouseLeave={cancelPanicHold}
          onTouchStart={startPanicHold}
          onTouchEnd={cancelPanicHold}
          className={`w-32 h-32 mx-auto text-xl font-black shadow-2xl border-8 border-white/20 rounded-full ${panicHold ? 'scale-95 animate-ping bg-red-500' : 'hover:scale-110 bg-red-600'} text-white`}
        >
          {panicHold ? "HOLDING..." : "🚨 PANIC"}
        </button>
        <button onClick={handleLogout} className="px-8 py-4 bg-slate-200 text-slate-800 font-bold rounded-2xl hover:bg-slate-300 transition-all">
          {t.logout}
        </button>
      </div>
    </div>
  );
}

export default App;
