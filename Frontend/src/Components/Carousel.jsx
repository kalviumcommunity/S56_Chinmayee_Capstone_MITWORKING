import {useState, useEffect} from 'react'
import './Carousel.css'
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.jpg'

export default function Carousel() {

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
        <div className='carousel'>
            <img className='carousel-img' src={images[currentImage]} alt={`img ${currentImage + 1}`} />
        </div>
        <div className='dots'>
            {images.map((_, index) => (<span key={index} className={index === currentImage ? 'dot active' : 'dot'} onClick={() => setCurrentImage(index)} />))}
        </div>
    </>
  )
}
