import {useState, useRef} from 'react'
import Navbar from '../Components/Navbar'
import Followers from '../Components/Followers'
import AboutMe from '../Components/AboutMe'
import MyPosts from '../Components/MyPosts'
import './UploadPost.css'
import profile from '../assets/profile3.jpg'
import photo from '../assets/image.png'
import upload from '../assets/upload.png'


export default function UploadPost() {
    const [image, setImage] = useState(null)
    const [caption, setCaption] = useState('')
    const imageRef = useRef()

    const onImageChange = (e) =>{
        if(e.target.files && e.target.files[0]){
            let img = e.target.files[0]
            setImage({
                image: URL.createObjectURL(img),
            })
        }
    }

    const uploadPost = async () => {
        const formData = new FormData()
        formData.append('description', caption)
        formData.append('image', imageRef.current.files[0])

        try {
            const response = await fetch('https://s56-chinmayee-capstone-mitworking.onrender.com/post', {
                method: 'POST',
                body: formData,
            })
            if (response.ok) {
                console.log('Post uploaded successfully')
                alert("Post uploaded successfully")
            } else {
                console.error('Failed to upload post')
                alert("Failed to upload post")
            }
        } catch (error) {
            console.error('Error uploading post:', error)
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
                        <input type="text" placeholder='Enter Caption'  value={caption} onChange={(e) => setCaption(e.target.value)}/>
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
