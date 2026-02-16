 
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { AlertTriangle, ShieldCheck, User } from 'lucide-react';
import { useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 13.9167,
  lng: 78.4867
};

export default function LiveSafetyMap({ tourists, alerts }) {
  const [selected, setSelected] = useState(null);

  const getIcon = (item, type) => {
    if (type === 'alert') {
      return { icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' };
    }
    const score = item.safetyScore;
    if (score > 80) return { icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' };
    if (score > 60) return { icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png' };
    return { icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' };
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCzuYkwN-AK0SuYuaE3Vin9uyUd_jsDSSk">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        options={{
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        }}
      >
        {/* Tourists */}
        {tourists.map((tourist) => (
          <Marker
            key={tourist.id}
            position={{ lat: tourist.location.lat, lng: tourist.location.lng }}
            title={tourist.name}
            icon={getIcon(tourist, 'tourist')}
            onClick={() => setSelected(tourist)}
          />
        ))}

        {/* Alerts */}
        {alerts.map((alert) => (
          <Marker
            key={alert.id}
            position={{ lat: alert.location.lat, lng: alert.location.lng }}
            title={`E-FIR ${alert.efirId}`}
            icon={getIcon(alert, 'alert')}
            onClick={() => setSelected(alert)}
          />
        ))}

        {selected && (
          <InfoWindow
            position={{ lat: selected.location.lat, lng: selected.location.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div className="p-4 max-w-xs">
              {selected.efirId ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-red-600">
                    <AlertTriangle size={20} />
                    E-FIR: {selected.efirId}
                  </div>
                  <div className="text-sm text-gray-700">Status: {selected.status}</div>
                  <div className="text-xs text-gray-500">Filed: {new Date(selected.timestamp).toLocaleString()}</div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="font-bold">{selected.name}</div>
                  <div className={`text-lg font-bold ${selected.safetyScore > 80 ? 'text-green-600' : 'text-orange-600'}`}>
                    {selected.safetyScore}% Safe
                  </div>
                  <div className="text-xs text-gray-500">Digital ID: {selected.digitalID}</div>
                </div>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}
