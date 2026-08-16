import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Dashboard from './pages/Dashboard'
import Leave from './pages/Leave'
import Employees from './pages/Employees'
import Policies from './pages/Policies'
import ChatPopup from './components/ChatPopup/ChatPopup'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/policies" element={<Policies />} />
        </Routes>
      </main>
      <ChatPopup />
    </div>
  )
}
