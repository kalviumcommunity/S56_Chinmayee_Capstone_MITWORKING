import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar'
import profile from '../assets/profile3.jpg'
import Followers from '../Components/Followers'
import AboutMe from '../Components/AboutMe';
import MyPosts from '../Components/MyPosts';
import './Profile.css';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('userId');


  useEffect(() => {
    if (userId) {
      axios.get(`https://s56-chinmayee-capstone-mitworking.onrender.com/${userId}`)
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userId]);

  return (
    <>
      <div className='profile-page'>
        <Navbar/>
        <Followers/>
        <div className='profile-div'>
            <div className='profile-overveiw'>
            
                <img className='prfPage-img' src={profile} alt={profile} />
                <h2 className='prfPage-name'>Chinmayee Harane</h2>
                <h2 className='prfPage-username'>@{username}</h2>

                <div className='prfPage-lines'>
                    <h3 className='prfPage-numOfFollwers'>200<br />Followers</h3>
                    <div className='prfPage-middle-line1'></div>
                    <h3 className='prfPage-numOfFollwing'>300<br />Following</h3>
                    <div className='prfPage-middle-line2'></div>
                    <h3 className='prfPage-numOfPost'>5<br/>Posts</h3>
                </div>

            </div>
            <MyPosts/>
        </div>

        <AboutMe/>
        </div> 
    </>
  )
}
