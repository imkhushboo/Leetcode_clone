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
    <div className='home'>
        <div className='top-title'>
        <h1>Blogs</h1>
        <button onClick={()=>{rendermodal({title : '',description:'',time:''});modal.showModal()}}> add blog</button>

        {<dialog id='modal' >
        <div className="modal-modal">
        <div className='top'>
        <h1 id='title-heading'>Blog</h1>
         <button  id='close-button' onClick={()=>{modal.close()}}close>close</button>
        </div>
        <hr />
        <div className='blog-body'>
            <label htmlFor='title'>Enter Title</label>
            <input  name='title'placeholder='enter title' value = {profile.title}onChange={(e)=>{setProfile({...profile,'time':Date(),'title':e.target.value});}}/>
            <label htmlFor='description'>Description</label>
            <textarea row='10' col='10'value={profile.description} onChange={(e)=>{setProfile({...profile,'time':Date(),'description': e.target.value})}}> </textarea>
        </div>
        <hr />
        <div className="blog-footer">
            <button onClick={()=>{addblog();modal.close()}}>Save</button>
            <button onClick={()=>{modal.close()}}>Close</button>
        </div>
        </div>
       
       </dialog>
        }
        </div>
        <hr/>
        {profile.blog.map(blog =>
        {
        return <div className="blog-box">
        <div className="blog-box-body">
        <p className='date'> Last Updated: {blog.blog_detail.time}</p>
        <h2 className='title'>{blog.blog_detail.title}</h2>
        <p className='description'>{blog.blog_detail.description}</p> 
        </div>
        {profile.email === blog.email?
         <div className="blog-box-footer">
         <button id="update" onClick={()=>{rendermodal({title : blog.blog_detail.title , description :blog.blog_detail.description ,time:blog.blog_detail.time ,blogid:blog.blog_id}) }}>Update</button>
         <button id="delete" onClick={() => {deleteblog(blog.blog_id)}}>Delete</button>
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
