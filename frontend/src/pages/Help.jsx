import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

export default function Help() {
  const { language } = useLanguage();
  return (
    <div className="container">
      <h3>{t(language, 'help')} & Guide</h3>
      <h4>How to take a good leaf photo</h4>
      <ul>
        <li>Use good lighting</li>
        <li>Focus on a single leaf</li>
        <li>Avoid shadows and clutter</li>
      </ul>
      <h4>Supported crops</h4>
      <p>Tomato, Potato, Maize (MVP) — add more in future releases.</p>
      <h4>Contact</h4>
      <p>If you need expert help, contact your local agricultural extension worker.</p>
    </div>
  );
}
