import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

export default function BottomNav() {
  const { language } = useLanguage();
  return (
    <div className="bottom-nav">
      <Link to="/home">{t(language, 'home')}</Link>
      <Link to="/history">{t(language, 'history')}</Link>
      <Link to="/help">{t(language, 'help')}</Link>
    </div>
  );
}
