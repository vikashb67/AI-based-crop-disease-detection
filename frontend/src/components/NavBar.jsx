import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

export default function NavBar() {
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  return (
    <nav className="nav">
      <div>
        <Link to="/home">{t(language, 'home')}</Link> | <Link to="/history">{t(language, 'history')}</Link> | <Link to="/help">{t(language, 'help')}</Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <select value={language} onChange={e => setLanguage(e.target.value)} aria-label="language-select">
          <option value="en">EN</option>
          <option value="hi">HI</option>
          <option value="kn">KN</option>
        </select>
        {user ? (<button onClick={() => logout()}>{t(language, 'login')}</button>) : (<Link to="/">{t(language, 'login')}</Link>)}
      </div>
    </nav>
  );
}
