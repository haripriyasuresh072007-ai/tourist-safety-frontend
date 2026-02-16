import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { MapPin, ShieldCheck, AlertTriangle } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function SafetyMap({ tourists, alerts, currentLocation }) {
  return (
    <div className="h-96 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/50 backdrop-blur-xl">
      <MapContainer 
        center={[13.9167, 78.4867]} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        className="rounded-3xl"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* Current Location */}
        {currentLocation && (
          <Marker position={[currentLocation.lat, currentLocation.lng]}>
            <Popup>
              <div className="font-bold text-blue-600">You are here</div>
              <div>Safety Score: 92%</div>
            </Popup>
          </Marker>
        )}

        {/* Tourists */}
        {tourists.map(tourist => (
          <Marker 
            key={tourist.id} 
            position={tourist.location || [13.9167, 78.4867]}
            icon={L.icon({
              iconUrl: tourist.safetyScore > 80 ? 
                'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png' :
                'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
              shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
              iconSize: [35, 41],
              iconAnchor: [12, 41]
            })}
          >
            <Popup>
              <div className="font-bold">{tourist.name}</div>
              <div className={`text-2xl font-black ${tourist.safetyScore > 80 ? 'text-green-600' : 'text-orange-600'}`}>
                {tourist.safetyScore}%
              </div>
              <div className="mt-2 p-2 bg-gray-100 rounded-lg text-sm">
                <div>Digital ID: {tourist.id}</div>
                <div>Last seen: {new Date(tourist.timestamp).toLocaleTimeString()}</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Alerts */}
        {alerts.map(alert => (
          <Marker 
            key={alert.id}
            position={alert.location}
            icon={L.icon({
              iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
              iconSize: [35, 41],
              iconAnchor: [12, 41]
            })}
          >
            <Popup className="animate-pulse">
              <div className="flex items-center gap-2 font-bold text-red-600 mb-2">
                <AlertTriangle className="w-5 h-5" />
                PANIC ALERT!
              </div>
              <div className="text-sm">Time: {new Date(alert.timestamp).toLocaleString()}</div>
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl">
                <strong>E-FIR Filed</strong><br/>
                Status: <span className="text-green-600 font-bold">Police Dispatched</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
