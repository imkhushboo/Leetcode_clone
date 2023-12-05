import React, { useEffect, useState } from 'react';
import "../CSS/stylehome.css";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Home() {
    const navigate = useNavigate();
    const [problems,setProblems ] = useState([]);
    const [pageno,setPageno] = useState(1);
    useEffect(()=>{
        setPageno(1);
        fetchproblems();
       
    },[])


    const fetchproblems = async() => {

        try{
            console.log(pageno);
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

            setProblems(json);
        }catch(err)
        {
            console.log(err);
        }

    }


    return (
        <div className='top-top-problem-render'>
            <div className='top_problem_render'>
      <div className='problem_render'>
      <table>
        <tr>
            <th> Title</th>
            <th> Difficulty</th>
            <th> Acceptance</th>
        </tr>
      
        { problems.map(problem=>
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
        setPageno(1);
        fetchproblems();
       }}>1</button>
      <button onClick={()=>{
        setPageno(2);
         fetchproblems();
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
