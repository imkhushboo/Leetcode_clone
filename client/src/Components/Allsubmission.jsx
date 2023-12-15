import React, { useContext, useEffect, useState } from 'react';
import '../CSS/styleallsubmission.css';
import { Link } from 'react-router-dom';
import { fetchsubmission } from '../redux/actionCreator';
import { useDispatch, useSelector } from 'react-redux';


function Allsubmission() {
    const dispatch = useDispatch();

    const submission = useSelector(state=>state.FetchSubmissionReducer);

    useEffect(()=>{
        dispatch(fetchsubmission());
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
