import React from 'react'
import { Link } from 'react-router-dom'


function Pagenotfound() {
  return (
    <div className='flex items-center justify-center m-auto h-[90vh] text-white'>
      <p>  SORRRRRRRRYYYYYY!!!!!!!!! TRY TO <Link to='/signup' > <span className='text-[#c04fd6]'>SIGNUP</span></Link> FIRST 😉</p>
    
    </div>
  )
}

export default Pagenotfound
