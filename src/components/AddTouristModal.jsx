 import { useState } from 'react';
import { X, User, MapPin, Phone, Globe, CreditCard } from 'lucide-react';

export default function AddTouristModal({ isOpen, onClose, onAddTourist }) {
  const [formData, setFormData] = useState({
    name: '', address: '', nationality: '', mobile: '', altMobile: '', 
    emergencyMobile: '', aadhar: '', location: { lat: 13.9167, lng: 78.4867 }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const tourist = {
      ...formData,
      id: Date.now(),
      digitalID: `TRV${Date.now().toString().slice(-6)}`,
      safetyScore: 85,
      status: 'active',
      timestamp: new Date().toISOString(),
      nearestPolice: 'Ranipet PS (+2.1km)'
    };
    onAddTourist(tourist);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 glass rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-3xl">
        <div className="p-8 border-b border-beige-200">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black text-blue-900 flex items-center gap-3">
              <User className="w-8 h-8" />
              Register New Tourist
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-red-100 rounded-2xl text-red-600 hover:scale-110 transition-all">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-5 py-4 border-2 border-beige-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="Ravi Kumar"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Nationality
              </label>
              <input
                type="text"
                value={formData.nationality}
                onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                className="w-full px-5 py-4 border-2 border-beige-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="Indian"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Address
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              rows="3"
              className="w-full px-5 py-4 border-2 border-beige-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-vertical"
              placeholder="123 Arcot Road, Ranipet, Tamil Nadu 632401"
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                Mobile No.
              </label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                className="w-full px-5 py-4 border-2 border-beige-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="+91 98765 43210"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                Alt Mobile
              </label>
              <input
                type="tel"
                value={formData.altMobile}
                onChange={(e) => setFormData({...formData, altMobile: e.target.value})}
                className="w-full px-5 py-4 border-2 border-beige-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="+91 98765 43211"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                Emergency No.
              </label>
              <input
                type="tel"
                value={formData.emergencyMobile}
                onChange={(e) => setFormData({...formData, emergencyMobile: e.target.value})}
                className="w-full px-5 py-4 border-2 border-beige-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="+91 100"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              Aadhar Number
            </label>
            <input
              type="text"
              value={formData.aadhar}
              onChange={(e) => setFormData({...formData, aadhar: e.target.value})}
              maxLength="12"
              className="w-full px-5 py-4 border-2 border-beige-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="1234 5678 9012"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-700 to-blue-500 text-white py-4 px-8 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all"
            >
              ✅ Register Tourist
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-4 bg-gray-200 text-gray-800 rounded-2xl font-bold hover:bg-gray-300 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

