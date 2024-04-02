import {useState, useEffect} from 'react'
import './Login.css'
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.jpg'
import { Link } from "react-router-dom";



export default function Login() {

    const [currentImage, setCurrentImage] = useState(0)
    const images = [img1, img2, img3]

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentImage((prevIndex) => (prevIndex + 1) % images.length)
        }, 4000)
    
        return () => clearInterval(interval)
    }, [images.length])

  return (
    <>
    <div className='login-page'>
        <div className='carousel'>
            <img className='carousel-img' src={images[currentImage]} alt={`img ${currentImage + 1}`} />
        </div>
        <div className='dots'>
            {images.map((_, index) => (<span key={index} className={index === currentImage ? 'dot active' : 'dot'} onClick={() => setCurrentImage(index)} />))}
        </div>

        <div className='login-div'>
            <div className='login-form'>
                <h2 className='login-title'>Login</h2>
                <div className='input-box'>
                    <input className='username-input' type="text" required="required"/>
                    <span>Username</span>
                </div>
                <div className='input-box'>
                    <input className='password-input' type="text" required="required" />
                    <span>Password</span>
                </div>

                <button className='login-btn'>Login</button>
                <Link to={"/signup"}><h3 className='signup-text'>Don’t have an account? signup</h3></Link>
            </div>
        </div>
      </div>
    </>
  )
}
