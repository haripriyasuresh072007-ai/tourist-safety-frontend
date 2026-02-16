// src/App.jsx
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
    simulateAlert: "Simulate panic alert",
    logout: "Logout",
    roleAdmin: "Admin",
    roleTourist: "Tourist",
    demoInfo:
      "Use admin@police.gov / 123456 for Admin, or register as a tourist. Tourist password (demo): 123456.",
    touristInfoPanel: "Tourist Information",
    noTourists: "No tourists registered yet.",
    shareExplanation:
      "Your browser location is used to show how live tracking and sharing would work in a real system.",
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
    backToLogin: "உள்நுழைவு திரைக்கு திரும்ப",
    adminDashboard: "ஆணையர் இயக்குபலகை",
    touristDashboard: "சுற்றுலா பயணி இயக்குபலகை",
    activeTourists: "பதிவு செய்யப்பட்ட சுற்றுலா பயணிகள்",
    panicAlerts: "அவசர அலாரங்கள்",
    mapTitle: "நேரடி இருப்பிட வரைபடம்",
    shareLocation: "என் இருப்பிடத்தை பகிர்",
    shareLinkLabel: "இந்த இணைப்பு அல்லது QR மூலம் இருப்பிடத்தை பகிரலாம்",
    simulateAlert: "அவசர அலாரம் (டெமோ)",
    logout: "வெளியேறு",
    roleAdmin: "ஆணையர்",
    roleTourist: "சுற்றுலா பயணி",
    demoInfo:
      "ஆணையர்: admin@police.gov / 123456. சுற்றுலா பயணி: பதிவு செய்து 123456 பயன்படுத்தவும்.",
    touristInfoPanel: "சுற்றுலா பயணி விவரங்கள்",
    noTourists: "இன்னும் யாரும் பதிவு செய்யவில்லை.",
    shareExplanation:
      "உங்கள் உலாவி இருப்பிடத்தைப் பயன்படுத்தி நேரடி கண்காணிப்பு மற்றும் பகிர்வு எப்படி இருக்கும் என்பதை இது காட்டுகிறது.",
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
    shareLinkLabel: "इस लिंक या QR कोड से लोकेशन साझा करें",
    simulateAlert: "पैनिक अलर्ट (डेमो)",
    logout: "लॉगआउट",
    roleAdmin: "एडमिन",
    roleTourist: "पर्यटक",
    demoInfo:
      "एडमिन: admin@police.gov / 123456. पर्यटक: रजिस्टर करें और 123456 उपयोग करें.",
    touristInfoPanel: "पर्यटक विवरण",
    noTourists: "अभी कोई पर्यटक पंजीकृत नहीं हैं.",
    shareExplanation:
      "आपका ब्राउज़र लोकेशन प्रयोग करके यह दिखाता है कि रियल‑टाइम ट्रैकिंग और लोकेशन शेयरिंग कैसे काम करेगी.",
  },
};

function App() {
  const [lang, setLang] = useState("en");
  const t = translations[lang];

  const [user, setUser] = useState(null); // {role, name, email, touristId?}
  const [showRegister, setShowRegister] = useState(false);

  const [tourists, setTourists] = useState([]);
  const [alerts, setAlerts] = useState(0);

  const [position, setPosition] = useState(null);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(
    false
  );

  const [shareUrl, setShareUrl] = useState("");

  const [panicHold, setPanicHold] = useState(false);
  const [panicTimerId, setPanicTimerId] = useState(null);

  const tDict = t; // shorthand in inner components if needed

  const LanguageSwitcher = () => (
    <div className="flex items-center gap-2 text-xs sm:text-sm">
      <span className="font-medium text-slate-600">{t.language}:</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="border border-slate-300 rounded-xl px-2 py-1 bg-white text-xs"
      >
        <option value="en">{t.english}</option>
        <option value="ta">{t.tamil}</option>
        <option value="hi">{t.hindi}</option>
      </select>
    </div>
  );

  const startLocationWatch = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setPosition({ lat, lng });
        setLocationPermissionDenied(false);

        const url = `https://www.google.com/maps?q=${lat},${lng}`;
        setShareUrl(url);
      },
      () => {
        setLocationPermissionDenied(true);
      }
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
      // if you later add emergency contacts, add them here
      registeredAt: new Date().toLocaleString(),
    };
    setTourists((prev) => [...prev, newTourist]);
    alert(`Tourist registered with ID: ${id}`);
    setShowRegister(false);
  };

  const triggerFullPanicFlow = () => {
    setAlerts((a) => a + 1);
    const locationText = position
      ? `Location: https://www.google.com/maps?q=${position.lat},${position.lng}`
      : "Location: last known or GPS unavailable.";
    alert(
      [
        `1) Voice call automatically placed to emergency contacts (conceptual).`,
        "2) If not answered, SMS is sent with:",
        `   - Tourist details`,
        `   - ${locationText}`,
        "3) Same info goes to the nearby police control room.",
        "",
        "This expo demo simulates the flow without real calls/SMS.",
      ].join("\n")
    );
  };

  const startPanicHold = () => {
    setPanicHold(true);
    const id = setTimeout(() => {
      setPanicHold(false);
      triggerFullPanicFlow();
    }, 3000);
    setPanicTimerId(id);
  };

  const cancelPanicHold = () => {
    setPanicHold(false);
    if (panicTimerId) {
      clearTimeout(panicTimerId);
      setPanicTimerId(null);
    }
  };

  const LoginPage = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const onSubmit = (e) => {
      e.preventDefault();
      const ok = handleLogin(form.email, form.password);
      if (!ok) setError(t.demoInfo);
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] px-4">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl border border-slate-200 p-8 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                {t.loginTitle}
              </h1>
              <p className="text-[11px] text-slate-500 mt-1">{t.subtitle}</p>
            </div>
            <LanguageSwitcher />
          </div>

          {error && (
            <div className="rounded-2xl bg-red-50 border border-red-200 px-3 py-2 text-[11px] text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.email}
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                required
                className="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                placeholder="admin@police.gov"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.password}
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                required
                className="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                placeholder="123456"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] text-white font-semibold py-2.5 text-sm shadow-md hover:shadow-lg transition"
            >
              {t.loginButton}
            </button>
          </form>

          <div className="text-center text-[11px] text-slate-600">
            {t.notRegistered}{" "}
            <button
              onClick={() => setShowRegister(true)}
              className="font-semibold text-[#2563EB] hover:underline"
            >
              {t.registerHere}
            </button>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">{t.demoInfo}</div>
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
      <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] px-4">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl border border-slate-200 p-8 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                {t.registerTitle}
              </h1>
              <p className="text-[11px] text-slate-500 mt-1">{t.subtitle}</p>
            </div>
            <LanguageSwitcher />
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.name}
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                required
                className="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                placeholder="Tourist name"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.email}
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                required
                className="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                placeholder="tourist@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.phone}
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                required
                className="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                placeholder="+91 98765 43210"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] text-white font-semibold py-2.5 text-sm shadow-md hover:shadow-lg transition"
            >
              {t.registerTitle}
            </button>
          </form>

          <div className="text-center text-[11px] text-slate-600">
            <button
              onClick={() => setShowRegister(false)}
              className="font-semibold text-[#2563EB] hover:underline"
            >
              {t.backToLogin}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const LiveMapCard = () => {
    const defaultCenter = "13.1167,79.6500";
    const center = position
      ? `${position.lat},${position.lng}`
      : defaultCenter;

    const mapsUrl = `https://www.google.com/maps?q=${center}&z=14&output=embed`;

    return (
      <div className="rounded-3xl bg-white border border-slate-200 shadow-md overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 border-b border-slate-200 bg-gradient-to-r from-[#0F172A] to-[#1F2937] text-white gap-2">
          <div className="text-sm font-semibold">{t.mapTitle}</div>
          <button
            onClick={startLocationWatch}
            className="text-[11px] px-3 py-1.5 rounded-2xl bg-white/10 border border-white/30 hover:bg-white/20"
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
        <div className="px-4 py-4 border-t border-slate-200 space-y-2">
          <p className="text-[11px] text-slate-600">{t.shareExplanation}</p>
          {shareUrl && (
            <div className="mt-1">
              <div className="text-[11px] font-semibold text-slate-700 mb-1">
                {t.shareLinkLabel}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <input
                  className="flex-1 text-[11px] border border-slate-300 rounded-xl px-2 py-1 bg-slate-50"
                  value={shareUrl}
                  readOnly
                />
                <div className="w-16 h-16 border border-slate-300 rounded-xl flex items-center justify-center text-[10px] text-slate-500">
                  QR
                </div>
              </div>
            </div>
          )}
          {locationPermissionDenied && (
            <p className="text-[10px] text-red-600 mt-1">
              Location access denied in browser – map shows district center.
            </p>
          )}
        </div>
      </div>
    );
  };

  const AdminDashboard = () => (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(37,99,235,0.16), transparent 55%), radial-gradient(circle at bottom right, rgba(15,23,42,0.16), transparent 55%), #F3F4F6",
      }}
    >
      <header className="sticky top-0 z-20 bg-white/95 border-b border-slate-200 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#2563EB] text-white flex items-center justify-center shadow-lg">
              🛡️
            </div>
            <div>
              <div className="text-sm sm:text-base font-extrabold text-[#0F172A]">
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
              className="text-[11px] font-semibold px-3 py-1.5 rounded-2xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
            >
              {t.logout}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <section className="grid md:grid-cols-3 gap-6">
          <div className="rounded-3xl bg-white border border-slate-200 shadow-md p-4">
            <div className="text-xs font-semibold text-slate-500 mb-1">
              {t.activeTourists}
            </div>
            <div className="text-3xl font-extrabold text-[#1D4ED8]">
              {tourists.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Shows tourists registered during this expo session.
            </div>
          </div>
          <div className="rounded-3xl bg-white border border-slate-200 shadow-md p-4 flex flex-col items-start">
            <div className="text-xs font-semibold text-slate-500 mb-1">
              {t.panicAlerts}
            </div>
            <div className="text-3xl font-extrabold text-[#B91C1C]">
              {alerts}
            </div>
            <button
              onMouseDown={startPanicHold}
              onMouseUp={cancelPanicHold}
              onMouseLeave={cancelPanicHold}
              onTouchStart={startPanicHold}
              onTouchEnd={cancelPanicHold}
              className={`mt-4 inline-flex items-center justify-center w-16 h-16 rounded-full font-semibold text-[10px] shadow-lg transition ${
                panicHold
                  ? "bg-[#B91C1C] text-white scale-95"
                  : "bg-[#DC2626] text-white hover:bg-[#B91C1C] hover:scale-105"
              }`}
            >
              {panicHold ? "HOLD..." : "PANIC"}
            </button>
          </div>
          <div className="rounded-3xl bg-white border border-slate-200 shadow-md p-4">
            <div className="text-xs font-semibold text-slate-500 mb-1">
              {t.touristInfoPanel}
            </div>
            <div className="text-[11px] text-slate-600">
              Admin can view all tourist registrations below (ID, name, email,
              phone and time). This mirrors a real police command center.
            </div>
          </div>
        </section>

        <LiveMapCard />

        <section className="rounded-3xl bg-white border border-slate-200 shadow-md p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold text-slate-800">
              {t.activeTourists}
            </div>
          </div>
          {tourists.length === 0 ? (
            <div className="text-xs text-slate-500 py-4">{t.noTourists}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-50">
                  <tr className="text-left text-[11px] text-slate-500 border-b border-slate-200">
                    <th className="py-2 px-3">ID</th>
                    <th className="py-2 px-3">{t.name}</th>
                    <th className="py-2 px-3">{t.email}</th>
                    <th className="py-2 px-3">{t.phone}</th>
                    <th className="py-2 px-3">Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {tourists.map((tr) => (
                    <tr
                      key={tr.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                    >
                      <td className="py-2 px-3 font-mono text-[11px]">
                        {tr.id}
                      </td>
                      <td className="py-2 px-3">{tr.name}</td>
                      <td className="py-2 px-3">{tr.email}</td>
                      <td className="py-2 px-3">{tr.phone}</td>
                      <td className="py-2 px-3 text-[11px] text-slate-500">
                        {tr.registeredAt}
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

  const TouristDashboard = () => {
    const myRecord =
      user?.role === "tourist"
        ? tourists.find(
            (t) => t.id === user.touristId || t.email === user.email
          )
        : null;

    return (
      <div
        className="min-h-screen"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(37,99,235,0.16), transparent 55%), radial-gradient(circle at bottom right, rgba(15,23,42,0.16), transparent 55%), #F3F4F6",
        }}
      >
        <header className="sticky top-0 z-20 bg-white/95 border-b border-slate-200 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#2563EB] text-white flex items-center justify-center shadow-lg">
                🧳
              </div>
              <div>
                <div className="text-sm sm:text-base font-extrabold text-[#0F172A]">
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
                className="text-[11px] font-semibold px-3 py-1.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              >
                {t.logout}
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
          <LiveMapCard />

          <section className="rounded-3xl bg-white border border-slate-200 shadow-md p-4 space-y-3">
            <div className="text-sm font-semibold text-slate-800">
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
              onMouseDown={startPanicHold}
              onMouseUp={cancelPanicHold}
              onMouseLeave={cancelPanicHold}
              onTouchStart={startPanicHold}
              onTouchEnd={cancelPanicHold}
              className={`mt-4 inline-flex items-center justify-center w-20 h-20 rounded-full font-semibold text-[11px] shadow-xl transition ${
                panicHold
                  ? "bg-[#B91C1C] text-white scale-95"
                  : "bg-[#DC2626] text-white hover:bg-[#B91C1C] hover:scale-105"
              }`}
            >
              {panicHold ? "HOLD 3s" : "PANIC"}
            </button>
          </section>
        </main>
      </div>
    );
  };

  if (!user) {
    if (showRegister) return <RegisterPage />;
    return <LoginPage />;
  }

  if (user.role === "admin") return <AdminDashboard />;
  return <TouristDashboard />;
}

export default App;
