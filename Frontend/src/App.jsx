import React from 'react'
import './App.css'
import Home from './Pages/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Profile from './Pages/Profile'
import UploadPost from './Pages/UploadPost'
import Messages from './Pages/Messages'


function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/upload' element={<UploadPost/>}/>
        <Route path='/messages' element={<Messages/>}/>
      </Routes>
      </BrowserRouter>
  )
}

export default App
