import {useState, useEffect} from 'react'
import './Home.css'
import Navbar from '../Components/Navbar'
import Followers from '../Components/Followers'
import heart from '../assets/heart.png'
import favorite from '../assets/favorite.png'
import profile from '../assets/profile3.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default function Home() {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [userData, setUserData] = useState(null);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios.get('https://s56-chinmayee-capstone-mitworking.onrender.com/posts/postss')
      .then(response => {
        const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const initialLikedPosts = response.data.reduce((acc, post) => {
          acc[post._id] = post.likes.includes(userId);
          return acc;
        }, {});
        setPosts(sortedPosts);
        console.log(sortedPosts);
      })
      .catch((err)=> {
        console.log('Error fetching posts:', err);
      });
  }, [userId]);

  const handleLike = async (postId) => {
    try {
      const response = await axios.put(`https://s56-chinmayee-capstone-mitworking.onrender.com/posts/${postId}/like`, { userId });
      setLikedPosts({ ...likedPosts, [postId]: !likedPosts[postId] });
      const updatedPosts = posts.map(post => post._id === postId ? { ...post, likes: likedPosts[postId] ? post.likes.filter(id => id !== userId) : [...post.likes, userId] } : post);
      setPosts(updatedPosts);
    } catch (error) {
      console.log('Error liking post:', error.response ? error.response.data : error.message);
    }
  };


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

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='home-box'>
        <Navbar/>
        <Followers/>

        {/* Posts container */}
        <div className='posts-container'>
          {/* Render posts */}
          {posts.map(post => (
            <div key={post._id} className='post'>
              <img className='post-img' src={post.image} alt={post.description} />
              <div className='post-icons'>
              <img className='like-icon post-icon' src={likedPosts[post._id] ? favorite : heart}  alt="heart"  onClick={() => handleLike(post._id)}  />
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
          <h2 className='prf-name'>{userData.name}</h2>
          <h2 className='prf-username'>@{localStorage.getItem("username")}</h2>
          <div className='lines'>
            <div className='top-line'></div>
            <h3 className='numOfFollwers'>{userData.followers.length} <br />Followers</h3>
            <div className='middle-line'></div>
            <h3 className='numOfFollwing'>{userData.following.length} <br />Following</h3>
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
