import React from 'react'
import Lottie from 'lottie-react'
import spinnerAnimation from '../../assets/spinner.json'

export const Spinner = () => {
  return (
    <Lottie animationData={spinnerAnimation} loop={true} autoplay={true} style={{ width: 16, height: 16, paddingRight: 8, }} />
  )
}
