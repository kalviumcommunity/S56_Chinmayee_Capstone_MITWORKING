import { useState } from 'react';
import './AboutMe.css'

export default function AboutMe() {

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
    <div>
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
  )
}
