import React from 'react'
import './Navbar.css'
import home from '../assets/home.png'
import chat from '../assets/chat.png'
import edit from '../assets/edit.png'
import theme from '../assets/theme.png'
import profile from '../assets/profile-user.png'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
      <nav className='navbar'>
      <Link to={"/home"}><img className='logo' src={logo} alt="logo" /></Link>

        <Link to={"/home"}className='nav-content home'>
            <img className='home-icon icon' src={home} alt="home-icon" />
            <h2 className='nav-text'>Home</h2>
        </Link>

        <Link to={"/profile"} className='nav-content profile'>
            <img className='profile-icon icon' src={profile} alt="profile-icon" />
            <h2 className='nav-text'>Profile</h2>
        </Link>

        <Link to={"/upload"} className='nav-content create-post'>
            <img className='createPost-icon icon' src={edit} alt="post-icon" />
            <h2 className='nav-text'>Create post</h2>
        </Link>

        <div className='nav-content messages'>
            <img className='messages-icon icon' src={chat} alt="messages-icon" />
            <h2 className='nav-text'>Messages</h2>
        </div>

        <div className='nav-content theme'>
            <img className='theme-icon icon' src={theme} alt="theme-icon" />
            <h2 className='nav-text'>Theme</h2>
        </div>

        <button className='logout-btn'>Logout</button>
      </nav>
    </>
  )
}
