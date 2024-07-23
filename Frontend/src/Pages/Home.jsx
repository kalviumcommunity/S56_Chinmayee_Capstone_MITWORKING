import {useState, useEffect} from 'react'
import './Home.css'
import Navbar from '../Components/Navbar'
import Followers from '../Components/Followers'
import heart from '../assets/heart.png'
import message from '../assets/messenger.png'
import share from '../assets/share.png'
import profile from '../assets/profile3.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('https://s56-chinmayee-capstone-mitworking.onrender.com/posts/postss')
      .then(response => {
        const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
        console.log(sortedPosts);
      })
      .catch((err)=> {
        console.log('Error fetching posts:', err);
      });
  }, []);

  return (
    <>
      <div className='home-box'>
        <Navbar/>
        <Followers/>

        {/* Posts container */}
        <div className='posts-container'>
          <input className='search-box' placeholder='Search for people' type="text" />

          {/* Render posts */}
          {posts.map(post => (
            <div key={post._id} className='post'>
              <img className='post-img' src={post.image} alt={post.description} />
              <div className='post-icons'>
                <img className='like-icon post-icon' src={heart} alt="heart" />
                <img className='comment-icon post-icon' src={message} alt="message" />
                <img className='share-icon post-icon' src={share} alt="share" />
              </div>
              <h5 className='likes'>{post.likes.length} Likes</h5>
              <div className='caption'>
                <h3 className='post-name'>{post.username}: </h3>
                <h3 className='post-caption'>{post.description}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Profile card */}
        <div className='profile-card'>
          <img className='prf-img' src={profile} alt="" />
          <h2 className='prf-name'>Chinmayee Harane</h2>
          <h2 className='prf-username'>{localStorage.getItem("username")}</h2>
          <div className='lines'>
            <div className='top-line'></div>
            <h3 className='numOfFollwers'>1000 <br />Followers</h3>
            <div className='middle-line'></div>
            <h3 className='numOfFollwing'>300 <br />Following</h3>
            <div className='bottom-line'></div>
          </div>
          <Link to={'/profile'}>
            <button className='prf-btn'>Profile</button>
          </Link>
        </div>
      </div>
    </>
  );
}