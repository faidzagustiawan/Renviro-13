import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import EcoActPage from './pages/EcoActPage'
import DanaHijauPage from './pages/DanaHijauPage'
import TrackHistoryPage from './pages/TrackHistoryPage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'
import EventDetailPage from './pages/EventDetailPage'
import DonationDetailPage from './pages/DonationDetailPage'
import { useTheme } from './contexts/ThemeContext'
import ProtectedRoute from './contexts/ProtectedRoute';
import { supabase } from './services/supabaseClient';

function App() {
  const [session, setSession] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    // Cek sesi hanya jika remember me dipilih
    const savedSession = JSON.parse(localStorage.getItem('supabaseSession'));
    if (savedSession) {
      setSession(savedSession);
      supabase.auth.setSession(savedSession);
    }

    // Pantau perubahan sesi
    const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (newSession && localStorage.getItem('supabaseSession')) {
        localStorage.setItem('supabaseSession', JSON.stringify(newSession));
        setSession(newSession);
      } else {
        localStorage.removeItem('supabaseSession');
        setSession(null);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe(); // Perbaiki unsubscribe
    };
  }, []);


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route element={<ProtectedRoute requireAuth={false} />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute requireAuth={false} />}>
          <Route path="signup" element={<SignupPage />} />
        </Route>
        <Route path="ecoact" element={<EcoActPage />} />
        <Route element={<ProtectedRoute requireAuth={true} />}>
          <Route path="ecoact/:id" element={<EventDetailPage />} />
        </Route>
        <Route path="dana-hijau" element={<DanaHijauPage />} />
        <Route element={<ProtectedRoute requireAuth={true} />}>
          <Route path="dana-hijau/:id" element={<DonationDetailPage />} />
        </Route>
        <Route element={<ProtectedRoute requireAuth={true} />}>
          <Route path="track-history" element={<TrackHistoryPage />} />
        </Route>
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App