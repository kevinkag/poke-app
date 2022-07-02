import React from 'react'
import './error.css'

const ErrorNoResults = () => {
  return (
    <div className='d-flex justify-content-center'>
         <img alt='oops' className='img-oops' src={require('../../assets/oops.png')}/>
         <div className='fs-6 text-danger text-center fw-bold centrado'>Opps!...<br/> something went wrong, try again.</div>
    </div>
  )
}

export default ErrorNoResults