import {useState, useEffect} from 'react'
import heart from '../assets/heart.png'
import message from '../assets/messenger.png'
import share from '../assets/share.png'
import './Myposts.css'
import axios from 'axios'


export default function MyPosts() {
  const [posts, setPosts] = useState([]);

  const userId = localStorage.getItem('userId');
  useEffect(() => {
    if (userId) {
      axios.get(`https://s56-chinmayee-capstone-mitworking.onrender.com/posts/postss`)
        .then(response => {
          const allPosts = response.data;
          const userPosts = allPosts.filter(post => post.userId === userId);
          setPosts(userPosts);
        })
        .catch((err)=> {
          console.log('Error fetching posts:', err.response ? err.response.data : err.message);
        });
    }
  }, [userId]);


  return (
    <div>
      {/* posts container*/}
      <div className='prfPage-posts-container'>
      {posts.map(post => (
        <div key={post._id} className='prfPage-post'>
            <img className='prfPage-post-img' src={post.image} alt={post.description} />

            <div className='prfPage-post-icons'>
              <img className='like-icon prfPage-post-icon' src={heart} alt="heart" />
              <img className='comment-icon prfPage-post-icon' src={message} alt="message" />
              <img className='share-icon prfPage-post-icon' src={share} alt="share" />
            </div>

            <h5 className='prfPage-likes'>{post.likes.length} Likes</h5>
            <div className='prfPage-caption'>
              <h3 className='prfPage-post-name'>{post.username}: </h3>
              <h3 className='prfPage-post-caption'>{post.description}</h3>
            </div>
            
            <div className='prfPage-buttons'>
                <button className='prfPage-edit-btn'>Edit</button>
                <button className='prfPage-delete-btn'>Delete</button>
            </div>
        </div>
        ))} 

      </div>
    </div>
  )
}
