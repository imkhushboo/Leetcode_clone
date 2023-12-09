import React, { useContext, useEffect, useState } from 'react';
import "../CSS/stylehome.css";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import HelperContext from '../context/helperContext';

function Home() {
      const {profile,fetchproblems} = useContext(HelperContext);
    useEffect(()=>{
        fetchproblems(1);
    },[])


    


    return (
        <div className='top-top-problem-render'>
          <div className="top-heading"> Problems</div>
          <hr />
            <div className='top_problem_render'>
      <div className='problem_render'>
      <table>
        <tr>
            <th> Title</th>
            <th> Difficulty</th>
            <th> Acceptance</th>
        </tr>
      
        { profile.problems.map(problem=>
             <RenderProblems 
               _id={problem._id}
               Title = {problem.Title}
               Acceptance ={problem.Acceptance}
               Difficulty = {problem.Difficulty}
  
             />
        )
        }
        
      </table> 

      </div>
       <div className='toggle_problems'>
       <button onClick={()=>{
        fetchproblems(1);
       }}>1</button>
      <button onClick={()=>{
         fetchproblems(2);
      }}>2</button>
      </div>
      </div>
        </div>
        
    )
      } 

function RenderProblems(props)
{

  return(
  
    <tr>
      <td><Link to={{pathname: `/problem/:${props._id}`,problem_id : props._id}} >{props.Title}</Link></td>
      <td>{props.Acceptance}</td>
      <td>{props.Difficulty}</td>
     </tr>
    
  );
}




export default Home
