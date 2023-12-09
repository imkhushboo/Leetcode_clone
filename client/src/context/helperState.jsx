import React, { useEffect, useState } from 'react';
import HelperContext from './helperContext';

function HelperState(props) {
    const [profile,setProfile] = useState({
        'email':'',
        'password':'',
        'token' : null,
        'title' :'',
        'description':'',
        'time':'',
        'blogid':null,
        'blog':[],
        'submission':[],
        'problems':[]
    })
    useEffect(()=>{
        if(localStorage.getItem('token'))
        {
            setProfile({...profile,'token':localStorage.getItem('token')});
        }

    },[profile.token])
   
    const signupUser = async ({email,password})=>{
        try{
            console.log(email,password);
            
             const response=  await fetch("http://localhost:3001/signup",{
                method : 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
    
                body : JSON.stringify({
                    email,password
                })
            });
    
            
            const json= await response.json();
            
            if(response.status !=200)
            {
                const err = json.msg;
                throw err;
            }

            setProfile({...profile,'email':email,'password':password});
            return {status:200,message:'SuccessFull!!'}
            
            
        }
        catch(err)
        {
              return {status:500,message:err};
       }
    }





    const LogIn= async({email,password})=>{
       
        try{
            const response= await fetch("http://localhost:3001/login",{
            method : 'POST',
            headers: {
                "Content-Type": "application/json",
            },

            body : JSON.stringify({
                email,password
            })
        });

       
        const json = await response.json();

        if(response.status !=200)
        {
            const err = json.msg;
            throw err;
        }
        console.log(json.token);
        localStorage.setItem('token',json.token);

        setProfile({...profile,'token':json.token,loggedIn:true,email:email,password:password});
        console.log(profile);

        return {status:200,token:json};
        

        }catch(err)
        {  
          alert(err);
          console.log(err);
          return {status:500,message:err};
        }

    }


    const LogOut = ()=>{
        localStorage.removeItem('token');
        setProfile({...profile,'token':null,'submission':'',email:'',password:'',title:''});
      }


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
            setProfile({...profile,'blog':json});
            console.log(profile.blog);

            return true;

        }catch(err)
        {
            alert(err);
            return false;
        }

    }

    const addblog = async()=>{

        try{
           const temp = {blogid:null, blogdetail : {title:profile.title,description:profile.description,time:profile.time}};
           if ( !profile.token)
           {
               const err = 'trying to sign in first';
               throw err;
           }
           const response  = await fetch('http://localhost:3001/blog/add',{
               method: 'PUT',
               headers: {
                   "Authorization": `Bearer ${profile.token}`,
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
                "Authorization": `Bearer ${profile.token}`
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

        setProfile({...profile,
                   'title':props.title,
                    'time':props.time,
                    'description':props.description,
                    'blogid':props.blogid})
    }catch(err)
    {
     alert(err);
    }
   }



    const fetchsubmission = async()=>{
        try{
            //  const token = localStorage.getItem('token');

             const response = await fetch('http://localhost:3001/submissions',{

             method : 'POST',
             headers :  { "Authorization": `Bearer ${profile.token}` },

               }
             )

             const json = await response.json();

             if(response.status!=200)
             {
                const err ='Not able to fetch';
                throw err;
             }
             
             setProfile({...profile,'submission':json})

        }catch(err)
        {
            alert(err);
        }

    }


    const submitcode = async(problem_id) =>{
       try{
           const response = await fetch(`http://localhost:3001/problems/:${problem_id}/submissions`,{
               method : 'GET',
               headers :  { "Authorization": `Bearer ${profile.token}` },
           })

           const json = await response.json();

           if(response.status != 200)
           {
               const err = 'some error occured!';
               throw err;
           }
           console.log(json);
           setProfile({...profile,'submission':(json.submissions)});
           

       }catch(err)
       {
          console.log(err);
       }
   }



   const submitProblemcode = async({text,problem_id}) =>{
    try{
        console.log(text);
        const response = await fetch(`http://localhost:3001/submit/:${problem_id}`,{
            method : 'POST',
            headers :  {
            'Access-Control-Allow-Origin': "*",
            "Content-Type": "application/json",
             "Authorization": `Bearer ${profile.token}` },
            
            body : JSON.stringify({
                solution : text
            })

        })

        const json = await response.json();

        if(response.status != 200)
        {
            const err = 'some error occured!';
            throw err;
        }
        
        if(json.Acceptance === 'Accepted')
        {
            alert('Accepted');
        }
        else{
            alert('Rejected');
        }

    }catch(err)
    {
        alert('Error occured !');
    }
}

const fetchproblems = async(pageno) => {

    try{
       
        const response  = await fetch(`http://localhost:3001/problemSet/all/:${pageno}`,{
            method : 'POST',
        })

        const json  = await response.json();
        // console.log(json);

        if(response.status != 200)
        {
            const err = json.msg;
            throw err;
        }

        setProfile({...profile,'problems':json});
    }catch(err)
    {
        console.log(err);
    }

}

const showproblems = async(problem_id)=>{

    try{
        const response = await fetch(`http://localhost:3001/problem/:${problem_id}`,{
            method : 'GET',

        })

        const json = await response.json();

        if(response.status != 200)
        {
            const err = json.msg;
            throw err;
        }
        console.log(json.problem);

        setProfile({...profile,'problems':json.problem});
        

    }catch(err)
    {
        console.log(err);
    }
}
   

  return (
    <HelperContext.Provider value={{profile,setProfile,signupUser,LogIn,LogOut,fetchblog,fetchsubmission,addblog,deleteblog,rendermodal,submitcode,submitProblemcode,showproblems,fetchproblems}}>
      {props.children}
    </HelperContext.Provider>
  )
}

export default HelperState;


