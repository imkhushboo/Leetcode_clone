import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import '../CSS/styleallsubmission.css';
import { useDispatch, useSelector } from 'react-redux';
import { submitcode } from '../redux/actionCreator';


function Submission() {
    const location = useLocation();
    const dispatch = useDispatch();
    const submission = useSelector(state=>state.FetchSubmissionReducer);
    const id = location.pathname.split('/')[2].split(':')[1];
     useEffect(()=>{
    dispatch(submitcode(id));

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
                <tr key= {x.solution_id}>
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
