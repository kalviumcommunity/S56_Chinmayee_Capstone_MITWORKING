import {useState, useEffect} from 'react'
import './Followers.css'
import axios from 'axios'
import defaultPrf from  '../assets/default.png'


export default function Followers({ userId }) {

  const [allUsers, setAllUsers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('https://s56-chinmayee-capstone-mitworking.onrender.com/getall');
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
      if (following.includes(id)) {
        await axios.put(`https://s56-chinmayee-capstone-mitworking.onrender.com/${id}/unfollow`, {
          currentUserId: userId,
        });
        setFollowing(following.filter(userId => userId !== id));
      } else {
        await axios.put(`https://s56-chinmayee-capstone-mitworking.onrender.com/${id}/follow`, {
          currentUserId: userId,
        });
        setFollowing([...following, id]);
      }
    } catch (error) {
      console.log('Error updating follow status:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='followers-container'>
      <h3 className='heading'>People you may know</h3>
      <div className='container'>
        {allUsers.map(user => (
          <div className='follower' key={user._id}>
            <img className='follower-prf' src={user.profilePicture || defaultPrf} alt={user.username} />
            <div className='name'>
              <h4 className='follower-name'>{user.name}</h4>
              <h5 className='follower-username'>@{user.username}</h5>
            </div>
            <button className='follow' onClick={() => handleFollow(user._id)}>
              {following.includes(user._id) ? 'Unfollow' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}