import React, { useContext, useEffect, useState } from 'react'
import "../CSS/stylenabar.css";
import { Link, useNavigate } from "react-router-dom";
import HelperContext from '../context/helperContext';



function Navbar() {
  const navigate= useNavigate();

  const {profile,LogOut} = useContext(HelperContext);
  // console.log(profile);

   
  return (
    <div className='bg-[#67729D] flex justify-between w-full h-[10vh] text-lg items-center'>
        <div className='h-full w-1/2'>
        <ul className='flex flex-wrap justify-around h-full list-none'>
        <li ><Link to ='/problemSet/all' >Problem </Link></li>
        <li ><Link to ='/blog'>Blog</Link></li>
        <li ><Link to ='/submissions'>Submissions</Link></li>
        </ul>
        </div>
    
        <div className='flex h-full w-2/5 justify-around items-center'>
         {profile.token === null?  
            <>
            <button  onClick={()=>{navigate('/signup')} }>Sign up</button>
            <button  onClick={()=>{ navigate('/login')}}>Login</button>
            </> 
           :
           <button onClick={()=>{ LogOut();  navigate('/signup');}}>Log Out</button>
           }
        </div> 
            
    </div>
  )
}

export default Navbar
