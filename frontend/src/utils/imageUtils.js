// src/utils/imageUtils.js

/**
 * Convert a File object to a Base64 string
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

/**
 * Validate if the file is an image
 */
export function isImageFile(file) {
  return file && file.type.startsWith("image/");
}

/**
 * Resize an image using a canvas
 */
export function resizeImage(imageFile, maxWidth, maxHeight) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      // Maintain aspect ratio
      if (maxWidth && width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      if (maxHeight && height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      resolve(canvas.toDataURL("image/jpeg"));
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(imageFile);
  });
}

/**
 * Compress image file by resizing and adjusting quality.
 * Returns a File object suitable for upload.
 * @param {File} file
 * @param {number} maxWidth
 * @param {number} quality 0..1
 */
export async function compressImage(file, maxWidth = 1024, quality = 0.8) {
  if (!file) return file;
  // Resize first (keep height unconstrained by passing large maxHeight)
  const maxHeight = 2000;
  const dataUrl = await resizeImage(file, maxWidth, maxHeight);
  // Convert dataURL to Blob with quality by drawing to canvas and using toBlob
  const blob = await (await fetch(dataUrl)).blob();
  // Optionally re-encode to desired quality using canvas
  const img = document.createElement('img');
  const dataUrlPromise = new Promise((resolve, reject) => {
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((b) => {
        if (!b) reject(new Error('Failed to compress image'));
        else resolve(b);
      }, 'image/jpeg', quality);
    };
    img.onerror = (e) => reject(e);
    img.src = dataUrl;
  });
  const outBlob = await dataUrlPromise;
  const outFile = new File([outBlob], file.name || 'image.jpg', { type: 'image/jpeg' });
  return outFile;
}
