import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import '../CSS/styleallsubmission.css';
import HelperContext from '../context/helperContext';

function Submission() {
    const location = useLocation();
    const {profile,submitcode} = useContext(HelperContext);
    const id = location.pathname.split('/')[2].split(':')[1];
     useEffect(()=>{
    submitcode(id);

   },[])

  return (
    <div id='submission'>
    <table>
        <tr> 
            <td>Solution id </td>
            <td>Acceptance</td>
            <td>Submission</td>

            </tr>
           
            {profile.submission.map( x =>  
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
