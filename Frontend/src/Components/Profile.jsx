import { useState } from 'react';
import Navbar from './Navbar'
import Followers from './Followers'
import post1 from '../assets/post1.jpg'
import post2 from '../assets/post2.jpg'
import heart from '../assets/heart.png'
import message from '../assets/messenger.png'
import share from '../assets/share.png'
import profile from '../assets/profile3.jpg'
import './Profile.css'

export default function Profile() {

    const [openModal, setOpenModal] = useState(false)
    const [inputValues, setInputValues] = useState({
        name: '',
        age: '',
        course: '',
        year: '',
        hobbies: '',
        club: '',
        bio: ''
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setInputValues({ ...inputValues, [name]: value })
    }
    
    const handleEditClick = () => {
        setOpenModal(true)
    }

    const handleModalClose = () => {
        setOpenModal(false)
    }

    const handleSaveChanges = () => {
        console.log(inputValues)
        setOpenModal(false)
    }

  return (
    <>
      <div className='profile-page'>
        <Navbar/>
        <Followers/>
        <div className='profile-div'>
            <div className='profile-overveiw'>
            
                <img className='prfPage-img' src={profile} alt={profile} />
                <h2 className='prfPage-name'>Betty Gilbert</h2>
                <h2 className='prfPage-username'>@bettygilbert</h2>

                <div className='prfPage-lines'>
                    <h3 className='prfPage-numOfFollwers'>1000 <br />Followers</h3>
                    <div className='prfPage-middle-line1'></div>
                    <h3 className='prfPage-numOfFollwing'>300 <br />Following</h3>
                    <div className='prfPage-middle-line2'></div>
                    <h3 className='prfPage-numOfPost'>3<br/>Posts</h3>
                </div>

            </div>
            
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

        {/* Info card */}
        <div className='prfpage-info-card'>
            <h2 className='info-title'>About Me</h2>
            <div className='user-info'>
                <div className='info-details'><h3>Name:</h3> <h3>chinmayee</h3></div>
                <div className='info-details'><h3>Age:</h3><h3>18</h3> </div>
                <div className='info-details'><h3>Course:</h3><h3>CSE</h3></div>
                <div className='info-details'><h3>Year:</h3><h3>1st</h3></div>
                <div className='info-details'><h3>Hobbis:</h3><h3>Sports</h3></div>
                <div className='info-details'><h3>Club:</h3><h3>GDSC</h3></div>
                <div className='info-details'><h3>Bio:</h3><h3>Committed to academic excellence and extracurricular involvement</h3></div>   
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
                    <input type="text" value={inputValues.name} onChange={handleInputChange} required="required" />
                    <span>Name</span>
                </div>
                <div>
                    <input type="text" value={inputValues.age} onChange={handleInputChange} required="required" />
                    <span>Age</span>
                </div>
                <div>
                    <input type="text" value={inputValues.course} onChange={handleInputChange} required="required" />
                    <span>Course</span>
                </div>
                <div>
                    <input type="text" value={inputValues.year} onChange={handleInputChange} required="required" />
                    <span>Year</span>
                </div>
                <div>
                    <input type="text" value={inputValues.hobbies} onChange={handleInputChange} required="required" />
                    <span>Hobbies</span>
                </div>
                <div>
                    <input type="text" value={inputValues.club} onChange={handleInputChange} required="required" />
                    <span>Club</span>
                </div>
                <div>
                    <textarea value={inputValues.bio} onChange={handleInputChange} required="required" placeholder='Bio'></textarea>
                </div>
                <button onClick={handleSaveChanges}>Save Changes</button>
            </div>
        </div>
        )}
        </div> 
    </>
  )
}
