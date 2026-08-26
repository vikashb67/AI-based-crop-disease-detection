import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import HomeUpload from './pages/HomeUpload';
import Processing from './pages/Processing';
import Result from './pages/Result';
import Chatbot from './pages/Chatbot';
import History from './pages/History';
import Help from './pages/Help';
import { useAuth } from './contexts/AuthContext';
import NavBar from './components/NavBar';

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading auth...</div>;

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <Welcome />} />
        <Route path="/home" element={user ? <HomeUpload /> : <Navigate to="/" />} />
        <Route path="/processing" element={user ? <Processing /> : <Navigate to="/" />} />
        <Route path="/result" element={user ? <Result /> : <Navigate to="/" />} />
        <Route path="/chat" element={user ? <Chatbot /> : <Navigate to="/" />} />
        <Route path="/history" element={user ? <History /> : <Navigate to="/" />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </div>
  );
}
