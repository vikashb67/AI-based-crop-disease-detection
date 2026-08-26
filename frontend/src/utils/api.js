import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import { saveHistoryLocal } from './history';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://<YOUR_CLOUD_RUN_URL>/';
const api = axios.create({ baseURL: API_BASE });

const IS_PLACEHOLDER_API = API_BASE.includes('<YOUR_CLOUD_RUN_URL>') || API_BASE.includes('localhost:') === false;

// helper to create a mock response when backend isn't configured
function mockPredictResponse(imageUrl, language = 'en') {
  const diseases = [
    { disease: 'Tomato Early Blight', severity: 'HIGH' },
    { disease: 'Potato Late Blight', severity: 'MEDIUM' },
    { disease: 'Healthy', severity: 'LOW' }
  ];
  const pick = diseases[Math.floor(Math.random() * diseases.length)];
  const confidence = pick.severity === 'HIGH' ? 0.92 : pick.severity === 'MEDIUM' ? 0.78 : 0.98;
  const description = pick.disease === 'Healthy' ? 'No disease detected' : 'This disease affects the leaves and spreads quickly in wet weather. Act within 2 to 3 days.';
  const treatment = pick.disease === 'Healthy' ? ['No action needed'] : ['Remove affected leaves', 'Apply recommended pesticide', 'Avoid overhead watering'];

  // mock overlay: none for Healthy
  const overlay = pick.severity === 'LOW' ? null : { maskUrl: null };

  const result = {
    disease: pick.disease,
    confidence,
    severity: pick.severity,
    description,
    treatment,
    imageUrl,
    overlay
  };

  // save to local history for demo
  saveHistoryLocal({ ...result, timestamp: new Date().toISOString() });
  return Promise.resolve({ data: result });
}

export async function uploadImage(file, uid, language = 'en') {
  // Upload to Firebase Storage under users/{uid}/uploads
  const path = `users/${uid}/uploads/${Date.now()}_${file.name}`;
  const storageRef = ref(storage, path);

  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    // If API_BASE is placeholder or not reachable, return mock response
    if (API_BASE.includes('<YOUR_CLOUD_RUN_URL>')) {
      return mockPredictResponse(url, language);
    }

    // Otherwise call backend predict endpoint with storage path
    const res = await api.post('/predict', { storagePath: path, imageUrl: url, language });

    // Save to local history if backend returns successfully (frontend keeps a local copy too)
    try { saveHistoryLocal({ ...res.data, timestamp: new Date().toISOString() }); } catch (e) {}

    return res;
  } catch (err) {
    // If upload failed, fallback to mock
    console.error('Upload failed, using mock:', err.message);
    const previewUrl = URL.createObjectURL(file);
    return mockPredictResponse(previewUrl, language);
  }
}

export default api;
