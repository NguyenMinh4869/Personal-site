import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { DarkModeProvider } from './contexts/DarkModeContext'
import Footer from './components/Footer'
import About from './components/About'
import { BrowserRouter, Routes, Route } from 'react-router-dom'



function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </DarkModeProvider>
  )
}

export default App
