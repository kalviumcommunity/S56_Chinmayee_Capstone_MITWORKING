import { useState, useRef } from 'react';
import Navbar from '../Components/Navbar';
import Followers from '../Components/Followers';
import AboutMe from '../Components/AboutMe';
import MyPosts from '../Components/MyPosts';
import './UploadPost.css';
import profile from '../assets/profile3.jpg';
import photo from '../assets/image.png';
import upload from '../assets/upload.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UploadPost() {
    const [caption, setCaption] = useState('');
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef();


    const onFileChange = (e) => {
        if(e.target.files && e.target.files[0]){
            let img = e.target.files[0]
            setFile(img)
            setImage({
                image: URL.createObjectURL(img),
            })
        }

    };

    const onUploadClick = async () => {
        if (!file || !caption) {
            console.error('Please select a file and enter a caption.');
            toast.error("Please select a file and enter a caption.😊")
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('caption', caption);
        formData.append('username', localStorage.getItem("username"));
        
        try {
            const response = await axios.post(`https://s56-chinmayee-capstone-mitworking.onrender.com/upload/${localStorage.getItem("userId")}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded:', response.data.url);
            toast.success('Post uploaded ✅');
            setCaption('');
            setFile(null);
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Error uploading file ❌');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className='upload-page'>
            <Navbar />
            <Followers />
            <div className='upload-div'>
                <div className='upload-overveiw'>
                    <div className='upload-input'>
                        <img className='upload-prf' src={profile} alt="user's profile image" />
                        <input
                            required
                            type="text"
                            placeholder='Enter Caption'
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                    </div>

                    <div className='upload-icons'>
                        <div>
                            <label htmlFor="fileInput">
                                <img className='upload-icon' src={photo} alt="upload image icon" />
                                <h2>Image</h2>
                            </label>
                            <input
                                id="fileInput"
                                type="file"
                                accept="image/*,video/*"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={onFileChange}
                            />
                        </div>
                        <div>
                            <img className='upload-icon' src={upload} alt="upload Video icon" />
                            <h2>Video</h2>
                        </div>

                        <button
                          className={`upload-btn ${loading ? 'loading' : ''}`}
                          onClick={onUploadClick}
                          disabled={loading}
                        >
                          {loading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>

                    {image && (
                        <div className='preveiw-image'>
                            <span className="close-img" onClick={()=>setImage(null)}>&times;</span>
                            <img src={image.image} alt="uploaded image preveiw" style={{display:image ? "block" : "none"}}/>
                        </div>
                    )}
                </div>
                <MyPosts />
            </div>

            <AboutMe />
            <ToastContainer/>
        </div>
    );
}
