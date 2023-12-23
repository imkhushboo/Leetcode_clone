import React, { useEffect } from 'react'
import "../CSS/stylenabar.css";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from '../redux/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';





function Navbar() {
  const navigate= useNavigate();
  const dispatch = useDispatch();

  const profile = useSelector(state=>state.AuthReducer);
  return (
    <div className='bg-[#12172e] flex justify-between w-full h-[10vh] text-lg items-center'>
      <Toaster />
        <div className='h-full w-1/2'>
        <ul className='flex flex-wrap justify-around h-full list-none'>
        <li ><Link to ='/problemSet/all' >Problem </Link></li>
        <li ><Link to ='/blog'>Blog</Link></li>
        <li ><Link to ='/submissions'>Submissions</Link></li>
        </ul>
        </div>
    
        <div className='flex h-full w-2/5 justify-end items-center'>
         {profile.token === null?  
            <>
            <button id='authentication_button' onClick={()=>{navigate('/signup')} }>Sign up</button>
            <button id='authentication_button'  onClick={()=>{ navigate('/login')}}>Login</button>
            </> 
           :
           <button id='authentication_button' onClick={()=>{dispatch(LogOut());}}>Log Out</button>
           }
        </div> 
            
    </div>
  )
}

export default Navbar
