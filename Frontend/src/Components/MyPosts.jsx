import React from 'react'
import post1 from '../assets/post1.jpg'
import post2 from '../assets/post2.jpg'
import heart from '../assets/heart.png'
import message from '../assets/messenger.png'
import share from '../assets/share.png'
import './Myposts.css'

export default function MyPosts() {
  return (
    <div>
      {/* posts container*/}
      <div className='prfPage-posts-container'>

        <div className='prfPage-post'>
            <img className='prfPage-post-img' src={post1} alt="post1" />

            <div className='prfPage-post-icons'>
            <img className='like-icon prfPage-post-icon' src={heart} alt="heart" />
            <img className='comment-icon prfPage-post-icon' src={message} alt="message" />
            <img className='share-icon prfPage-post-icon' src={share} alt="share" />
            </div>

            <h5 className='prfPage-likes'>400 Likes</h5>
            <div className='prfPage-caption'>
            <h3 className='prfPage-post-name'>Betty Gilbert: </h3>
            <h3 className='prfPage-post-caption'> Bright like sunflower 🌻🌻</h3>
            </div>

            <div className='prfPage-buttons'>
                <button className='prfPage-edit-btn'>Edit</button>
                <button className='prfPage-delete-btn'>Delete</button>
            </div>

        </div>

        <div className='prfPage-posts-container'>

            <div className='prfPage-post'>
                <img className='prfPage-post-img' src={post2} alt="post1" />

                <div className='prfPage-post-icons'>
                <img className='like-icon prfPage-post-icon' src={heart} alt="heart" />
                <img className='comment-icon prfPage-post-icon' src={message} alt="message" />
                <img className='share-icon prfPage-post-icon' src={share} alt="share" />
                </div>

                <h5 className='prfPage-likes'>400 Likes</h5>
                <div className='prfPage-caption'>
                <h3 className='prfPage-post-name'>Betty Gilbert: </h3>
                <h3 className='prfPage-post-caption'> Bright like sunflower 🌻🌻</h3>
                </div>

                <div className='prfPage-buttons'>
                    <button className='prfPage-edit-btn'>Edit</button>
                    <button className='prfPage-delete-btn'>Delete</button>
                </div>
            </div>
        </div> 
      </div>
    </div>
  )
}
