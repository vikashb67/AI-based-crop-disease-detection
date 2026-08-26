import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

export default function Processing() {
  const { language } = useLanguage();
  const text = t(language, 'analysing');
  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <div style={{ fontSize: 64 }}>🍃</div>
      <h3>{text}</h3>
    </div>
  );
}
