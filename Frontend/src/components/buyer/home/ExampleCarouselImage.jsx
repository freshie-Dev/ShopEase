import React from 'react'
import image from "../../../assets/react.svg"

const ExampleCarouselImage = ({text}) => {
  return (
    <>
        <img className='d-block w-100' src={image} alt=""  />
        <h1>{text}</h1>
    </>
  )
}

export default ExampleCarouselImage