import React from 'react'
import './Home.css'
import Navbar from './Navbar'
import Followers from './Followers'
import post1 from '../assets/post1.jpg'
import post2 from '../assets/post2.jpg'
import heart from '../assets/heart.png'
import message from '../assets/messenger.png'
import share from '../assets/share.png'
import profile from '../assets/profile3.jpg'


export default function Home() {
  return (
    <>
      <div className='home-box'>
        <Navbar/>
        <Followers/>
        <input className='search-box' placeholder='Search for people' type="text" />
        {/* posts container*/}
        <div className='posts-container'>

          <div className='post'>
            <img className='post-img' src={post1} alt="post1" />

            <div className='post-icons'>
              <img className='like-icon post-icon' src={heart} alt="heart" />
              <img className='comment-icon post-icon' src={message} alt="message" />
              <img className='share-icon post-icon' src={share} alt="share" />
            </div>

            <h5 className='likes'>400 Likes</h5>
            <div className='caption'>
              <h3 className='post-name'>Betty Gilbert: </h3>
              <h3 className='post-caption'> Bright like sunflower 🌻🌻</h3>
            </div>
  
          </div>

          <div className='post'>
            <img className='post-img' src={post2} alt="post2" />

            <div className='post-icons'>
              <img className='like-icon post-icon' src={heart} alt="heart" />
              <img className='comment-icon post-icon' src={message} alt="message" />
              <img className='share-icon post-icon' src={share} alt="share" />
            </div>

            <h5 className='likes'>400 Likes</h5>
            <div className='caption'>
              <h3 className='post-name'>Betty Gilbert: </h3>
              <h3 className='post-caption'>Bright like sunflower 🌻🌻</h3>
            </div>
  
          </div>

        </div>

        {/* Profile card */}
        <div className='profile-card'>
            <img className='prf-img' src={profile} alt="" />
            <h2 className='prf-name'>Betty Gilbert</h2>
            <h2 className='prf-username'>@bettygilbert</h2>

            <div className='lines'>
              <div className='top-line'></div>
                <h3 className='numOfFollwers'>1000 <br />Followers</h3>
              <div className='middle-line'></div>
                <h3 className='numOfFollwing'>300 <br />Following</h3>
              <div className='bottom-line'></div>
            </div>

            <button className='prf-btn'>Profile</button>
        </div>

      </div>
    </>
  )
}
