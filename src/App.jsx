// src/App.jsx
import React, { useState, useEffect } from "react";

// Simple multilingual dictionary
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
    simulateTourist: "Simulate new tourist",
    simulateAlert: "Simulate panic alert",
    logout: "Logout",
    roleAdmin: "Admin",
    roleTourist: "Tourist",
    demoInfo:
      "Use admin@police.gov / 123456 for Admin, or register as a tourist.",
    touristInfoPanel: "Tourist Information",
    noTourists: "No tourists registered yet.",
    shareExplanation:
      "This uses your browser location to show how live tracking works.",
  },
  ta: {
    appTitle: "SafeTravel AI – ராணிபேட்டை கட்டுப்பாட்டு மையம்",
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
    registerTitle: "சுற்றுலா பயணி பதிவேடு",
    name: "பெயர்",
    phone: "மொபைல் எண்",
    backToLogin: "உள்நுழைவு திரைக்கு திரும்ப",
    adminDashboard: "ஆணையர் டாஷ்போர்டு",
    touristDashboard: "சுற்றுலா பயணி டாஷ்போர்டு",
    activeTourists: "பதிவு செய்யப்பட்ட சுற்றுலா பயணிகள்",
    panicAlerts: "அலாரம் அழைப்புகள்",
    mapTitle: "நேரடி இருப்பிட வரைபடம்",
    shareLocation: "என் இருப்பிடத்தை பகிர்",
    simulateTourist: "புதிய சுற்றுலா பயணியை பதிவு செய்து காட்டு",
    simulateAlert: "அவசர அலாரம் சோதனை",
    logout: "வெளியேறு",
    roleAdmin: "ஆணையர்",
    roleTourist: "சுற்றுலா பயணி",
    demoInfo:
      "Admin: admin@police.gov / 123456. அல்லது சுற்றுலா பயணியாக பதிவு செய்யவும்.",
    touristInfoPanel: "சுற்றுலா பயணி விவரங்கள்",
    noTourists: "இன்னும் யாரும் பதிவு செய்யவில்லை.",
    shareExplanation:
      "உங்கள் உலாவி இருப்பிடத்தை பயன்படுத்தி நேரடி கண்காணிப்பு எப்படி இருக்கும் என்பதை இது விளக்குகிறது.",
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
    backToLogin: "लॉगिन पर वापस जाएँ",
    adminDashboard: "एडमिन डैशबोर्ड",
    touristDashboard: "पर्यटक डैशबोर्ड",
    activeTourists: "पंजीकृत पर्यटक",
    panicAlerts: "पैनिक अलर्ट",
    mapTitle: "लाइव लोकेशन मानचित्र",
    shareLocation: "मेरा लोकेशन साझा करें",
    simulateTourist: "नया पर्यटक जोड़ें (डेमो)",
    simulateAlert: "पैनिक अलर्ट (डेमो)",
    logout: "लॉगआउट",
    roleAdmin: "एडमिन",
    roleTourist: "पर्यटक",
    demoInfo:
      "Admin: admin@police.gov / 123456. या पर्यटक के रूप में रजिस्टर करें.",
    touristInfoPanel: "पर्यटक विवरण",
    noTourists: "अभी कोई पर्यटक पंजीकृत नहीं हैं.",
    shareExplanation:
      "यह आपका ब्राउज़र लोकेशन लेकर लाइव ट्रैकिंग कैसे काम करती है, यह दिखाता है.",
  },
};

function App() {
  // language state
  const [lang, setLang] = useState("en");
  const t = translations[lang];

  // auth state
  const [user, setUser] = useState(null); // {role: 'admin'|'tourist', name, email}
  const [showRegister, setShowRegister] = useState(false);

  // data
  const [tourists, setTourists] = useState([]); // stored tourists visible to admin
  const [alerts, setAlerts] = useState(0);

  // live location
  const [position, setPosition] = useState(null);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(
    false
  );

  // watch location when user clicks "Share my location"
  const startLocationWatch = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLocationPermissionDenied(false);
      },
      () => {
        setLocationPermissionDenied(true);
      }
    );
  };

  // simple login logic
  const handleLogin = (email, password) => {
    if (email === "admin@police.gov" && password === "123456") {
      setUser({ role: "admin", email, name: "Ranipet Police Admin" });
      setShowRegister(false);
      return true;
    }
    // allow tourist login if registered email exists
    const foundTourist = tourists.find((t) => t.email === email);
    if (foundTourist && password === "123456") {
      setUser({
        role: "tourist",
        email,
        name: foundTourist.name,
        touristId: foundTourist.id,
      });
      setShowRegister(false);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setUser(null);
    setShowRegister(false);
  };

  const handleRegisterTourist = (payload) => {
    const id = "TRV" + (tourists.length + 1).toString().padStart(4, "0");
    const newTourist = {
      id,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      registeredAt: new Date().toLocaleString(),
    };
    setTourists((prev) => [...prev, newTourist]);
    alert(`Tourist registered with ID: ${id}`);
    setShowRegister(false);
  };

  const simulateAlert = () => {
    setAlerts((a) => a + 1);
    alert("Panic alert triggered (demo). Admin can see counters update.");
  };

  // components:

  const LanguageSwitcher = () => (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-semibold text-slate-700">{t.language}:</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="border border-[#E5DEC5] rounded-2xl px-3 py-1 bg-[#FFFCF5] text-sm"
      >
        <option value="en">{t.english}</option>
        <option value="ta">{t.tamil}</option>
        <option value="hi">{t.hindi}</option>
      </select>
    </div>
  );

  const LoginPage = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const onSubmit = (e) => {
      e.preventDefault();
      const ok = handleLogin(form.email, form.password);
      if (!ok) {
        setError(t.demoInfo);
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FEF9E7] via-white to-slate-50 px-4">
        <div className="w-full max-w-md bg-white/95 border border-[#E5DEC5] rounded-3xl shadow-2xl p-8 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-extrabold text-blue-900">
                {t.loginTitle}
              </h1>
              <p className="text-xs text-slate-500 mt-1">{t.subtitle}</p>
            </div>
            <LanguageSwitcher />
          </div>

          {error && (
            <div className="rounded-2xl bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                {t.email}
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                required
                className="w-full rounded-2xl border border-[#E5DEC5] px-4 py-2 bg-[#FFFCF5] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="admin@police.gov"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                {t.password}
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                required
                className="w-full rounded-2xl border border-[#E5DEC5] px-4 py-2 bg-[#FFFCF5] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123456"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-blue-800 to-blue-500 text-white font-semibold py-2.5 shadow-md hover:shadow-lg transition"
            >
              {t.loginButton}
            </button>
          </form>

          <div className="text-center text-xs text-slate-600">
            {t.notRegistered}{" "}
            <button
              onClick={() => setShowRegister(true)}
              className="font-semibold text-blue-700 hover:underline"
            >
              {t.registerHere}
            </button>
          </div>
          <div className="text-[11px] text-slate-500 mt-2">{t.demoInfo}</div>
        </div>
      </div>
    );
  };

  const RegisterPage = () => {
    const [form, setForm] = useState({ name: "", email: "", phone: "" });

    const onSubmit = (e) => {
      e.preventDefault();
      handleRegisterTourist(form);
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FEF9E7] via-white to-slate-50 px-4">
        <div className="w-full max-w-md bg-white/95 border border-[#E5DEC5] rounded-3xl shadow-2xl p-8 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-extrabold text-blue-900">
                {t.registerTitle}
              </h1>
              <p className="text-xs text-slate-500 mt-1">{t.subtitle}</p>
            </div>
            <LanguageSwitcher />
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                {t.name}
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                required
                className="w-full rounded-2xl border border-[#E5DEC5] px-4 py-2 bg-[#FFFCF5] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tourist name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                {t.email}
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                required
                className="w-full rounded-2xl border border-[#E5DEC5] px-4 py-2 bg-[#FFFCF5] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="tourist@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                {t.phone}
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                required
                className="w-full rounded-2xl border border-[#E5DEC5] px-4 py-2 bg-[#FFFCF5] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+91 98765 43210"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-blue-800 to-blue-500 text-white font-semibold py-2.5 shadow-md hover:shadow-lg transition"
            >
              {t.registerTitle}
            </button>
          </form>

          <div className="text-center text-xs text-slate-600">
            <button
              onClick={() => setShowRegister(false)}
              className="font-semibold text-blue-700 hover:underline"
            >
              {t.backToLogin}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const LiveMapCard = () => {
    const defaultCenter = "13.1167,79.6500"; // Ranipet approx
    const center = position
      ? `${position.lat},${position.lng}`
      : defaultCenter;

    const mapsUrl = `https://www.google.com/maps?q=${center}&z=14&output=embed`;

    return (
      <div className="rounded-3xl bg-white/95 border border-[#E5DEC5] shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#F3EBD5] bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="font-semibold text-sm">{t.mapTitle}</div>
          <button
            onClick={startLocationWatch}
            className="text-xs bg-white/10 border border-white/30 rounded-2xl px-3 py-1 hover:bg-white/20"
          >
            {t.shareLocation}
          </button>
        </div>
        <div className="h-72">
          <iframe
            title="live-map"
            src={mapsUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
        <div className="px-5 py-3 text-[11px] text-slate-500">
          {locationPermissionDenied
            ? "Location access denied in browser – map shows district center."
            : t.shareExplanation}
        </div>
      </div>
    );
  };

  const AdminDashboard = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FEF9E7] via-white to-slate-50">
        {/* top bar */}
        <div className="sticky top-0 z-20 bg-white/95 border-b border-[#E5DEC5] backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-600 text-white flex items-center justify-center shadow-lg">
                🛡️
              </div>
              <div>
                <div className="text-sm font-extrabold text-slate-900">
                  {t.appTitle}
                </div>
                <div className="text-[11px] text-slate-500">
                  {t.roleAdmin} – {user?.email}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <button
                onClick={handleLogout}
                className="text-xs font-semibold px-3 py-1.5 rounded-2xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
              >
                {t.logout}
              </button>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-3xl bg-white/95 border border-[#E5DEC5] shadow-md p-4">
              <div className="text-xs font-semibold text-slate-500 mb-1">
                {t.activeTourists}
              </div>
              <div className="text-3xl font-extrabold text-blue-900">
                {tourists.length}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Real‑time count of tourists registered in this session.
              </div>
            </div>
            <div className="rounded-3xl bg-white/95 border border-[#E5DEC5] shadow-md p-4">
              <div className="text-xs font-semibold text-slate-500 mb-1">
                {t.panicAlerts}
              </div>
              <div className="text-3xl font-extrabold text-red-700">
                {alerts}
              </div>
              <button
                onClick={simulateAlert}
                className="mt-3 text-xs px-3 py-1.5 rounded-2xl bg-red-600 text-white font-semibold shadow hover:bg-red-700"
              >
                {t.simulateAlert}
              </button>
            </div>
            <div className="rounded-3xl bg-white/95 border border-[#E5DEC5] shadow-md p-4">
              <div className="text-xs font-semibold text-slate-500 mb-1">
                {t.touristInfoPanel}
              </div>
              <div className="text-[11px] text-slate-600">
                Admin can see all tourist registrations below, including ID,
                name, email and phone. This demonstrates how a real command
                center would track visitors.
              </div>
            </div>
          </div>

          <LiveMapCard />

          <div className="rounded-3xl bg-white/95 border border-[#E5DEC5] shadow-md p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-bold text-slate-800">
                {t.activeTourists}
              </div>
            </div>
            {tourists.length === 0 ? (
              <div className="text-xs text-slate-500 py-4">
                {t.noTourists}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-left text-[11px] text-slate-500 border-b border-[#F3EBD5]">
                      <th className="py-2 pr-2">ID</th>
                      <th className="py-2 pr-2">{t.name}</th>
                      <th className="py-2 pr-2">{t.email}</th>
                      <th className="py-2 pr-2">{t.phone}</th>
                      <th className="py-2">Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tourists.map((tr) => (
                      <tr
                        key={tr.id}
                        className="border-b border-[#F9F2DF] last:border-0"
                      >
                        <td className="py-2 pr-2 font-mono text-[11px]">
                          {tr.id}
                        </td>
                        <td className="py-2 pr-2">{tr.name}</td>
                        <td className="py-2 pr-2">{tr.email}</td>
                        <td className="py-2 pr-2">{tr.phone}</td>
                        <td className="py-2 text-[11px] text-slate-500">
                          {tr.registeredAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const TouristDashboard = () => {
    const myRecord =
      user?.role === "tourist"
        ? tourists.find((t) => t.id === user.touristId || t.email === user.email)
        : null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FEF9E7] via-white to-slate-50">
        <div className="sticky top-0 z-20 bg-white/95 border-b border-[#E5DEC5] backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-600 text-white flex items-center justify-center shadow-lg">
                🧳
              </div>
              <div>
                <div className="text-sm font-extrabold text-slate-900">
                  {t.touristDashboard}
                </div>
                <div className="text-[11px] text-slate-500">
                  {user?.name} – {user?.email}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <button
                onClick={handleLogout}
                className="text-xs font-semibold px-3 py-1.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              >
                {t.logout}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          <LiveMapCard />

          <div className="rounded-3xl bg-white/95 border border-[#E5DEC5] shadow-md p-4 space-y-3">
            <div className="text-sm font-bold text-slate-800">
              {t.touristInfoPanel}
            </div>
            {myRecord ? (
              <div className="text-xs text-slate-700 space-y-1">
                <div>
                  <span className="font-semibold">{t.name}: </span>
                  {myRecord.name}
                </div>
                <div>
                  <span className="font-semibold">{t.email}: </span>
                  {myRecord.email}
                </div>
                <div>
                  <span className="font-semibold">{t.phone}: </span>
                  {myRecord.phone}
                </div>
                <div className="text-[11px] text-slate-500">
                  ID: {myRecord.id} • {myRecord.registeredAt}
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-500">{t.noTourists}</div>
            )}
            <button
              onClick={simulateAlert}
              className="mt-3 text-xs px-3 py-1.5 rounded-2xl bg-red-600 text-white font-semibold shadow hover:bg-red-700"
            >
              {t.simulateAlert}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // main render switch
  if (!user) {
    if (showRegister) return <RegisterPage />;
    return <LoginPage />;
  }

  if (user.role === "admin") return <AdminDashboard />;
  return <TouristDashboard />;
}

export default App;
