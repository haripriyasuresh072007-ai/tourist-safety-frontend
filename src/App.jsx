import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LiveSafetyMap from './components/LiveSafetyMap';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';

function DashboardContent() {
  const { user, logout, tourists, setTourists, alerts, setAlerts } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const addTourist = () => {
    const newTourist = {
      id: Date.now(),
      name: `Tourist #${tourists.length + 1}`,
      email: `tourist${tourists.length + 1}@demo.com`,
      location: {
        lat: 13.9167 + (Math.random() - 0.5) * 0.02,
        lng: 78.4867 + (Math.random() - 0.5) * 0.02
      },
      safetyScore: 70 + Math.random() * 30,
      digitalID: `TRV${Date.now().toString().slice(-6)}`,
      status: 'active',
      timestamp: new Date().toISOString()
    };
    setTourists(prev => [...prev, newTourist]);
  };

  const triggerPanic = () => {
    const newAlert = {
      id: Date.now(),
      touristId: tourists[0]?.id || 'demo',
      location: { lat: 13.92, lng: 78.48 },
      efirId: `EFIR${Date.now().toString().slice(-6)}`,
      status: 'pending',
      priority: 'high',
      timestamp: new Date().toISOString()
    };
    setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
  };

  if (!user) return <LoginPage />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Professional Topbar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">SafeTravel Command</h1>
              <p className="text-sm text-gray-500">{user.role.toUpperCase()} DASHBOARD</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 font-medium transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Live Map */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 text-white">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Live Safety Map - Ranipet District
                  </h2>
                </div>
                <div className="p-1">
                  <LiveSafetyMap tourists={tourists} alerts={alerts} />
                </div>
              </div>
            </div>

            {/* Command Metrics */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 text-center group hover:shadow-2xl transition-all">
                <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-4xl font-black text-gray-900 mb-2">{alerts.length}</div>
                <div className="text-xl font-semibold text-gray-700 mb-1">Active Incidents</div>
                <div className="text-red-600 font-bold text-sm uppercase tracking-wide">High Priority</div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 text-center group hover:shadow-2xl transition-all">
                <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-12 h-12 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-4xl font-black text-gray-900 mb-2">{tourists.length}</div>
                <div className="text-xl font-semibold text-gray-700 mb-1">Tourists Tracked</div>
                <div className="text-emerald-600 font-bold text-sm uppercase tracking-wide">Real-time GPS</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tourists' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <h2 className="text-4xl font-black text-gray-900">Active Tourists</h2>
              <div className="flex gap-4">
                <button
                  onClick={addTourist}
                  className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 shadow-xl hover:shadow-2xl transition-all text-lg"
                >
                  ➕ Register Tourist
                </button>
                <button
                  onClick={triggerPanic}
                  className="px-8 py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 shadow-xl hover:shadow-2xl transition-all text-lg animate-pulse"
                >
                  🚨 Emergency Alert
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tourists.slice(0, 9).map((tourist) => (
                <div key={tourist.id} className="group bg-white rounded-3xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all overflow-hidden">
                  <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ${
                      tourist.safetyScore > 80 ? 'bg-emerald-500 text-white' : 'bg-orange-500 text-white'
                    }`}>
                      {Math.round(tourist.safetyScore)}%
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="font-bold text-2xl text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">{tourist.name}</h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        {tourist.digitalID}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 
