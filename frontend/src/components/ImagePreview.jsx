import React from 'react';

export default function ImagePreview({ src }) {
  if (!src) return null;
  return <img src={src} alt="preview" style={{ maxWidth: '100%' }} />;
}
