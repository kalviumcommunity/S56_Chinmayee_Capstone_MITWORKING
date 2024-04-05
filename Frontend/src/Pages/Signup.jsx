import React from 'react'
import './Signup.css'
import { Link } from "react-router-dom";
import Carousel from '../Components/Carousel'

export default function Signup() {

  return (
    <>
    <div className='signup-page'>
      <Carousel/>
      <div className='signup-div'>
            <div className='signup-form'>
                <h2 className='signup-title'>Signup</h2>
                <div className='signup-input-box'>
                    <input className='signup-username-input' type="text" required="required"/>
                    <span>Username</span>
                </div>
                <div className='signup-input-box'>
                    <input className='signup-password-input' type="text" required="required" />
                    <span>Email</span>
                </div>
                <div className='signup-input-box'>
                    <input className='signup-password-input' type="password" required="required" />
                    <span>Password</span>
                </div>
                <div className='signup-input-box'>
                    <input className='signup-password-input' type="password" required="required" />
                    <span>Confirm Password</span>
                </div>

                <Link to={"/"}><button className='signup-btn'>Sign up</button></Link>
                <Link to={"/"}><h3 className='login-text'>Already have an account? Login</h3></Link>
            </div>
        </div>
      </div> 
    </>
  )
}
