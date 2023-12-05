import React, { useState ,useEffect} from 'react';
import '../CSS/stylesignup.css';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


function Login() {
    const  [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [token,setToken] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token'))
        {
            
            navigate('/problemSet/all');
        }
       
    },[])

    const loginUser= async()=>{
       
        try{
            const response= await fetch("http://localhost:3001/login",{
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
        localStorage.setItem("token",json.token);
        setToken(json.token);
        console.log(json.token);
        navigate('/problemSet/all');
        navigate(0);

        }catch(err)
        {
          console.log(err);
        }

    }
  return (
      <div className='login'>
         <div className='form'>
        <div className ="detail"> 
        <label htmlFor="email">Email : </label>
        <input type="Email" placeholder='Email Address'  onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
        <div className ="detail">
        <label htmlFor="password" >Password : </label>
        <input type="Password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        <div className='btn'>
        <button onClick={loginUser} type='submit'> Login </button>
        </div>
        </div>
      
    </div>
  )
}

export default Login
