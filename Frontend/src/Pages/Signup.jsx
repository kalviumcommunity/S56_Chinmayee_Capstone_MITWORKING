import { useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Carousel from '../Components/Carousel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google"

const clientID = "932394916321-h2fn24qhdeb8aa52bvf1q0dgq945e01b.apps.googleusercontent.com"

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current User: ", res.profileObj);
    alert("Google Signup Successful!");
    setIsLoggedIn(true);
    
    setTimeout(() => {
      
      navigate("/"); 
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://s56-chinmayee-capstone-mitworking.onrender.com/register', formData);
      if (response.status === 200) {
        console.log('Registration successful');
        toast.success('Registration successful ✅');
        const { userId, username } = response.data;
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', username); 
        navigate('/');
      } else {
        console.error('Registration failed');
        toast.error('Registration failed ❌');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    finally {
      setLoading(false); 
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

            <button className={`signup-btn ${loading ? 'loading' : ''}`} onClick={handleSubmit}  disabled={loading}  >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>

            <GoogleOAuthProvider clientId={clientID}>
          <GoogleLogin onSuccess={onSuccess} text="signup_with" />
        </GoogleOAuthProvider>

            <Link to={'/'}>
              <h3 className="login-text">Already have an account? Login</h3>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}
