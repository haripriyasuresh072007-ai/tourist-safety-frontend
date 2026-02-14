import { useState, useEffect } from 'react';
import i18n from './i18n'; // We'll create this
import TouristDashboard from './components/TouristDashboard';
import PoliceDashboard from './components/PoliceDashboard';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  const [view, setView] = useState('tourist');
  const [language, setLanguage] = useState('en');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 flex gap-2 bg-white/90 backdrop-blur p-2 rounded-2xl shadow-lg z-50">
        {['en', 'hi', 'ta', 'bn'].map(lang => (
          <button key={lang} onClick={() => { i18n.changeLanguage(lang); setLanguage(lang); }}
            className={`px-4 py-2 rounded-xl font-bold ${language === lang ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}>
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Role Switcher */}
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex gap-4 mb-12 justify-center flex-wrap">
          <button onClick={() => setView('tourist')} className={`px-8 py-4 rounded-2xl font-bold text-xl shadow-xl transition-all ${view === 'tourist' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-2xl' : 'bg-white border-2 border-emerald-200 hover:shadow-2xl'}`}>
            🧳 Tourist App
          </button>
          <button onClick={() => setView('police')} className={`px-8 py-4 rounded-2xl font-bold text-xl shadow-xl transition-all ${view === 'police' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-2xl' : 'bg-white border-2 border-blue-200 hover:shadow-2xl'}`}>
            👮 Police Dashboard
          </button>
          <button onClick={() => setView('admin')} className={`px-8 py-4 rounded-2xl font-bold text-xl shadow-xl transition-all ${view === 'admin' ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-2xl' : 'bg-white border-2 border-purple-200 hover:shadow-2xl'}`}>
            ⚙️ Admin Panel
          </button>
        </div>

        {view === 'tourist' && <TouristDashboard />}
        {view === 'police' && <PoliceDashboard />}
        {view === 'admin' && <AdminPanel />}
      </div>
    </div>
  );
}

export default App;
