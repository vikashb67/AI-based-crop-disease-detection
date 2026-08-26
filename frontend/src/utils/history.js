// history helper: tries Firestore, falls back to localStorage
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

const LOCAL_KEY = 'crop_detection_history_v1';

export async function saveHistory(record) {
  // record should include userId optional, timestamp, imageUrl, disease, severity, confidence, description, treatment
  try {
    if (db && record.userId) {
      const col = collection(db, `users/${record.userId}/history`);
      await addDoc(col, { ...record, timestamp: new Date(record.timestamp || Date.now()) });
      return;
    }
  } catch (e) {
    console.warn('Firestore save failed, falling back to localStorage', e.message);
  }
  // fallback
  saveHistoryLocal(record);
}

export function saveHistoryLocal(record) {
  const arr = loadHistoryLocal();
  arr.unshift(record);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(arr.slice(0, 200))); // keep last 200
}

export function loadHistoryLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) { return []; }
}

export async function loadHistory(userId) {
  // Try Firestore first
  try {
    if (db && userId) {
      const col = collection(db, `users/${userId}/history`);
      const q = query(col, orderBy('timestamp', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    }
  } catch (e) {
    console.warn('Firestore load failed, falling back to local', e.message);
  }
  return loadHistoryLocal();
}
