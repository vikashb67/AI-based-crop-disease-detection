import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { loadHistory } from '../utils/history';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

export default function History() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const arr = await loadHistory(user?.uid);
      setEntries(arr);
    };
    fetch();
  }, [user]);

  return (
    <div className="container">
      <h3>{t(language, 'history')}</h3>
      {entries.length === 0 && <p>{t(language, 'noHistory')}</p>}
      {entries.map((e, i) => (
        <div key={e.id || i} style={{ border: '1px solid #ddd', padding: 8, marginBottom: 8 }}>
          <div>{new Date(e.timestamp?.toDate?.() || e.timestamp || Date.now()).toLocaleString()}</div>
          <div style={{ fontWeight: 'bold' }}>{e.disease} - {e.severity}</div>
          <div>{e.imageUrl && <img src={e.imageUrl} alt="thumb" style={{ maxWidth: 160 }} />}</div>
        </div>
      ))}
    </div>
  );
}
