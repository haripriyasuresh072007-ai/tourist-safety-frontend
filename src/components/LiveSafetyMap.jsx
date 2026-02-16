import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';

// Fix default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function LiveSafetyMap({ tourists, alerts, onMapClick }) {
  const center = [13.9167, 78.4867]; // Ranipet coordinates

  return (
    <div className="h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
      <MapContainer 
        center={center} 
        zoom={12} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        {/* Tourists */}
        {tourists.map((tourist) => (
          <Marker key={tourist.id} position={[tourist.location.lat, tourist.location.lng]} icon={greenIcon}>
            <Popup>
              <div className="p-4 min-w-[280px] space-y-3">
                <h3 className="font-bold text-xl text-blue-900">{tourist.name}</h3>
                <div className={`text-2xl font-black px-3 py-1 rounded-xl ${
                  tourist.safetyScore > 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {Math.round(tourist.safetyScore)}% Safe
                </div>
                <p className="text-sm text-gray-700">📱 {tourist.mobile}</p>
                <p className="text-xs text-gray-600">🆔 {tourist.digitalID}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Alerts */}
        {alerts.map((alert) => (
          <Marker key={alert.id} position={[alert.location.lat, alert.location.lng]} icon={redIcon}>
            <Popup>
              <div className="p-4 min-w-[280px] bg-red-50 border-2 border-red-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 font-bold text-red-800 text-lg">
                  <AlertTriangle size={20} />
                  E-FIR #{alert.efirId}
                </div>
                <p className="text-sm font-semibold text-gray-800">🚨 HIGH PRIORITY</p>
                <p className="text-xs text-gray-600">📍 Nearest Police: Ranipet Station</p>
                <p className="text-xs text-gray-500">⏰ {new Date(alert.timestamp).toLocaleString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
