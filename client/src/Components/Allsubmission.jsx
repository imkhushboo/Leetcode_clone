import React, { useContext, useEffect, useState } from 'react';
import '../CSS/styleallsubmission.css';
import { Link } from 'react-router-dom';
import HelperContext from '../context/helperContext';


function Allsubmission() {

    const {profile,fetchsubmission} = useContext(HelperContext);

    useEffect(()=>{
        console.log(profile);
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
       {profile.submission.map(submission=>
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
