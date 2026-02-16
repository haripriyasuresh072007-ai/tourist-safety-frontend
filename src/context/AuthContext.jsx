 
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tourists, setTourists] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('safetravel_user');
    const savedTourists = localStorage.getItem('safetravel_tourists');
    const savedAlerts = localStorage.getItem('safetravel_alerts');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedTourists) setTourists(JSON.parse(savedTourists));
    if (savedAlerts) setAlerts(JSON.parse(savedAlerts));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('safetravel_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('safetravel_tourists', JSON.stringify(tourists));
  }, [tourists]);

  useEffect(() => {
    localStorage.setItem('safetravel_alerts', JSON.stringify(alerts));
  }, [alerts]);

  const login = (email, password) => {
    const validUsers = {
      'admin@police.gov': { role: 'admin', name: 'Police Command Center' },
      'tourist@test.com': { role: 'tourist', name: 'Demo Tourist' },
      'officer1@police.gov': { role: 'police', name: 'Officer Ravi Kumar' }
    };

    if (validUsers[email] && password === '123456') {
      setUser({ email, ...validUsers[email] });
      return true;
    }
    return false;
  };

  const register = (formData) => {
    if (formData.password.length < 6) {
      return false;
    }
    const newUser = {
      ...formData,
      id: Date.now(),
      digitalID: `USER${Date.now().toString().slice(-6)}`,
      registeredAt: new Date().toISOString()
    };
    localStorage.setItem('safetravel_new_users', JSON.stringify([newUser]));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('safetravel_user');
  };

  const value = {
    user, login, register, logout, tourists, setTourists, alerts, setAlerts,
    showRegister, setShowRegister, loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
