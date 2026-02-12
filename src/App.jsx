import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './componentes/Login';
import Navbar from './componentes/NavBar';
import Hero from './componentes/Hero';
import Projects from './componentes/Projects';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Navbar />
      <Hero />
      <Projects />
    </div>
  )
}

export default App
