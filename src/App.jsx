import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { DarkModeProvider } from './contexts/DarkModeContext'
import Footer from './components/Footer'
import About from './components/About'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Contact from './components/Contact'
import { AnimatePresence, motion } from 'framer-motion'



// Component để wrap routes với animation
const AnimatedRoutes = () => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      x: 20,
      scale: 0.98
    },
    in: {
      opacity: 1,
      x: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      x: -20,
      scale: 0.98
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="page-wrapper"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </DarkModeProvider>
  )
}

export default App
