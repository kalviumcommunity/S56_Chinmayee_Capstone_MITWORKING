import { useState, useEffect } from 'react';
import axios from 'axios';
import './AboutMe.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AboutMe() {
    const [openModal, setOpenModal] = useState(false);
    const [inputValues, setInputValues] = useState({
        name: '',
        age: '',
        course: '',
        year: '',
        hobbies: '',
        club: '',
        bio: '',
        profilePic: '' // Adding a profile picture field
    });
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null); // New state for the selected image file
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        axios.get(`https://s56-chinmayee-capstone-mitworking.onrender.com/${userId}`)
            .then(response => {
                console.log('Fetched user data:', response.data);
                setInputValues(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [userId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    const handleImageChange = (event) => {
        setImageFile(event.target.files[0]); // Set the selected image file
    };

    const handleEditClick = () => {
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleSaveChanges = async () => {
        setLoading(true);

        try {
            if (imageFile) {
                // Upload the image to the server
                const formData = new FormData();
                formData.append('file', imageFile);
                const uploadResponse = await axios.post(`https://s56-chinmayee-capstone-mitworking.onrender.com/upload/${userId}`, formData);
                inputValues.profilePic = uploadResponse.data.url; // Save the uploaded image URL to the profilePic field
            }

            // Update the user profile
            await axios.put(`https://s56-chinmayee-capstone-mitworking.onrender.com/${userId}`, {
                ...inputValues,
                currentUserId: userId
            });
            setOpenModal(false);
            toast.success("Profile Updated ✅");
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error("Failed to Update ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Info card */}
            <div className='prfpage-info-card'>
                <h2 className='info-title'>About Me</h2>
                <div className='user-info'>
                    <div className='info-details'>
                        <h3>Profile Picture:</h3>
                        {inputValues.profilePic ? (
                            <img src={inputValues.profilePic} alt="Profile" className="profile-pic" />
                        ) : (
                            <p>No Profile Picture</p>
                        )}
                    </div>
                    <div className='info-details'><h3>Name:</h3> <h3>{inputValues.name}</h3></div>
                    <div className='info-details'><h3>Age:</h3><h3>{inputValues.age}</h3></div>
                    <div className='info-details'><h3>Course:</h3><h3>{inputValues.course}</h3></div>
                    <div className='info-details'><h3>Year:</h3><h3>{inputValues.year}</h3></div>
                    <div className='info-details'><h3>Hobbies:</h3><h3>{inputValues.hobbies}</h3></div>
                    <div className='info-details'><h3>Club:</h3><h3>{inputValues.club}</h3></div>
                    <div className='info-details'><h3>Bio:</h3><h3>{inputValues.bio}</h3></div>
                </div>
                <button onClick={handleEditClick}>Edit</button>
            </div>

            {/* Modal */}
            {openModal && (
                <div className="modal">
                    <span className="close" onClick={handleModalClose}>&times;</span>
                    <h2>Edit Profile</h2>
                    <div className="modal-content">
                        <div>
                            <input type="text" name="name" value={inputValues.name} onChange={handleInputChange} required />
                            <span>Name</span>
                        </div>
                        <div>
                            <input type="text" name="age" value={inputValues.age} onChange={handleInputChange} required />
                            <span>Age</span>
                        </div>
                        <div>
                            <input type="text" name="course" value={inputValues.course} onChange={handleInputChange} required />
                            <span>Course</span>
                        </div>
                        <div>
                            <input type="text" name="year" value={inputValues.year} onChange={handleInputChange} required />
                            <span>Year</span>
                        </div>
                        <div>
                            <input type="text" name="hobbies" value={inputValues.hobbies} onChange={handleInputChange} required />
                            <span>Hobbies</span>
                        </div>
                        <div>
                            <input type="text" name="club" value={inputValues.club} onChange={handleInputChange} required />
                            <span>Club</span>
                        </div>
                        <div>
                            <textarea name="bio" value={inputValues.bio} onChange={handleInputChange} required placeholder='Bio'></textarea>
                        </div>
                        <div>
                            <input type="file" onChange={handleImageChange} />
                            <span>Profile Picture</span>
                        </div>
                        <button
                            className={`save-btn ${loading ? 'loading' : ''}`}
                            onClick={handleSaveChanges}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}
