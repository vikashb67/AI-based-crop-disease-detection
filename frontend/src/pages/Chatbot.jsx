import React, { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { t, tq } from '../i18n';

export default function Chatbot() {
  const { language } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);

  const quick = tq(language, 'quickQuestions');

  const send = async (msg) => {
    if (!msg) return;
    setMessages(m => [...m, { from: 'user', text: msg }]);
    setInput('');
    // Call backend /chat - for MVP we show a hardcoded response
    setTimeout(() => {
      setMessages(m => [...m, { from: 'bot', text: t(language, 'tagline') }]);
    }, 800);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser');
      return;
    }
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : language === 'kn' ? 'kn-IN' : 'en-US';
    recognitionRef.current.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setInput(text);
    };
    recognitionRef.current.onend = () => setListening(false);
    recognitionRef.current.start();
    setListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setListening(false);
  };

  return (
    <div className="container">
      <h3>{t(language, 'chatbotTitle')}</h3>
      <div>
        {quick.map((q, i) => (
          <button key={i} onClick={() => send(q)} style={{ marginRight: 6 }}>{q}</button>
        ))}
      </div>
      <div style={{ marginTop: 12, height: 300, overflow: 'auto', border: '1px solid #ddd', padding: 8 }}>
        {messages.map((m, i) => <div key={i} style={{ textAlign: m.from === 'user' ? 'right' : 'left', margin: 6 }}>{m.text}</div>)}
      </div>
      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        <input style={{ flex: 1 }} value={input} onChange={e => setInput(e.target.value)} placeholder={t(language, 'chatbotTitle')} />
        <button onClick={() => send(input)}>Send</button>
        {!listening ? (
          <button onClick={startListening}>🎤</button>
        ) : (
          <button onClick={stopListening}>■</button>
        )}
      </div>
    </div>
  );
}
