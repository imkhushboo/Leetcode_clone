import React, { useContext, useEffect, useState } from 'react'
import "../CSS/stylenabar.css";
import { Link, useNavigate } from "react-router-dom";
import HelperContext from '../context/helperContext';



function Navbar() {
  const navigate= useNavigate();

  const {profile,LogOut} = useContext(HelperContext);
  // console.log(profile);

   
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
         {profile.token === null?  
            <>
            <button onClick={()=>{navigate('/signup')} }>Sign up</button>
            <button onClick={()=>{ navigate('/login')}}>Login</button>
            </> 
           :
           <button onClick={()=>{ LogOut();  navigate('/signup');}}>Log Out</button>
           }
        </div> 
            
    </div>
  )
}

export default Navbar
