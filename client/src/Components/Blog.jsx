import React, {  useCallback, useEffect, useState } from 'react';
import '../CSS/styleblog.css';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import {addblog,deleteblog, fetchBlog } from '../redux/actionCreator';




function Blog() {
  const dispatch = useDispatch();
  const profile = useSelector(state =>state.BlogReducer);
  const {email} = useSelector(state=>state.AuthReducer);
  const navigate = useNavigate();
  
  const [title,setTitle] =  useState();
  const [description,setDescription] =useState();
  const [time,setTime]= useState();
  const [blogid,setBlogid] = useState(null);


    useEffect(()=>{
      dispatch(fetchBlog());
      console.log(profile);
     
    
      if(profile.status === 200 )
      {
        toast.success(profile.message);
      }
      else if(profile.status === 500)
      {
        toast.error(profile.message);
      }
      else if(profile.loading === true){
        toast.loading('loading ....');
      }
  
      
      
      },[]);

      
  const handleblogsubmit = (e) =>{
    dispatch(addblog({ blogid, title, description, time }));
    console.log(profile);
    modal.close();
  };


  const handleblogdelete = (blog_id) =>{
    dispatch(deleteblog(blog_id));
    // dispatch(fetchBlog())

  }


  return (

    <div id="blog" className='mt-[5%] m-auto w-[98%] h-[90vh]  text-white'>
    <div className='flex w-full justify-between items-center h-[10%]'>
    <h4 className='text-3xl ml-[5%] font-bold'>Blogs</h4>
    <button id='add_blog_btn' className='w-1/5 h-2/5'onClick={()=>{setTitle('');setDescription('');setTime(Date());modal.showModal();}}> add blog</button>
    {<dialog className='m-auto h-[50vh] w-3/5  'id='modal' >
      <div className="flex flex-col h-full w-full justify-between bg-[#5e5b6b]  text-white">
    <div className='flex justify-around items-center h-1/5'>
    <h1 className='text-lg '>Blog</h1>
     <button className='ml-[5%] text-lg' id='close-button' onClick={()=>{modal.close()}}close>Close</button>
    </div>
    <hr />
    <div className='flex flex-col h-2/5 justify-between'>
        <label htmlFor='title'>Enter Title</label>
        <input  className='m-auto text-black' name='title' id='title ' type='text'placeholder='enter title' value={title} onChange={(e)=>{setTitle(e.target.value);setTime(Date())}}/>
        <label htmlFor='description' >Description</label>
        <textarea name='description' id='description' type='text'className='h-2/5 resize-none m-auto text-black' row='10' col='10' value = {description} onChange={(e)=>{setDescription(e.target.value),setTime(Date())}} > </textarea>
    </div>
    <hr />
    <div className="flex justify-end items-center h-1/5">
        <button id='blog_submit'onClick={(e)=>{handleblogsubmit(e);}} type= 'submit'>Save</button>
        <button id='blog_submit' onClick={()=>{modal.close()}}>Close</button>
    </div>
    </div>
   </dialog>
    }
    </div>
    <hr className='bg-gray-100 w-[98%] h-0.5'/>
    <div className='overflow-y-scroll h-full'>
    {profile.blog.map(blog =>
    {
        return    <div key={blog.blog_id}className="w-[98%] border-2 my-2 divide-solid mt-auto rounded-lg bg-[#5e5b6b]" >
                  <div >
                  <p className='text-lg '>Last Updated: {blog.blog_detail.time}</p>
                  <h2 className='title'>{blog.blog_detail.title}</h2>
                  <p className='description'>{blog.blog_detail.description}</p> 
              

                  </div>
                  {email === blog.email?
                  <div className="flex justify-end h-1/5">
                  <button  id="update_btn" onClick={()=>{setBlogid(blog.blog_id);setTitle(blog.blog_detail.title ); setDescription(blog.blog_detail.description); setTime(blog.blog_detail.time);modal.showModal(); }}>Update</button>
                  <button id='delete_btn' onClick={(e) => {handleblogdelete(blog.blog_id);navigate(0);}}>Delete</button>
                  </div>:
                      <h1 className='text-sm'>Written By: {blog.email}</h1>}
      
   
    </div>
    }

    )}

    </div>
    
    
    
</div>

  )
}

export default Blog
