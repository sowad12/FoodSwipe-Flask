import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import Navbar from './components/Navbar/Navbar'
import FoodMenu from './components/RestaurantItem/FoodMenu'
import Home from './components/Home'
import SingleFood from './components/singleFoodpage/singleFood'

const App = () => {
  return (
   <>
   <Navbar/>
   <Routes>
   <Route path="/" element={<Home/>} />
   <Route path="/RestaurantMenu/:Restaurant" element={<FoodMenu/>} />
   <Route path="register" element={<Register />} />
   <Route path="login" element={<Login />} />
   <Route path="/SingleFood/:foodRestId/:foodName/:id" element={<SingleFood/>} />
   </Routes>

    </> 
  )
}

export default App