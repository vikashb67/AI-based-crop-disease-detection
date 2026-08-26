import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUploader from '../components/FileUploader';
import { useAuth } from '../contexts/AuthContext';
import { uploadImage } from '../utils/api';
import BottomNav from '../components/BottomNav';
import { useLanguage } from '../contexts/LanguageContext';
import { t, tq } from '../i18n';
import { compressImage } from '../utils/imageUtils';

export default function HomeUpload() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();

  const onSelected = async (f) => {
    try {
      const compressed = await compressImage(f, 1024, 0.8);
      setFile(compressed);
      setPreviewUrl(URL.createObjectURL(compressed));
    } catch (e) {
      // fallback to original
      setFile(f);
      setPreviewUrl(URL.createObjectURL(f));
    }
  };

  const handleAnalyse = async () => {
    if (!file) return alert('Please select an image');
    // Upload and call backend
    navigate('/processing', { state: { fileName: file.name } });
    try {
      const result = await uploadImage(file, user?.uid || 'anon', language);
      // backend predict call is triggered in uploadImage util
      // navigate to result page after predict returns
      navigate('/result', { state: result.data });
    } catch (err) {
      console.error(err);
      alert('Error analysing image');
      navigate('/home');
    }
  };

  return (
    <div className="container" style={{ paddingBottom: 80 }}>
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <button className="large-cta" onClick={() => document.getElementById('fileInput').click()}>{t(language, 'uploadPhoto')}</button>
        <div style={{ marginTop: 12 }}>
          <button onClick={() => document.getElementById('fileInput').click()}>{t(language, 'chooseFromGallery')}</button>
        </div>
      </div>
      <p style={{ textAlign: 'center' }}>{t(language, 'takeClearPhoto')}</p>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
        <div className="preview" style={{ width: 220, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {previewUrl ? <img src={previewUrl} alt="sample" style={{ maxWidth: '100%', maxHeight: '100%' }} /> : <img src="/black.jpg" alt="sample" style={{ maxWidth: '100%', maxHeight: '100%' }} />}
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <FileUploader onSelected={onSelected} previewUrl={previewUrl} />
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={handleAnalyse} disabled={!file}>{t(language, 'uploadPhoto')}</button>
      </div>

      <BottomNav />
    </div>
  );
}
