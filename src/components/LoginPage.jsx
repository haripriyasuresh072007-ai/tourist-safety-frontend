import { useState } from 'react';
import { Shield, Mail, Lock, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import RegisterPage from './RegisterPage';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (login(email, password)) {
      return;
    }
    setError('Invalid credentials! Try demo accounts or register.');
  };

  if (showRegister) return <RegisterPage onSwitchToLogin={() => setShowRegister(false)} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-100 via-white to-beige-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full glass rounded-3xl shadow-3xl overflow-hidden">
        <div className="p-10 text-center bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Shield className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-black mb-3">SafeTravel AI</h1>
          <p className="opacity-90">Ranipet District Police Command Center</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-red-800 text-sm animate-pulse">
              {error}
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs font-mono space-y-1">
                <div>👮‍♂️ Police: admin@police.gov / 123456</div>
                <div>🧳 Tourist: tourist@test.com / 123456</div>
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-white/70 border-2 border-beige-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg placeholder-gray-500"
              placeholder="admin@police.gov"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-white/70 border-2 border-beige-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg placeholder-gray-500"
              placeholder="123456"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white py-5 px-8 rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 border-2 border-blue-500/50"
          >
            Enter Dashboard
          </button>
        </form>

        <div className="p-10 pt-0 text-center border-t border-beige-200">
          <button 
            onClick={() => setShowRegister(true)}
            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-bold text-lg group"
          >
            <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Register New Tourist
          </button>
        </div>
      </div>
    </div>
  );
}
