import { useState } from 'react'
import './App.css'
// import { entries } from './data'
import { CardList } from './Cards';
import { Routes, Route, Navigate } from 'react-router';
import Home from './Home'
import Blog from './Blog'
import Contacto from './Contacto'
import Navbar from './Navbar'
import Post from './Post'
import Author from './Author';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/blog/:id_post" element={<Post />} />
        <Route path="/blog/author/:id_author" element={<Author />} />
      </Routes>
    </>
  )
}

export default App
