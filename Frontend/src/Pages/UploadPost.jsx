import {useState, useRef} from 'react'
import { useDispatch } from 'react-redux'
import Navbar from '../Components/Navbar'
import Followers from '../Components/Followers'
import AboutMe from '../Components/AboutMe'
import MyPosts from '../Components/MyPosts'
import './UploadPost.css'
import profile from '../assets/profile3.jpg'
import photo from '../assets/image.png'
import upload from '../assets/upload.png'
import { uploadImage } from '../../actions/uploadAction'


export default function UploadPost() {
    const [image, setImage] = useState(null)
    const imageRef = useRef()
    const dispatch = useDispatch()
    const description = useRef()

    const onImageChange = (e) =>{
        if(e.target.files && e.target.files[0]){
            let img = e.target.files[0]
            setImage(img)
        }
    }

    const uploadPost = (e) => {
        e.preventDefault()

        const newPost = {
            userId: localStorage.getItem('userId'),
            description: description.current.value
        }

        if(image){
            const data = new FormData()
            const filename = Date.now() + image.name;
            data.append("name", filename)
            data.append("file", image)
            newPost.image = filename
            console.log(newPost)
            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error)
            }
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
                        <input ref={description} required type="text" placeholder='Enter Caption'/>
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

                        <button  onClick={uploadPost}>Upload</button>

                    </div>
                    <div className='upload-img' style={{display:"none"}}>
                        <input type="file" name='myImage' ref={imageRef} onChange={onImageChange}/>
                    </div>

                    {image && (
                        <div className='preveiw-image'>
                            <span className="close-img" onClick={()=>setImage(null)}>&times;</span>
                            <img src={URL.createObjectURL(image)} alt="uploaded image preveiw" />
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
