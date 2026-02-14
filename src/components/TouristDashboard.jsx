import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polygon } from 'react-leaflet';
import { AlertCircle, ShieldCheck, MapPin, Send } from 'lucide-react';
import io from 'socket.io-client';
import 'leaflet/dist/leaflet.css';

const socket = io('http://localhost:5000');

export default function TouristDashboard() {
  const [tourist, setTourist] = useState(null);
  const [location, setLocation] = useState({ lat: 13.9167, lng: 78.4867 });
  const [safetyScore, setSafetyScore] = useState(85);
  const [alerts, setAlerts] = useState([]);

  // Panic button
  const triggerPanic = () => {
    socket.emit('panic', { location });
    navigator.vibrate?.([200, 100, 200]); // Haptic feedback
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Safety Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-8 rounded-3xl shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black mb-2">Your Safety Score</h1>
            <div className="text-6xl font-black">{safetyScore}%</div>
          </div>
          <ShieldCheck className="w-32 h-32 opacity-75" />
        </div>
      </div>

      {/* Live Map */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <MapPin className="w-10 h-10" /> Live Location
        </h2>
        <MapContainer center={location} zoom={15} className="h-[500px] rounded-2xl">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={location} />
          {/* Risk Zones */}
          <Polygon positions={[[13.91, 78.48], [13.92, 78.49], [13.93, 78.48]]} color="orange" />
        </MapContainer>
      </div>

      {/* EMERGENCY BUTTON */}
      <div className="flex flex-col items-center space-y-6">
        <div className="text-2xl font-bold text-gray-700 text-center">
          In Emergency? Press Below:
        </div>
        <button 
          onClick={triggerPanic}
          className="w-80 h-24 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-3xl font-black text-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-4 text-shadow-lg animate-pulse"
        >
          <AlertCircle className="w-12 h-12" />
          🚨 PANIC SOS - HELP!
        </button>
      </div>
    </div>
  );
}
