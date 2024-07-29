import {useState, useEffect} from 'react'
import './Followers.css'
import axios from 'axios'
import defaultPrf from  '../assets/default.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Followers() {

  const userId = localStorage.getItem("userId")
  const [allUsers, setAllUsers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('https://s56-chinmayee-capstone-mitworking.onrender.com/getall');
        console.log('Fetch all users response:', response.data);
        setAllUsers(response.data);
      } catch (error) {
        console.log('Error fetching users list:', error.response ? error.response.data : error.message);
      }
    };

    const fetchFollowing = async () => {
      try {
        const response = await axios.get(`https://s56-chinmayee-capstone-mitworking.onrender.com/${userId}`);
        console.log('Fetch following response:', response.data);
        setFollowing(response.data.following.map(id => id.toString())); 
      } catch (error) {
        console.log('Error fetching following list:', error.response ? error.response.data : error.message);
      }
    };

    fetchAllUsers();
    fetchFollowing();
  }, [userId]);

  console.log(userId);
  const handleFollow = async (id) => {
    try {
      if (following.includes(id)) {
        await axios.put(`https://s56-chinmayee-capstone-mitworking.onrender.com/${id}/unfollow`, {
          currentUserId: userId,
        });
        setFollowing(following.filter(userId => userId !== id));
        toast.success('User unfollowed successfully! ✅');
      } else {
        await axios.put(`https://s56-chinmayee-capstone-mitworking.onrender.com/${id}/follow`, {
          currentUserId: userId,
        });
        setFollowing([...following, id]);
        toast.success('User followed successfully! ✅');
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
              {following.includes(user._id.toString()) ? 'Unfollow' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
      <ToastContainer/>
    </div>
  );
}