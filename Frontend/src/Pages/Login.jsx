import {useState} from 'react'
import './Login.css'
import { Link, useNavigate } from "react-router-dom"
import Carousel from '../Components/Carousel'
import axios from 'axios'

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://s56-chinmayee-capstone-mitworking.onrender.com/login', formData);
      if (response.status === 200) {
        console.log('Login successful');
        alert('Login successful ✅');
        const userId = response.data._id;
        const username = response.data.username;
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', username); 
        navigate('/home');
      } else {
        console.error('Login failed');
        alert('Login failed ❌');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.error('Server responded with error status:', error.response.status);
        if (error.response.status === 401) {
          alert('Incorrect username or password');
        } else {
          alert('An unexpected error occurred. Please try again later.');
        }
      } else if (error.request) {
        console.error('No response received from the server:', error.request);
        alert('No response received from the server. Please check your internet connection.');
      } else {
        console.error('Error setting up request:', error.message);
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <>
      <div className='login-page'>
        <Carousel/>
        <div className='login-div'>
          <div className='login-form'>
            <h2 className='login-title'>Login</h2>
            <div className='input-box'>
              <input className='username-input' type="text" name="username" value={formData.username} onChange={handleChange} required="required"/>
              <span>Username</span>
            </div>
            <div className='input-box'>
              <input className='password-input' type="password" name="password" value={formData.password} onChange={handleChange} required="required" />
              <span>Password</span>
            </div>

            <Link to={"/home"}><button className='login-btn' onClick={handleSubmit}>Login</button></Link>
            <Link to={"/signup"}><h3 className='signup-text'>Don’t have an account? signup</h3></Link>
          </div>
        </div>
      </div>
    </>
  )
}
