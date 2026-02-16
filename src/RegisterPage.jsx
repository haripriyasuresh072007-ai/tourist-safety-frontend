import { useState } from 'react';
import { UserPlus, Mail, Lock, Phone, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoginPage from './LoginPage';

export default function RegisterPage({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', role: 'tourist'
  });
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (register(formData)) {
      alert('✅ Registration successful! Please login.');
      onSwitchToLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-100 via-white to-beige-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full glass rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-10 text-center bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <UserPlus className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-black mb-3">Join SafeTravel</h1>
          <p className="opacity-90">Create your safety account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-red-800 text-sm animate-pulse">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-5 py-4 bg-white/70 border-2 border-beige-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-5 py-4 bg-white/70 border-2 border-beige-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg"
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-5 py-4 bg-white/70 border-2 border-beige-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="+91 98765 43210"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600" />
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-5 py-4 bg-white/70 border-2 border-beige-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="••••••••"
                minLength="6"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3">Account Type</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-5 py-4 bg-white/70 border-2 border-beige-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg"
            >
              <option value="tourist">🧳 Tourist</option>
              <option value="police">👮‍♂️ Police Officer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white py-5 px-8 rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 border-2 border-blue-500/50"
          >
            Create Account
          </button>

          <div className="text-center pt-6">
            <p className="text-sm text-gray-600">
              Already have an account? 
              <button 
                onClick={onSwitchToLogin}
                className="font-bold text-blue-700 hover:text-blue-900 ml-1 transition-colors"
              >
                Sign In
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
