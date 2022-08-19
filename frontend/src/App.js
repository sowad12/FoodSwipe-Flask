import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home'
const App = () => {
  return (
   <>
   <Navbar/>
   <Routes>
   <Route path="/" element={<Home/>} />
   <Route path="register" element={<Register />} />
   <Route path="login" element={<Login />} />
   </Routes>

    </> 
  )
}

export default App