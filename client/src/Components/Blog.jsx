import React, { useEffect, useState } from 'react';
import '../CSS/styleblog.css';
import { useLocation } from 'react-router-dom';



function Blog() {
    const [title,setTitle] = useState("string");
    const [description,setDescription] = useState("string");
    const [time , setTime] = useState("string");
    const [token,setToken] = useState("string");
    const[blogid,setBlogid] = useState("string");

    const [blog,setBlog] = useState([]);
    // const [rendermodal,setRendermodal] = useState();
    const fetchblog = async()=>{
        try{
            const response = await fetch('http://localhost:3001/blog',{
                method : 'GET'
            })

            const json  = await response.json();

            if(response.status!==200)
            {
                const error = "there is error!!";
                throw error;
            }
            setBlog(json);
            console.log(blog);

            return true;

        }catch(err)
        {
            alert(err);
            return false;
        }

    }
    useEffect(()=>{
        setToken(localStorage.getItem('token'))
          fetchblog()
        },[])

  const addblog = async()=>{
     try{
        const temp = { blogid , blogdetail : {title,description,time}};
        if ( !token)
        {
            const err = 'trying to sign in first';
            throw err;
        }
        const response  = await fetch('http://localhost:3001/blog/add',{
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body : JSON.stringify(temp)
        })

        if(response.status!=200)
        {
            const error=  'some error occured!';
            throw error;
        }
        console.log(response.status);
        fetchblog();
     }
     catch(err)
     {
        alert(err);

     }
     

  }

  const deleteblog = async(blogid) =>{
    try{
        let temp = confirm('Do you want to delete the Blog ?');
        if(!temp )
        {
            return;
        }

        const response = await fetch(`http://localhost:3001/blog/delete/:${blogid}`,{
            method : 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        const json  = await  response.json();

        if(response.status!== 200)
        {
            const err = json.msg;
            throw err;
            
        }

        const fetch_data = await fetchblog();
       
        if(fetch_data)
        {
           setTimeout(()=>{
            alert(json.msg);

        },500);
        }
        
    }catch(err)
    {
         alert(err);
    }
  }



  const rendermodal = (props) =>{
   try{ 
    setTitle(props.title);
    setTime(props.time);
    setDescription(props.description); 
    setBlogid(props.blogid)
    modal.showModal()
   }catch(err)
   {
    alert(err);
   }
  }

  return (
    <div className='home'>
        <div className='top-title'>
        <h1>Blogs</h1>
        <button onClick={()=>{rendermodal({title : '',description:'',time:''})}}> add blog</button>

        {<dialog id='modal' >
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
        }
        </div>
        <hr/>
        {blog.map(blog =>
        {
        return <div className="blog-box">
        <div className="blog-box-body">
        <p className='date'> Last Updated: {blog.blog_detail.time}</p>
        <h2 className='title'>{blog.blog_detail.title}</h2>
        <p className='description'>{blog.blog_detail.description}</p> 
        </div>
        <div className="blog-box-footer">
            <button id="update" onClick={()=>{rendermodal({title : blog.blog_detail.title , description :blog.blog_detail.description ,time:blog.blog_detail.time ,blogid:blog.blog_id}) }}>Update</button>
            <button id="delete" onClick={() => {deleteblog(blog.blog_id)}}>Delete</button>
        </div>
       
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
