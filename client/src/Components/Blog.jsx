import React, { useContext, useEffect, useState } from 'react';
import '../CSS/styleblog.css';
import { useLocation } from 'react-router-dom';
import HelperContext from '../context/helperContext';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { rendermodal,addblog,deleteblog, fetchBlog } from '../state/actionCreator';




function Blog() {
  const dispatch = useDispatch();
  const profile = useSelector(state =>state.BlogReducer);
  const modal_detail = useSelector(state=>state.RenderModalReducer);
      useEffect(()=>{
        console.log(profile);
        if(profile.status === 200)
        {
          toast.success(profile.message);
        }
        else if(profile.status === 500)
        {
          toast.error(profile.message);
        }
        else if(profile.lodaing === true){
          toast.loading('loading ....');
        }
        },[profile]);

const handleblogsubmit = (e) =>{

  e.preventDefault();
  console.log(e.target.title);
  const title = e.target.title.value;
  const description =e.target.description.value;
  const time  = Date();
  console.log(title,description);
  dispatch(addblog({title,description,time}));
  dispatch(fetchBlog());
  modal.close();

}



  return (

    <div id="blog" className='mt-[5%] m-auto w-[98%] h-[80vh] overflow-y-scroll'>
      <Toaster />
    <div className='flex w-[98%] justify-between items-center h-1/5'>
    <h4 className='text-3xl ml-[5%] font-bold'>Blogs</h4>
    <button className='w-1/5 h-2/5'onClick={()=>{dispatch(rendermodal({title : '',description:'',time:''}));modal.showModal()}}> add blog</button>

    {<dialog className='m-auto h-[50vh] w-[70%]'id='modal' >
      <form className='flex w-full h-full' onSubmit = {handleblogsubmit}>
      <div className="flex flex-col h-full w-full justify-between">
    <div className='flex justify-around items-center h-1/5'>
    <h1 >Blog</h1>
     <button className='ml-[5%]' id='close-button' onClick={()=>{modal.close()}}close>close</button>
    </div>
    <hr />
    <div className='flex flex-col h-2/5 justify-between'>
        <label htmlFor='title'>Enter Title</label>
        <input  name='title' id='title ' type='text'placeholder='enter title' value={modal_detail.title} onChange={(e)=>{dispatch(rendermodal({'title':e.target.values,'time':Date()}))}}/>
        <label htmlFor='description' >Description</label>
        <textarea name='description' id='description' type='text'className='h-2/5 resize-none' row='10' col='10' value = {modal_detail.description} onChange={(e)=>{dispatch(rendermodal({'description':e.target.values,'time':Date()}))}} > </textarea>
    </div>
    <hr />
    <div className="flex justify-end items-center h-1/5">
        <button type= 'submit'>Save</button>
        <button onClick={()=>{modal.close()}}>Close</button>
    </div>
    </div>
      </form>
   
   
   </dialog>
    }
    </div>
    <hr className='bg-gray-100 w-[98%] h-0.5'/>
    {profile.blog.map(blog =>
    {
    return <div className="flex flex-col justify-between h-1/5 w-[98%] border-2 border-black divide-solid mt-auto" >
    <div className="h-4/5">
    <p className='date'> Last Updated: {blog.blog_detail.time}</p>
    <h2 className='title'>{blog.blog_detail.title}</h2>
    <p className='description'>{blog.blog_detail.description}</p> 
    </div>
    {profile.email !== blog.email?
     <div className="flex justify-end h-1/5">
     <button className='bg-green-500 h-full' id="update" onClick={()=>{dispatch(rendermodal({title : blog.blog_detail.title , description :blog.blog_detail.description ,time:blog.blog_detail.time ,blogid:blog.blog_id}));modal.showModal(); }}>Update</button>
     <button className='bg-gray-500 h-full'id="delete" onClick={() => {dispatch(deleteblog(blog.blog_id));dispatch(fetchBlog());}}>Delete</button>
  </div>:null}
   
   
    </div>
    }

    )}
    
    
</div>

  )
}

export default Blog
