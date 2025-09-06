import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { DarkModeProvider } from './contexts/DarkModeContext'

function App() {
  return (
    <DarkModeProvider>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Home />
        </main>
      </div>
    </DarkModeProvider>
  )
}

export default App
