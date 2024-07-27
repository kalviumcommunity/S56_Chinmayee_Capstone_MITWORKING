import {useState, useEffect} from 'react'
import heart from '../assets/heart.png'
import message from '../assets/messenger.png'
import share from '../assets/share.png'
import './Myposts.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem('userId');
  useEffect(() => {
    if (userId) {
      axios.get(`https://s56-chinmayee-capstone-mitworking.onrender.com/posts/postss`)
        .then(response => {
          const allPosts = response.data;
          const userPosts = allPosts.filter(post => post.userId === userId);
          const sortedPosts = userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setPosts(sortedPosts);
        })
        .catch((err)=> {
          console.log('Error fetching posts:', err.response ? err.response.data : err.message);
        });
    }
  }, [userId]);


  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      setLoading(true);
      try {
        await axios.delete(`https://s56-chinmayee-capstone-mitworking.onrender.com/posts/${postId}`, {
          data: { userId }
        });
        setPosts(posts.filter((post) => post._id !== postId));
        toast.success("Post Deleted ✅")
      } catch (error) {
        console.log('Error deleting post:', error.response ? error.response.data : error.message);
      }
      finally {
        setLoading(false); 
      }
    }
  };

  const handleEdit = async (postId) => {
    setIsEditing(true);
    setEditPostId(postId);
    const postToEdit = posts.find((post) => post._id === postId);
    setEditDescription(postToEdit.description);
  };

  const handleSaveEdit = async () => {
    setLoading(true);
    try {
      await axios.put(`https://s56-chinmayee-capstone-mitworking.onrender.com/posts/${editPostId}`, {
        userId,
        description: editDescription
      });
      setPosts(
        posts.map((post) =>
          post._id === editPostId ? { ...post, description: editDescription } : post
        )
      );
      setIsEditing(false);
      setEditPostId(null);
      setEditDescription('');
      toast.success("Post Updated ✅")
    } catch (error) {
      console.log('Error updating post:', error.response ? error.response.data : error.message);
      toast.error('Failed to update post ❌');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      {/* posts container*/}
      <div className='prfPage-posts-container'>
      {posts.map((post) => (
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
              {isEditing && post._id === editPostId ? (
                <input
                  type='text'
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              ) : (
              <h3 className='prfPage-post-caption'>{post.description}</h3>
              )}
            </div>
            
            <div className='prfPage-buttons'>
              {isEditing && post._id === editPostId ? (
                <button className={`prfPage-save-btn ${loading ? 'loading' : ''}`} onClick={handleSaveEdit} disabled={loading}>
                  {loading ? 'Saving...' : 'Save'}
                </button>
              ) : (
                <button className='prfPage-edit-btn' onClick={() => handleEdit(post._id)}>
                  Edit
                </button>
              )}
              <button
                  className={`prfPage-delete-btn ${loading ? 'loading' : ''}`}
                  onClick={() => handleDelete(post._id)}
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
        ))} 

      </div>
      <ToastContainer/>
    </div>
  )
}
