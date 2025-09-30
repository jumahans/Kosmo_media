import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NewsPage from './pages/News'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import ReporterPage from './pages/Reporter'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Default landing page → News */}
        <Route path="/" element={<Navigate to="/news" replace />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reporter" element={<ReporterPage />} />
        {/* Catch-all → redirect to news */}
        <Route path="*" element={<Navigate to="/news" replace />} />
      </Routes>
    </div>
  )
}

export default App
