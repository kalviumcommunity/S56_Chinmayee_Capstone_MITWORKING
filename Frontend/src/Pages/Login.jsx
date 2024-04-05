import React from 'react'
import './Login.css'
import { Link } from "react-router-dom";
import Carousel from '../Components/Carousel';

export default function Login() {

  return (
    <>
    <div className='login-page'>
      <Carousel/>
        <div className='login-div'>
            <div className='login-form'>
                <h2 className='login-title'>Login</h2>
                <div className='input-box'>
                    <input className='username-input' type="text" required="required"/>
                    <span>Username</span>
                </div>
                <div className='input-box'>
                    <input className='password-input' type="password" required="required" />
                    <span>Password</span>
                </div>

                <Link to={"/home"}><button className='login-btn'>Login</button></Link>
                <Link to={"/signup"}><h3 className='signup-text'>Don’t have an account? signup</h3></Link>
            </div>
        </div>
      </div>
    </>
  )
}
