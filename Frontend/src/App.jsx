import React from 'react'
import './App.css'
import Home from './Components/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/Signup'


function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
      </BrowserRouter>
  )
}

export default App
