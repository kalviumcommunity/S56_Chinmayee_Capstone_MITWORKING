import React from 'react'
import './Messages.css'
import home from '../assets/home.png'
import chat from '../assets/chat.png'
import edit from '../assets/edit.png'
import theme from '../assets/theme.png'
import profile from '../assets/profile-user.png'
import logo from '../assets/logo.png'
import profile1 from  '../assets/profile1.jpg'
import profile2 from '../assets/profile2.jpg'
import profile3 from '../assets/profile4.jpg'
import {Link} from 'react-router-dom'


export default function Messages() {
  return (
    <div className='msg-page'>
      {/* navbar */}
      <nav>
        <img className='msg-logo' src={logo} alt="logo of website" />

        <div className='msg-icons'>
            <Link to={'/home'}><img src={home} alt="home icon" /></Link>
            <Link to={'/messages'}><img src={chat} alt="chat icon" /></Link>
            <Link to={'/upload'}><img src={edit} alt="edit icon" /></Link>
            <Link to={'/theme'}><img src={theme} alt="theme icon" /></Link>
            <Link to={'/profile'}><img src={profile} alt="profile icon" /></Link>
        </div>
      </nav>

      <div className='msg-container'>
        {/* left side */}
        <div className='contacts'>
            <h2>Messages</h2>
            <div className='prev-contact'>
                <img src={profile1} alt="profile of previous person" />
                <div>
                    <h3>Shriyansh</h3>
                    <h4>Offline</h4>
                </div>
            </div>
            <div className='prev-contact'>
                <img src={profile2} alt="profile of previous person" />
                <div>
                    <h3>Paras</h3>
                    <h4>Offline</h4>
                </div>
            </div>
            <div className='prev-contact'>
                <img src={profile3} alt="profile of previous person" />
                <div>
                    <h3>Ayush</h3>
                    <h4>Offline</h4>
                </div>
            </div>
        </div>
        
        {/* right side */}
        <div className='chat-section'>
            <div className='chat-info'>
                <img src={profile1} alt="profile of current person" />
                <div className='curr-contact'>
                    <h3>Ayush</h3>
                    <h4>Online</h4>
                </div>
            </div>

            <div className='msg-div'>

              <div className='msg1'>
                <div className='sent-msg'>
                  <p>Hey there how was your weekend?</p>
                  <span className='msg-time'>10:00 AM</span>
                </div>
              </div>

              <div className='msg2'>
                <div className='received-msg'>
                    <p>Not bad, thanks for asking. Spent most of it catching up on some reading. </p>
                    <span className='msg-time'>10:01 AM</span>
                </div>
              </div>

              <div className='msg2'>
                <div className='received-msg'>
                    <p> How about you?</p>
                    <span className='msg-time'>10:01 AM</span>
                </div>
              </div>

              <div className='msg1'>
                <div className='sent-msg'>
                  <p>Pretty chill, went for a hike with some friends and then binged a new series on Netflix.</p>
                  <span className='msg-time'>10:02 AM</span>
                </div>
              </div>
              
              {/* message input */}
              <input type="text" placeholder='Type your message...'/>

            </div>
        </div>

      </div>

    </div>
  )
}
