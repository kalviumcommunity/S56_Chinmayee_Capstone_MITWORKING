import { useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Carousel from '../Components/Carousel';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://s56-chinmayee-capstone-mitworking.onrender.com/register', formData);
      if (response.status === 200) {
        console.log('Registration successful');
        alert('Registration successful')
        navigate('/home');
      } else {
        console.error('Registration failed');
        alert('Registration failed')
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="signup-page">
        <Carousel />
        <div className="signup-div">
          <div className="signup-form">
            <h2 className="signup-title">Signup</h2>
            <div className="signup-input-box">
              <input
                className="signup-username-input"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <span>Username</span>
            </div>
            <div className="signup-input-box">
              <input
                className="signup-password-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span>Email</span>
            </div>
            <div className="signup-input-box">
              <input
                className="signup-password-input"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span>Password</span>
            </div>

            <button className="signup-btn" onClick={handleSubmit}>
              Sign up
            </button>
            <Link to={'/'}>
              <h3 className="login-text">Already have an account? Login</h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
