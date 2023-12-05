import React, { useEffect, useState } from 'react'
import "../CSS/stylenabar.css";
import { Link, useNavigate } from "react-router-dom";



function Navbar({loggedIn,changeloggedin}) {
   

    const LogOut = ()=>{
        localStorage.removeItem('token');
        changeloggedin(false);
        navigate('/signup');
    }
    const navigate= useNavigate();
  return (
    <div className='maxi_nav'>
        <div className='mini_nav'>
        <ul>
        <li ><Link to ='/problemSet/all' >Problem </Link></li>
        <li><Link to ='/blog'>Blog</Link></li>
        <li><Link to ='/submissions'>Submissions</Link></li>
        </ul>
        </div>
    
        <div className='avatar'>
         {loggedIn === false?  
            <>
            <button onClick={()=>{navigate('/signup')} }>Sign up</button>
            <button onClick={()=>{ navigate('/login')}}>Login</button>
            </> 
           :
           <button onClick={LogOut}>Log Out</button>
           }
        </div> 
            
    </div>
  )
}

export default Navbar
