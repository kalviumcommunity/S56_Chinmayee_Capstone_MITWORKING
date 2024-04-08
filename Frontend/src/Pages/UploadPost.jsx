import {useState, useRef} from 'react'
import Navbar from '../Components/Navbar'
import Followers from '../Components/Followers'
import AboutMe from '../Components/AboutMe';
import MyPosts from '../Components/MyPosts';
import './UploadPost.css'
import profile from '../assets/profile3.jpg'
import calender from '../assets/calendar.png'
import photo from '../assets/image.png'
import location from '../assets/location.png'
import upload from '../assets/upload.png'


export default function UploadPost() {
    const [image, setImage] = useState(null)
    const imageRef = useRef()

    const onImageChange = (e) =>{
        if(e.target.files && e.target.files[0]){
            let img = e.target.files[0]
            setImage({
                image: URL.createObjectURL(img),
            })
        }
    }

  return (
    <>
        <div className='upload-page'>
            <Navbar/>
            <Followers/>
            <div className='upload-div'>
                <div className='upload-overveiw'>
                    <div className='upload-input'>
                        <img className='upload-prf' src={profile} alt="user's profile image" />
                        <input type="text" placeholder='Enter Caption'/>
                    </div>

                    <div className='upload-icons'>
                        <div onClick={()=>imageRef.current.click()}>
                            <img className='upload-icon' src={photo} alt="upload image icon" />
                            <h2>Image</h2>
                        </div>
                        <div>
                            <img className='upload-icon' src={upload} alt="upload Video icon" />
                            <h2>Video</h2>
                        </div>
                        <div>
                            <img className='upload-icon' src={location} alt="upload Location icon"/>
                            <h2>Location</h2>
                        </div>
                        <div>
                            <img className='upload-icon' src={calender} alt="upload Schedule icon" />
                            <h2>Schedule</h2>
                        </div>

                        <button>Upload</button>

                    </div>
                    <div className='postPage-img' style={{display:"none"}}>
                        <input type="file" name='myImage' ref={imageRef} onChange={onImageChange}/>
                    </div>

                    {image && (
                        <div className='preveiw-image'>
                            <span className="close-img" onClick={()=>setImage(null)}>&times;</span>
                            <img src={image.image} alt="uploaded image preveiw" />
                        </div>
                    )}

                </div>
                <MyPosts/>
            </div>

            <AboutMe/>
        </div>
    </>
  )
}
