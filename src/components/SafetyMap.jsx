import { useEffect, useState } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  Polygon, 
  CircleMarker, 
  TileLayer as HeatmapLayer 
} from 'react-leaflet';
import { AlertCircle, Shield, MapPin, User, AlertTriangle } from 'lucide-react';
import L, { Icon, circleMarker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

// Fix Leaflet marker icons for React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom safety score icons
const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const yellowIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function SafetyMap({ 
  tourists, 
  alerts, 
  riskZones = [], 
  center = { lat: 13.9167, lng: 78.4867 },
  zoom = 13,
  height = "600px",
  onMarkerClick,
  currentUserLocation
}) {
  const [map, setMap] = useState(null);

  // Risk zone polygons (Rānipet high-risk areas)
  const defaultRiskZones = [
    {
      id: 'zone-1',
      name: 'High Risk Industrial Area',
      color: '#F4A261',
      positions: [[13.915, 78.485], [13.920, 78.490], [13.918, 78.492], [13.912, 78.487]]
    },
    {
      id: 'zone-2', 
      name: 'Remote Forest Zone',
      color: '#E76F51',
      positions: [[13.925, 78.475], [13.930, 78.480], [13.928, 78.470], [13.922, 78.472]]
    }
  ];

  // Generate heatmap data from tourists
  const heatmapData = tourists.map(tourist => {
    const loc = tourist.locations?.[tourist.locations.length - 1];
    return loc ? [loc.lat, loc.lng, (100 - tourist.safetyScore) / 10] : null;
  }).filter(Boolean);

  return (
    <div className="safety-map-container relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Map Legend */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-lg border flex gap-2 items-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span>Safe (80-100%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          <span>Caution (50-79%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span>Danger (<50%)</span>
        </div>
      </div>

      {/* Active Alerts Badge */}
      {alerts.length > 0 && (
        <div className="absolute top-4 right-4 z-[1000] bg-red-500/90 backdrop-blur-xl text-white px-6 py-3 rounded-2xl shadow-2xl font-bold flex items-center gap-3 animate-pulse">
          <AlertCircle className="w-6 h-6" />
          {alerts.length} Active Alerts
        </div>
      )}

      {/* Tourist Count */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-lg font-bold">
        👥 {tourists.length} Tourists Tracking
      </div>

      {/* THE MAP */}
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        style={{ height, width: '100%' }}
        className="rounded-2xl"
        setView={true}
        whenCreated={setMap}
      >
        {/* Base Map Tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Safety Heatmap Layer */}
        {heatmapData.length > 0 && (
          <HeatmapLayer
            data={heatmapData}
            radius={20}
            max={1}
            gradient={{ 0.4: 'blue', 0.65: 'yellow', 1: 'red' }}
          />
        )}

        {/* RISK ZONES - Red Polygons */}
        {(riskZones.length > 0 ? riskZones : defaultRiskZones).map((zone) => (
          <Polygon
            key={zone.id}
            positions={zone.positions}
            color={zone.color || '#F4A261'}
            weight={4}
            opacity={0.7}
            fillColor={zone.color || '#F4A261'}
            fillOpacity={0.3}
          >
            <Popup>
              <div className="min-w-[250px]">
                <h3 className="font-bold text-lg text-red-800 mb-2">{zone.name}</h3>
                <p className="text-sm text-gray-700">⚠️ High-risk area - Avoid if possible</p>
                <div className="mt-3 p-3 bg-orange-100 rounded-lg text-xs">
                  Geo-fencing alerts active
                </div>
              </Popup>
            </Popup>
          ))}
        )}

        {/* TOURIST MARKERS - Color-coded by safety score */}
        {tourists.map((tourist) => {
          const latestLoc = tourist.locations?.[tourist.locations?.length - 1];
          if (!latestLoc) return null;

          const iconType = tourist.safetyScore >= 80 ? greenIcon : 
                          tourist.safetyScore >= 50 ? yellowIcon : redIcon;

          return (
            <Marker
              key={tourist.id}
              position={[latestLoc.lat, latestLoc.lng]}
              icon={iconType}
              eventHandlers={{
                click: () => onMarkerClick?.(tourist)
              }}
            >
              <Popup className="max-w-xs">
                <div className="font-bold text-lg mb-2 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {tourist.name}
                </div>
                <div className="text-2xl font-black mb-3">
                  {tourist.safetyScore}%
                  {tourist.safetyScore >= 80 ? ' 🟢' : tourist.safetyScore >= 50 ? ' 🟡' : ' 🔴'}
                </div>
                <div className="space-y-1 text-sm text-gray-600 mb-3">
                  <div>📱 Digital ID: {tourist.digitalId?.slice(0, 12)}...</div>
                  <div>📍 {latestLoc.lat.toFixed(4)}, {latestLoc.lng.toFixed(4)}</div>
                  <div>⏰ {new Date(latestLoc.timestamp).toLocaleTimeString()}</div>
                </div>
                {tourist.consentTracking && (
                  <div className="p-2 bg-green-100 rounded-lg text-xs font-bold text-green-800">
                    ✅ Real-time tracking enabled
                  </div>
                )}
              </Popup>
            </Marker>
          );
        })}

        {/* CURRENT USER LOCATION */}
        {currentUserLocation && (
          <CircleMarker
            center={[currentUserLocation.lat, currentUserLocation.lng]}
            radius={12}
            color="#00B4D8"
            weight={3}
            opacity={1}
            fillColor="#00B4D8"
            fillOpacity={0.7}
          >
            <Popup>
              <div className="text-center">
                <div className="font-bold text-blue-800 text-lg mb-2">📍 YOU ARE HERE</div>
                <div className="text-sm text-gray-600">Current position</div>
              </div>
            </Popup>
          </CircleMarker>
        )}

        {/* LIVE ALERT MARKERS */}
        {alerts.slice(0, 10).map((alert) => (
          <CircleMarker
            key={alert.id}
            center={[alert.location?.lat || 13.9167, alert.location?.lng || 78.4867]}
            radius={18}
            color="#EF4444"
            weight={4}
            opacity={1}
            fillColor="#EF4444"
            fillOpacity={0.6}
            className="animate-pulse"
          >
            <Popup>
              <div className="max-w-md">
                <div className="flex items-center gap-3 mb-4 p-3 bg-red-100 rounded-2xl">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                  <div>
                    <div className="font-black text-xl text-red-800">{alert.type.toUpperCase()}</div>
                    <div className="text-sm text-red-700">{new Date(alert.timestamp).toLocaleString()}</div>
                  </div>
                </div>
                {alert.touristId && (
                  <div className="text-sm text-gray-700">
                    Tourist ID: {alert.touristId}
                  </div>
                )}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
