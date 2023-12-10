import React, { useContext, useEffect, useState } from 'react';
import '../CSS/styleblog.css';
import { useLocation } from 'react-router-dom';
import HelperContext from '../context/helperContext';



function Blog() {

    const {profile,setProfile,addblog,fetchblog,rendermodal,deleteblog} = useContext(HelperContext);
      useEffect(()=>{
          fetchblog()
        },[]);


  return (
    <div className='mt-[5%] m-auto w-[98%] h-[80vh] overflow-y-contain'>
        <div className='flex w-[98%] justify-between items-center h-1/5'>
        <h4 className='text-3xl ml-[5%] font-bold'>Blogs</h4>
        <button className='w-1/5 h-2/5'onClick={()=>{rendermodal({title : '',description:'',time:''});modal.showModal()}}> add blog</button>

        {<dialog className='m-auto h-[50vh] w-[70%]'id='modal' >
        <div className="flex flex-col h-full w-full justify-between">
        <div className='flex justify-around items-center h-1/5'>
        <h1 >Blog</h1>
         <button className='ml-[5%]' id='close-button' onClick={()=>{modal.close()}}close>close</button>
        </div>
        <hr />
        <div className='flex flex-col h-2/5'>
            <label htmlFor='title'>Enter Title</label>
            <input  name='title'placeholder='enter title' value = {profile.title}onChange={(e)=>{setProfile({...profile,'time':Date(),'title':e.target.value});}}/>
            <label htmlFor='description'>Description</label>
            <textarea className='h-1/5 resize-none' row='10' col='10'value={profile.description} onChange={(e)=>{setProfile({...profile,'time':Date(),'description': e.target.value})}}> </textarea>
        </div>
        <hr />
        <div className="flex justify-end items-center h-1/5">
            <button onClick={()=>{addblog();modal.close()}}>Save</button>
            <button onClick={()=>{modal.close()}}>Close</button>
        </div>
        </div>
       
       </dialog>
        }
        </div>
        <hr className='bg-gray-100 w-[98%] h-0.5'/>
        {profile.blog.map(blog =>
        {
        return <div className="flex flex-col justify-around h-1/5 w-[98%] border-2 border-black divide-solid mt-auto" >
        <div className="h-4/5">
        <p className='date'> Last Updated: {blog.blog_detail.time}</p>
        <h2 className='title'>{blog.blog_detail.title}</h2>
        <p className='description'>{blog.blog_detail.description}</p> 
        </div>
        {profile.email === blog.email?
         <div className="flex justify-end h-1/4">
         <button className='bg-green-500' id="update" onClick={()=>{rendermodal({title : blog.blog_detail.title , description :blog.blog_detail.description ,time:blog.blog_detail.time ,blogid:blog.blog_id}) }}>Update</button>
         <button className='bg-gray-500'id="delete" onClick={() => {deleteblog(blog.blog_id)}}>Delete</button>
      </div>:null};
       
       
        </div>
        }

        )}
        
        
    </div>
  )
}

export default Blog


function RenderModal() {
    return(
        <div> hello ji</div>
    )
}
