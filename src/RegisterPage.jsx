import { useState } from 'react';
import { UserPlus, Mail, Lock, Phone } from 'lucide-react';

export default function RegisterPage({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', role: 'tourist'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      alert('Password must be 6+ characters');
      return;
    }
    alert(`✅ Registered: ${formData.name}`);
    if (onSwitchToLogin) onSwitchToLogin();
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #FEF9E7 0%, #F8FAFC 100%)',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: '400px', 
        width: '100%', 
        background: 'rgba(255,255,255,0.95)', 
        borderRadius: '24px', 
        padding: '40px', 
        boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px', padding: '30px', background: 'linear-gradient(135deg, #1E3A8A, #3B82F6)', borderRadius: '20px', color: 'white' }}>
          <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.2)', borderRadius: '20px', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserPlus size={40} />
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', margin: '0 0 10px' }}>Join SafeTravel</h1>
          <p style={{ opacity: 0.9, margin: 0 }}>Create your safety account</p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#1E3A8A' }}>Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{
                width: '100%', padding: '16px', border: '2px solid #F5F5DC', 
                borderRadius: '16px', fontSize: '16px',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
              onBlur={(e) => e.target.style.borderColor = '#F5F5DC'}
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#1E3A8A' }}>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={{
                width: '100%', padding: '16px', border: '2px solid #F5F5DC', 
                borderRadius: '16px', fontSize: '16px'
              }}
              placeholder="john@example.com"
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#1E3A8A' }}>Phone</label>
              <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '16px', border: '2px solid #F5F5DC', borderRadius: '16px' }} placeholder="+91 98765 43210" />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#1E3A8A' }}>Password</label>
              <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} style={{ width: '100%', padding: '16px', border: '2px solid #F5F5DC', borderRadius: '16px' }} placeholder="••••••••" minLength="6" required />
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: '100%', padding: '20px', background: 'linear-gradient(135deg, #1E3A8A, #3B82F6)',
              color: 'white', border: 'none', borderRadius: '16px', fontSize: '18px',
              fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 10px 30px rgba(30,58,138,0.4)'
            }}
          >
            Create Account
          </button>

          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: 0, color: '#666' }}>
              Already registered? 
              <button type="button" onClick={onSwitchToLogin} style={{ color: '#1E3A8A', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer' }}>
                Sign In
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
