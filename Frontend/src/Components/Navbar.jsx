import React from 'react'
import './Navbar.css'
import home from '../assets/home.png'
import chat from '../assets/chat.png'
import edit from '../assets/edit.png'
import theme from '../assets/theme.png'
import profile from '../assets/profile-user.png'
import logo from '../assets/logo.png'
import { Link, useNavigate, useLocation } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation();
  

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    navigate('/');
  };

  const getActiveClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <>
      <nav className='navbar'>
      <Link to={"/home"}><img className='logo' src={logo} alt="logo" /></Link>

        <Link to={"/home"} className={`nav-content home ${getActiveClass('/home')}`}>
            <img className='home-icon icon' src={home} alt="home-icon" />
            <h2 className='nav-text'>Home</h2>
        </Link>

        <Link to={"/profile"} className={`nav-content profile ${getActiveClass('/profile')}`}>
            <img className='profile-icon icon' src={profile} alt="profile-icon" />
            <h2 className='nav-text'>Profile</h2>
        </Link>

        <Link to={"/upload"} className={`nav-content create-post ${getActiveClass('/upload')}`}>
            <img className='createPost-icon icon' src={edit} alt="post-icon" />
            <h2 className='nav-text'>Create post</h2>
        </Link>

        <Link to={"/messages"} className={`nav-content messages ${getActiveClass('/messages')}`}>
            <img className='messages-icon icon' src={chat} alt="messages-icon" />
            <h2 className='nav-text'>Messages</h2>
        </Link>
<<<<<<< HEAD
        
=======

>>>>>>> bde25b5f83f3eebda41b11c2cbbccc0ae6db7fce
        <button className='logout-btn' onClick={handleLogout}>Logout</button>      </nav>
    </>
  )
}
