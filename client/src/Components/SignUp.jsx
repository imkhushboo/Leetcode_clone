import React, { useState } from 'react'
import '../CSS/stylesignup.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function SignUp() {
    const navigate = useNavigate();
    const [email ,setEmail ] = useState();
    const [password ,setPassword] = useState();

   const signupUser = async ()=>{
    try{
        
        const response= await fetch("http://localhost:3001/signup",{
            method : 'POST',
            headers: {
                "Content-Type": "application/json",
            },

            body : JSON.stringify({
                email ,password
            })
        });

        
        const json = await response.json();
        if(response.status !=200)
        {
            const err = json.msg;
            throw err;
        }
        navigate('/login');
    }
    catch(err)
    {
          console.log(err);
        
   }
}
   

  return (
    <div className='signup'>
         <div className='form'>
        <div className ="detail"> 
        <label htmlFor="email">Email : </label>
        <input type="Email" placeholder='Email Address'  onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
        <div className ="detail">
        <label htmlFor="password" >Password : </label>
        <input type="Password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        <div className ="detail"> 
        <label htmlFor="confirm password" >Confirm Password :</label>
        <input type="Password" placeholder='confirm password' />
        </div>
        <div className='btn'>
        <button onClick={signupUser} type='submit'> Create Account</button>
        <p>Already have a account? <Link to='/login'>Login</Link></p>
        </div>
      
      
    </div>
    </div>
   
  )
}

export default SignUp
