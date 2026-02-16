import { useState } from 'react';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [tourists, setTourists] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [count, setCount] = useState(0);

  const login = () => {
    setUser({ role: 'admin', name: 'Police Command' });
  };

  const logout = () => {
    setUser(null);
  };

  const addTourist = () => {
    const newTourist = {
      id: Date.now(),
      name: `Tourist #${tourists.length + 1}`,
      digitalID: `TRV${Date.now().toString().slice(-6)}`,
      safetyScore: 85,
      location: { lat: 13.9167, lng: 78.4867 }
    };
    setTourists(prev => [...prev, newTourist]);
  };

  const triggerAlert = () => {
    const newAlert = {
      id: Date.now(),
      efirId: `EFIR${Date.now().toString().slice(-6)}`,
      priority: 'high',
      nearestPolice: 'Ranipet PS'
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  if (!user) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #FEF9E7 0%, #F8FAFC 100%)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '40px',
        textAlign: 'center'
      }}>
        <div style={{ 
          maxWidth: '500px', 
          background: 'rgba(255,255,255,0.95)', 
          borderRadius: '24px', 
          padding: '60px 40px', 
          boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(20px)'
        }}>
          <div style={{ 
            width: '100px', height: '100px', 
            background: 'linear-gradient(135deg, #1E3A8A, #3B82F6)', 
            borderRadius: '24px', 
            margin: '0 auto 30px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center' 
          }}>
            <div style={{ fontSize: '48px' }}>🛡️</div>
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#1E3A8A', margin: '0 0 20px' }}>
            SafeTravel AI
          </h1>
          <p style={{ fontSize: '20px', color: '#666', marginBottom: '40px' }}>
            Ranipet District Police Command Center - Science Day 2026
          </p>
          <button
            onClick={login}
            style={{
              padding: '20px 60px',
              fontSize: '20px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #1E3A8A, #3B82F6)',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              boxShadow: '0 15px 35px rgba(30,58,138,0.4)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 20px 45px rgba(30,58,138,0.5)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 15px 35px rgba(30,58,138,0.4)';
            }}
          >
            👮‍♂️ Enter Police Dashboard
          </button>
          <div style={{ marginTop: '30px', fontSize: '16px', color: '#D2B48C' }}>
            Demo Credentials: admin@police.gov / 123456
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #FEF9E7 0%, #F8FAFC 100%)' }}>
      {/* Topbar */}
      <div style={{ 
        background: 'rgba(255,255,255,0.95)', 
        backdropFilter: 'blur(20px)', 
        borderBottom: '1px solid #F5F5DC', 
        position: 'sticky', top: 0, zIndex: 50,
        padding: '20px 40px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ 
              width: '60px', height: '60px', 
              background: 'linear-gradient(135deg, #1E3A8A, #3B82F6)', 
              borderRadius: '16px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
              <div style={{ fontSize: '32px', color: 'white' }}>🛡️</div>
            </div>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#1E3A8A', margin: 0 }}>
                SafeTravel Command
              </h1>
              <p style={{ margin: 0, color: '#666', fontSize: '16px' }}>{user.role.toUpperCase()} DASHBOARD</p>
            </div>
          </div>
          <button 
            onClick={logout}
            style={{
              padding: '12px 24px',
              background: '#fee2e2',
              color: '#dc2626',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px' }}>
        {activeTab === 'overview' && (
          <div>
            <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#1E3A8A', marginBottom: '30px' }}>
              Command Center Overview
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', marginBottom: '40px' }}>
              <div style={{ 
                height: '500px', 
                background: 'rgba(255,255,255,0.8)', 
                borderRadius: '24px', 
                padding: '30px',
                border: '3px solid #F5F5DC'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1E3A8A', marginBottom: '20px' }}>
                  🗺️ Live Safety Map - Ranipet District
                </h3>
                <div style={{ height: '400px', background: '#E5E7EB', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}>
                  Interactive Map Coming Soon...
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ 
                  padding: '40px', 
                  background: 'rgba(255,255,255,0.8)', 
                  borderRadius: '24px', 
                  textAlign: 'center',
                  border: '2px solid #F5F5DC'
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '20px' }}>🚨</div>
                  <div style={{ fontSize: '48px', fontWeight: '900', color: '#dc2626' }}>{alerts.length}</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1E3A8A' }}>Active Alerts</div>
                </div>
                <div style={{ 
                  padding: '40px', 
                  background: 'rgba(255,255,255,0.8)', 
                  borderRadius: '24px', 
                  textAlign: 'center',
                  border: '2px solid #F5F5DC'
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '20px' }}>🧳</div>
                  <div style={{ fontSize: '48px', fontWeight: '900', color: '#059669' }}>{tourists.length}</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1E3A8A' }}>Tourists Tracked</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tourists' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
              <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#1E3A8A' }}>
                Active Tourists ({tourists.length})
              </h2>
              <div style={{ display: 'flex', gap: '20px' }}>
                <button 
                  onClick={addTourist}
                  style={{
                    padding: '20px 40px',
                    background: 'linear-gradient(135deg, #1E3A8A, #3B82F6)',
                    color: 'white',
                    border:
