import React from 'react';

export default function FileUploader({ onSelected, previewUrl }) {
  const handleChange = (e) => {
    const f = e.target.files[0];
    if (f) onSelected(f);
  };
  return (
    <div>
      <input id="fileInput" type="file" accept="image/*" capture="environment" onChange={handleChange} style={{ display: 'block', marginTop: 8 }} />
      {previewUrl && <div style={{ marginTop: 8 }}><img src={previewUrl} alt="preview" style={{ maxWidth: '200px' }} /></div>}
    </div>
  );
}
