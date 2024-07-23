import {useState, useEffect} from 'react'
import './Followers.css'
import axios from 'axios'
import defaultPrf from  '../assets/default.png'


export default function Followers() {
  const [following, setFollowing] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`https://s56-chinmayee-capstone-mitworking.onrender.com/getAll`);
        setAllUsers(response.data);
      } catch (error) {
        console.log('Error fetching users list:', error.response ? error.response.data : error.message);
      }
    };

    const fetchFollowing = async () => {
      try {
        const response = await axios.get(`https://s56-chinmayee-capstone-mitworking.onrender.com/${userId}`);
        setFollowing(response.data.following);
      } catch (error) {
        console.log('Error fetching following list:', error.response ? error.response.data : error.message);
      }
    };

    fetchAllUsers();
    fetchFollowing();
  }, [userId]);

  const handleFollow = async (id) => {
    try {
      await axios.put(`https://s56-chinmayee-capstone-mitworking.onrender.com/${id}/follow`, { currentUserId: userId });
      setFollowing(prevFollowing => [...prevFollowing, id]);
    } catch (error) {
      console.log('Error following user:', error.response ? error.response.data : error.message);
    }
  };

  const handleUnfollow = async (id) => {
    try {
      await axios.put(`https://s56-chinmayee-capstone-mitworking.onrender.com/${id}/unfollow`, { currentUserId: userId });
      setFollowing(prevFollowing => prevFollowing.filter(userId => userId !== id));
    } catch (error) {
      console.log('Error unfollowing user:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='followers-container'>
      <h3 className='heading'>Explore</h3>

      <div className='container'>
        {following.map((id) => {
            const user = allUsers.find(user => user._id === id);
            return user ? (
              <div key={user._id} className='follower'>
                <img className='follower-prf' src={user.profilePicture || defaultPrf} alt={user.username} />
                <div className='name'>
                  <h4 className='follower-name'>{user.name || user.username}</h4>
                  <h5 className='follower-username'>@{user.username}</h5>
                </div>
                <button className='follow' onClick={() => handleUnfollow(user._id)}>Unfollow</button>
              </div>
            ) : null;
          })}
      </div>

      <h3 className='heading'>All Users</h3>
      <div className='container'>
        {allUsers.map((user) => (
          <div key={user._id} className='follower'>
            <img className='follower-prf' src={user.profilePicture || defaultPrf} alt={user.username} />
            <div className='name'>
              <h4 className='follower-name'>{user.name || user.username}</h4>
              <h5 className='follower-username'>@{user.username}</h5>
            </div>
            {following.includes(user._id) ? (
              <button className='follow' onClick={() => handleUnfollow(user._id)}>Unfollow</button>
            ) : (
              <button className='follow' onClick={() => handleFollow(user._id)}>Follow</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
