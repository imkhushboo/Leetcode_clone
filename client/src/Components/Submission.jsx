import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import '../CSS/styleallsubmission.css';

function Submission() {
   const [submission,setSubmission ]= useState([]);
   const location = useLocation();


   useEffect(()=>{
    const submitcode = async() =>{
         const id = location.pathname.split('/')[2].split(':')[1];
         console.log('id',id);
        const token = localStorage.getItem('token');
         console.log(token);
        try{
            const response = await fetch(`http://localhost:3001/problems/:${id}/submissions`,{
                method : 'GET',
                headers :  { "Authorization": `Bearer ${token}` },
            })

            const json = await response.json();

            if(response.status != 200)
            {
                const err = 'some error occured!';
                throw err;
            }
            console.log(json);
            setSubmission(json.submissions);
            

        }catch(err)
        {
           console.log(err);
        }
    }

    submitcode();

   },[])

  return (
    <div id='submission'>
    <table>
        <tr> 
            <td>Solution id </td>
            <td>Acceptance</td>
            <td>Submission</td>

            </tr>
           
            {submission.map( x =>  
                <tr>
                 <td> {x.solution_id}</td>
                 <td style={ (x.Acceptance ==='Accepted') ? {color : "green"} :{color :'red'}}>{x.Acceptance}</td>
                <td>{x.solution}</td>
                </tr>)
               }
           
        
    </table>


    </div>
    
  )
}

export default Submission
