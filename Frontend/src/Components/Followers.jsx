import React from 'react'
import './Followers.css'
import profile1 from  '../assets/profile1.jpg'
import profile2 from '../assets/profile2.jpg'
import profile3 from '../assets/profile4.jpg'


export default function Followers() {
  return (
    <div className='followers-container'>
      <h3 className='heading'>My Followers</h3>

      <div className='container'>
        <div className='follower'>
            <img className='follower-prf' src={profile1} alt="profile1" />
            <div className='name'>
                <h4 className='follower-name'>Sriyansh</h4>
                <h5 className='follower-username'>@sriyanshjindal</h5>
            </div>
            <button className='follow'>Follow</button>
        </div>

        <div className='follower'>
            <img className='follower-prf' src={profile2} alt="profile2" />
            <div className='name'>
                <h4 className='follower-name'>Ayush</h4>
                <h5 className='follower-username'>@ayushghodke</h5>
            </div>
            <button className='follow'>Follow</button>
        </div>

        <div className='follower'>
            <img className='follower-prf' src={profile3} alt="profile3" />
            <div className='name'>
                <h4 className='follower-name'>Chinmayee</h4>
                <h5 className='follower-username'>@chinmayeeharane</h5>
            </div>
            <button className='follow'>Follow</button>
        </div>
      </div>
    </div>
  )
}
