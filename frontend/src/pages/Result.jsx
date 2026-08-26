import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SeverityCard from '../components/SeverityCard';
import { saveHistoryLocal, saveHistory } from '../utils/history';
import { useAuth } from '../contexts/AuthContext';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const data = location.state || {};

  // data: { disease, confidence, severity, description, treatment, imageUrl, overlay }
  if (!data || !data.disease) {
    return (
      <div style={{ padding: 20 }}>
        <p>No result to display. Go back to <button onClick={() => navigate('/home')}>Home</button></p>
      </div>
    );
  }

  // On mount, save to history (frontend-side). Backend may also save if implemented server-side.
  useEffect(() => {
    const rec = {
      userId: user?.uid,
      timestamp: new Date().toISOString(),
      imageUrl: data.imageUrl,
      disease: data.disease,
      severity: data.severity,
      confidence: data.confidence,
      description: data.description,
      treatment: data.treatment
    };
    // Try Firestore via saveHistory, fallback handled inside
    saveHistory(rec).catch(() => saveHistoryLocal(rec));
  }, [data, user]);

  return (
    <div className="container">
      <SeverityCard disease={data.disease} confidence={data.confidence} severity={data.severity} />
      <section>
        <h3>{t(language, 'whatThisIs')}</h3>
        <p>{data.description}</p>
      </section>
      <section>
        <h3>{t(language, 'treatmentSuggestions')}</h3>
        <ol>
          {(data.treatment || []).map((t, i) => <li key={i}>{t}</li>)}
        </ol>
      </section>
      <section>
        <h3>{t(language, 'image')}</h3>
        <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
          {data.imageUrl && <img src={data.imageUrl} alt="leaf" style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />}
          {data.overlay && data.overlay.maskUrl && (
            <img src={data.overlay.maskUrl} alt="overlay" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', opacity: 0.5, pointerEvents: 'none' }} />
          )}
        </div>
      </section>
      <div style={{ marginTop: 12 }}>
        <button onClick={() => navigate('/history')}>{t(language, 'history')}</button>
        <button onClick={() => navigate('/chat')}>{t(language, 'askChatbot')}</button>
        <button onClick={() => navigate('/home')}>{t(language, 'analyseAnother')}</button>
      </div>
    </div>
  );
}
