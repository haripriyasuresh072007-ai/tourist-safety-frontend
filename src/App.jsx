import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 12.9543,
  lng: 79.1717
};

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("tourist");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [tourists, setTourists] = useState([]);
  const [selectedTourist, setSelectedTourist] = useState(null);
  const [mapKey, setMapKey] = useState("YOUR_GOOGLE_MAPS_API_KEY_HERE"); // Replace with your API key

  // Demo tourist locations (Ranipet area)
  const demoTourists = [
    { id: "TRV0001", name: "John Doe", lat: 12.9543, lng: 79.1717, status: "Active" },
    { id: "TRV0002", name: "Priya Sharma", lat: 12.9600, lng: 79.1650, status: "Alert" },
    { id: "TRV0003", name: "Ahmed Khan", lat: 12.9480, lng: 79.1800, status: "Active" }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.email === "admin@police.gov" && formData.password === "123456") {
      setUser({ role: "admin", name: "Ranipet Police Admin" });
    } else if (formData.email && formData.password === "123456") {
      setUser({ role: "tourist", name: formData.email.split("@")[0], email: formData.email });
    } else {
      alert("❌ Invalid credentials. Demo: admin@police.gov / 123456");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedTourist(null);
  };

  const handleMarkerClick = (tourist) => {
    setSelectedTourist(tourist);
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100">
        {/* Dashboard Header */}
        <div className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#2563EB] to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl">🛡️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  SafeTravel AI - {user.role === "admin" ? "Police Command Center" : "Tourist Dashboard"}
                </h1>
                <p className="text-sm text-slate-600">Welcome, {user.name}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xl transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          {user.role === "admin" ? (
            /* ADMIN DASHBOARD WITH LIVE MAP */
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Stats Cards */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">📊 Live Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Active Tourists</span>
                      <span className="font-bold text-2xl text-[#2563EB]">{tourists.length || 3}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Panic Alerts</span>
                      <span className="font-bold text-2xl text-red-600">2</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-xl h-2">
                      <div className="bg-green-500 h-2 rounded-xl" style={{width: '89%'}}></div>
                    </div>
                  </div>
                </div>

                {/* Tourist List */}
                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50 max-h-96 overflow-y-auto">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">👥 Tourists</h3>
                  <div className="space-y-3">
                    {demoTourists.map(tourist => (
                      <div key={tourist.id} className="p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all cursor-pointer" onClick={() => handleMarkerClick(tourist)}>
                        <div className="font-bold text-slate-900">{tourist.name}</div>
                        <div className="text-sm text-slate-600">{tourist.id}</div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          tourist.status === "Alert" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                        }`}>
                          {tourist.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* LIVE GOOGLE MAP */}
              <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">🗺️ Live Tourist Map</h3>
                  <span className="px-4 py-2 bg-[#2563EB]/10 text-[#2563EB] rounded-xl font-semibold text-sm">
                    Ranipet District
                  </span>
                </div>
                <LoadScript googleMapsApiKey={mapKey}>
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={12}
                    options={{
                      styles: [
                        { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }
                      ]
                    }}
                  >
                    {demoTourists.map((tourist, index) => (
                      <Marker
                        key={tourist.id}
                        position={{ lat: tourist.lat, lng: tourist.lng }}
                        icon={{
                          url: tourist.status === "Alert" 
                            ? "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                            : "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
                          scaledSize: new window.google.maps.Size(40, 40)
                        }}
                        onClick={() => handleMarkerClick(tourist)}
                      />
                    ))}
                    
                    {selectedTourist && (
                      <InfoWindow
                        position={{ lat: selectedTourist.lat, lng: selectedTourist.lng }}
                        onCloseClick={() => setSelectedTourist(null)}
                      >
                        <div className="p-4">
                          <h4 className="font-bold text-lg text-slate-900">{selectedTourist.name}</h4>
                          <p className="text-sm text-slate-600">{selectedTourist.id}</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-2 ${
                            selectedTourist.status === "Alert" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                          }`}>
                            {selectedTourist.status}
                          </span>
                        </div>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
          ) : (
            /* TOURIST DASHBOARD */
            <div className="max-w-2xl mx-auto text-center space-y-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-[#2563EB] bg-clip-text text-transparent">
                Your Safety Dashboard
              </h2>
              <div className="bg-white/80 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border border-white/50">
                <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto mb-8 shadow-2xl flex items-center justify-center border-8 border-white/20 hover:scale-110 transition-all duration-300 cursor-pointer">
                  <span className="text-4xl">🚨</span>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Emergency Panic Button</h3>
                <p className="text-lg text-slate-600 mb-8">Hold for 3 seconds to alert police</p>
                <div className="w-24 h-24 bg-red-100 rounded-full mx-auto animate-ping"></div>
              </div>
              
              <LoadScript googleMapsApiKey={mapKey}>
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '400px' }}
                  center={center}
                  zoom={11}
                />
              </LoadScript>
            </div>
          )}
        </div>
      </div>
    );
  }

  // SPLIT-SCREEN LOGIN PAGE (unchanged from previous)
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-blue-50 to-[#f8fafc] flex flex-col lg:flex-row">
      {/* LEFT SIDE: Hero Section */}
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
          <div className="grid grid-cols-3 gap-4 text-sm mb-12">
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl text-center border border-slate-200/50">
              <div className="text-2xl font-bold text-[#2563EB]">24/7</div>
              <div className="text-slate-600">Monitoring</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl text-center border border-slate-200/50">
              <div className="text-2xl font-bold text-green-600">1-Click</div>
              <div className="text-slate-600">SOS Alert</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl text-center border border-slate-200/50">
              <div className="text-2xl font-bold text-orange-600">Live GPS</div>
              <div className="text-slate-600">Tracking</div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Login Card */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12 order-1 lg:order-2">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-xl shadow-2xl border border-white/50 rounded-3xl p-10 lg:p-12 animate-fade-in">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-r from-[#2563EB] to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-white/30">
              <span className="text-xl">🔐</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-600">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Select Role</label>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-4 text-lg border border-slate-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-[#2563EB]/20 focus:border-[#2563EB]/50 transition-all duration-300 hover:border-slate-300 shadow-sm"
              >
                <option value="tourist">👤 Tourist</option>
                <option value="police">👮 Police Officer</option>
                <option value="admin">🛡️ Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                placeholder="admin@police.gov"
                className="w-full px-5 py-4 text-lg border border-slate-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-[#2563EB]/20 focus:border-[#2563EB]/50 transition-all duration-300 hover:border-slate-300 shadow-sm placeholder-slate-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                placeholder="••••••••"
                className="w-full px-5 py-4 text-lg border border-slate-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-[#2563EB]/20 focus:border-[#2563EB]/50 transition-all duration-300 hover:border-slate-300 shadow-sm placeholder-slate-400"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <a href="#" className="text-[#2563EB] hover:text-blue-700 font-semibold transition-colors">Forgot Password?</a>
              <a href="#" className="text-[#2563EB] hover:text-blue-700 font-semibold transition-colors">
                Create Account
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-5 px-6 rounded-2xl text-lg shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all duration-300 transform hover:-translate-y-0.5 border border-blue-200/50"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-10 pt-8 border-t border-slate-200/50">
            <p className="text-xs text-slate-500">
              © 2026 Smart Tourist Safety System. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;

