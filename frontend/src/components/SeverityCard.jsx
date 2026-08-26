import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

function severityColor(sev) {
  if (!sev) return '#ccc';
  const s = sev.toLowerCase();
  if (s === 'high') return '#ff4d4f';
  if (s === 'medium') return '#ffa940';
  if (s === 'low' || s === 'healthy') return '#52c41a';
  return '#ccc';
}

export default function SeverityCard({ disease, confidence, severity }) {
  const { language } = useLanguage();
  const color = severityColor(severity);
  return (
    <div style={{ background: color, color: '#fff', padding: 16, borderRadius: 8 }}>
      <h2 style={{ margin: 0 }}>{disease}</h2>
      <div>{t(language, 'confidence') || 'Confidence'}: {Math.round((confidence || 0) * 100)}%</div>
      <div>{t(language, 'severity') || 'Severity'}: {severity}</div>
    </div>
  );
}
