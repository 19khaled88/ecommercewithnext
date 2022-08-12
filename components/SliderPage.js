import React from 'react'
import Slider from 'react-slick'
import slider1 from '../public/slider image/slider1.jpg'
import slider2 from '../public/slider image/slider2.png'
import slider3 from '../public/slider image/slider3.png'
import slider4 from '../public/slider image/slider4.jpg'

const SliderPage = () => {
  const images = [slider1, slider2, slider3, slider4]

  // images.forEach((element, index) => {
  //   console.log(element)
  //   return (
  //     <div key={index}>
  //       <img src={element.src} />
  //     </div>
  //   )
  // })

  // images.map((element) => {
  //   console.log(element)
  //   return (
  //     <div>
  //       <img src={element.src} />
  //     </div>
  //   )
  // })
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
  }
  return (
    <div>
      <Slider {...settings}>
        {images.map((element) => {
          return <img src={element.src} key={element.src} />
        })}
      </Slider>
    </div>
  )
}

export default SliderPage
