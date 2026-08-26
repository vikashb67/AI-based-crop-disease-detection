import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

export default function Welcome() {
  const { login, register } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Very simple login/register UI for demo/MVP
  const handleLogin = async () => {
    setError(null);
    try { await login(email, password); } catch (e) { setError(e.message); }
  };
  const handleRegister = async () => {
    setError(null);
    try { await register(email, password); } catch (e) { setError(e.message); }
  };

  return (
    <div className="app-container">
      <div className="top-nav">
        <div className="app-title">
          <img src="/logo.png" alt="logo" />
          <div>
            <h1>{t(language, 'appName')}</h1>
            <div className="app-sub">{t(language, 'tagline')}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <select value={language} onChange={e => setLanguage(e.target.value)} className="language-select">
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="kn">ಕನ್ನಡ</option>
          </select>
        </div>
      </div>

      <div className="hero">
        <img src="/logo.png" alt="leaf" onError={(e)=>{e.target.style.display='none'}} />
        <div>
          <h2>{t(language, 'appName')}</h2>
          <p>{t(language, 'tagline')}</p>
        </div>
      </div>

      <div className="card welcome-card" style={{ marginTop: 24 }}>
        <h2>{t(language, 'welcomeTitle') || t(language, 'appName')}</h2>
        <p className="instruction">{t(language, 'tagline')}</p>

        <div style={{ width: '100%', maxWidth: 480, marginTop: 12 }}>
          <input aria-label="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input-field" style={{ marginBottom: 12 }} />
          <input aria-label="password" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="input-field" style={{ marginBottom: 12 }} />

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={handleLogin} className="large-cta">{t(language, 'login')}</button>
            <button onClick={handleRegister} className="small-btn">{t(language, 'register')}</button>
          </div>

          {error && <div className="error-text">{error}</div>}
        </div>
      </div>
    </div>
  );
}
