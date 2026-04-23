import { useState } from 'react'
import './App.css'
// import { entries } from './data'
import { CardList } from './Cards';
import { Routes, Route } from 'react-router';
import Home from './Home'
import Blog from './Blog'
import Contacto from './Contacto'
import Navbar from './Navbar'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </>
  )
}

export default App
