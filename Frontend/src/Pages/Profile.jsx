import React from 'react';
import Navbar from '../Components/Navbar'
import profile from '../assets/profile3.jpg'
import Followers from '../Components/Followers'
import AboutMe from '../Components/AboutMe';
import MyPosts from '../Components/MyPosts';
import './Profile.css'

export default function Profile() {

  return (
    <>
      <div className='profile-page'>
        <Navbar/>
        <Followers/>
        <div className='profile-div'>
            <div className='profile-overveiw'>
            
                <img className='prfPage-img' src={profile} alt={profile} />
                <h2 className='prfPage-name'>Betty Gilbert</h2>
                <h2 className='prfPage-username'>@bettygilbert</h2>

                <div className='prfPage-lines'>
                    <h3 className='prfPage-numOfFollwers'>1000 <br />Followers</h3>
                    <div className='prfPage-middle-line1'></div>
                    <h3 className='prfPage-numOfFollwing'>300 <br />Following</h3>
                    <div className='prfPage-middle-line2'></div>
                    <h3 className='prfPage-numOfPost'>3<br/>Posts</h3>
                </div>

            </div>
            <MyPosts/>
        </div>

        <AboutMe/>
        </div> 
    </>
  )
}
