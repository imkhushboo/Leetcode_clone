import React, { useContext, useEffect, useState } from 'react';
import "../CSS/stylehome.css";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { fetchproblems } from '../state/actionCreator';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
     const dispatch = useDispatch();
      const problems  = useSelector(state=>state.ProblemRenderReducer);
    useEffect(()=>{
        dispatch(fetchproblems(1));
    },[])


    


    return (
        // <div className='top-top-problem-render'>
        <div className='bg-green-700 flex flex-col justify-center h-[90vh]'>
          <div className="text-center font-bold text-3xl h-[10%]"> Problems</div>
          <hr className='bg-gray m-auto h-1 w-[90%]'/>
            <div className='bg-pink-700 flex flex-col justify-around h-full w-4/5 m-auto'>
      <div className='flex flex-col justify-center align-middle h-full w-[90%] m-auto border-2 border-black divide-solid'>
      <table>
        <tr >
            <th className='h-full w-2/6'> Title</th>
            <th  className='h-full w-2/6'> Difficulty</th>
            <th  className='h-full w-2/6'> Acceptance</th>
        </tr>
      
        { problems.problem.map(problem=>
             <RenderProblems 
                key={problem._id}
               _id={problem._id}
               Title = {problem.Title}
               Acceptance ={problem.Acceptance}
               Difficulty = {problem.Difficulty}
  
             />
        )
        }
        
      </table> 

      </div>
       <div className='flex justify-end w-4/5 h-[16%] m-auto'>
       <button  className='mx-[2%] w-[10%] rounded-lg'onClick={()=>{
        dispatch(fetchproblems(1));
       }}>1</button>
      <button className='mx-[2%] w-[10%] rounded-lg' onClick={()=>{
         dispatch(fetchproblems(2));
      }}>2</button>
      </div>
      </div>
        </div>
        
    )
      } 

function RenderProblems(props)
{

  return(
  
    <tr >
      <td ><Link to={{pathname: `/problem/:${props._id}`,problem_id : props._id}} >{props.Title}</Link></td>
      <td>{props.Acceptance}</td>
      <td >{props.Difficulty}</td>
     </tr>
    
  );
}




export default Home
