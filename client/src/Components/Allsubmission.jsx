import React, { useEffect, useState } from 'react';
import '../CSS/styleallsubmission.css';
import { Link } from 'react-router-dom';


function Allsubmission() {
    const [submission,setSubmission] = useState([]);
   
    const fetchsubmission = async()=>{
        try{
             const token = localStorage.getItem('token');

             const response = await fetch('http://localhost:3001/submissions',{

             method : 'POST',
             headers :  { "Authorization": `Bearer ${token}` },

               }
             )

             const json = await response.json();

             if(response.status!=200)
             {
                const err ='Not able to fetch';
                throw err;
             }
             
             setSubmission(json)



        }catch(err)
        {
            alert(err);
        }

    }



    useEffect(()=>{
        fetchsubmission();
    },[])


  return (
    <div className='allsubmission'>

       <table>
        <tr>
            <th>Problem id</th>
            <th>Acceptance</th>
            <th>Solution</th>
        </tr>
       {submission.map(submission=>
            <tr>
                <td><Link to={{pathname: `/problem/:${submission.problem_id}`,problem_id : submission.problem_id}}>{submission.problem_id}</Link></td>
                <td style={ (submission.Acceptance ==='Accepted') ? {color : "green"} :{color :'red'}}>{submission.Acceptance}</td>
                <td>{submission.Solution}</td>
            </tr>
       )}


        </table> 
        </div>
     
    
  )
}

export default Allsubmission
