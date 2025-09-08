import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { DarkModeProvider } from './contexts/DarkModeContext'
import Footer from './components/Footer'


function App() {
  return (
    <DarkModeProvider>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Home />
        </main>
        <Footer />
      </div>
    </DarkModeProvider>
  )
}

export default App
