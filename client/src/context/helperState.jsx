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
   
   




  

    const LogOut = ()=>{
        localStorage.removeItem('token');
        setProfile({...profile,'token':null,'submission':'',email:'',password:'',title:''});
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
    <HelperContext.Provider value={{profile,setProfile,signupUser,LogIn,LogOut,fetchsubmission,submitcode,submitProblemcode,showproblems,fetchproblems}}>
      {props.children}
    </HelperContext.Provider>
  )
}

export default HelperState;


