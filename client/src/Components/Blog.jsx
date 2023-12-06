import React, { useState } from 'react';
import '../CSS/styleblog.css';

function Blog() {
    const [title,setTitle] = useState();
    const [description,setDescription] = useState();
    const [time , setTime] = useState();

    const [blog,setBlog] = useState([])

  const addblog = ()=>{
     try{
         setBlog([... blog,{time,title,description}] );
         console.log(blog);

     }
     catch(err)
     {
        alert(err);

     }
     

  }

  return (
    <div className='home'>
        <div className='top-title'>
        <h1>Blogs</h1>
        <button onClick={()=>{setDescription(''),setTitle('');modal.showModal()}}> add blog</button>
       
        <dialog id='modal' >
            <div className="modal-modal">
            <div className='top'>
            <h1 id='title-heading'>Blog</h1>
             <button  id='close-button' onClick={()=>{modal.close()}}close>close</button>
            </div>
            <hr />
            <div className='blog-body'>
                <label htmlFor='title'>Enter Title</label>
                <input  name='title'placeholder='enter title' value = {title}onChange={(e)=>{setTime(Date());setTitle(e.target.value)}}/>
                <label htmlFor='description'>Description</label>
                <textarea row='10' col='10'value={description} onChange={(e)=>{setTime(Date());setDescription(e.target.value)}}> </textarea>
            </div>
            <hr />
            <div className="blog-footer">
                <button onClick={()=>{addblog();modal.close()}}>Save</button>
                <button onClick={()=>{modal.close()}}>Close</button>
            </div>
            </div>
           
           </dialog>
        
        </div>
        <hr/>
        {blog.map(blog =>
        <div className="blog-box">
        <p className='date'> Last Updated: {blog.time}</p>
        <h2 className='title'>{blog.title}</h2>
        <p className='description'>{blog.description}</p> 
        </div>


        )}
        
        
    </div>
  )
}

export default Blog
