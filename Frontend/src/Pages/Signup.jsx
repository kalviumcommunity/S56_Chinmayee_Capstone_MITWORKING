import {useState} from 'react'
import './Signup.css'
import { Link, useNavigate } from "react-router-dom";
import Carousel from '../Components/Carousel'

export default function Signup() {

  const handleSubmit = (e) =>{
    e.preventDefault();
    navigate('/home');
  }

  const navigate = useNavigate();
  
  return (
    <>
    <div className='signup-page'>
      <Carousel/>
      <div className='signup-div'>
            <div className='signup-form'>
                <h2 className='signup-title'>Signup</h2>
                <div className='signup-input-box'>
                    <input className='signup-username-input' type="text" name="username" required="required"/>
                    <span>Username</span>
                </div>
                <div className='signup-input-box'>
                    <input className='signup-password-input' type="email" name="email" required="required" />
                    <span>Email</span>
                </div>
                <div className='signup-input-box'>
                    <input className='signup-password-input' type="password" name="password" required="required" />
                    <span>Password</span>
                </div>

                <button className='signup-btn' onClick={handleSubmit}>Sign up</button>
                <Link to={"/"}><h3 className='login-text'>Already have an account? Login</h3></Link>
            </div>
        </div>
      </div> 
    </>
  )
}
