import { useEffect } from 'react'
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
import { useTheme } from './contexts/ThemeContext'

function App() {
  const { theme } = useTheme()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="ecoact" element={<EcoActPage />} />
        <Route path="ecoact/:id" element={<EventDetailPage />} />
        <Route path="dana-hijau" element={<DanaHijauPage />} />
        <Route path="track-history" element={<TrackHistoryPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App