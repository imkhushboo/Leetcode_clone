import React, {useEffect, useState } from 'react';
import "../CSS/stylepage.css";
import {  useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchselectedproblem ,submitProblemcode} from '../redux/actionCreator';

function Page() {
    const inital_text = `
    #include<bits.stdc++.h>  
    using namespace std; 
    int main(){
       //write code here
   
    return 0;
    }`;

    const initial_testcase = ` 1 2 3`;
    const [text,setText] = useState(inital_text);
    const[testcase,setTestcase] = useState(initial_testcase);
    const dispatch = useDispatch();
    const {problem,status,success,message,Acceptance}= useSelector(state=>state.RenderSelectedProblem);
    const location = useLocation();
   
    const navigate = useNavigate();
    const id = location.pathname.split(':')[1];



  useEffect(()=>{
    dispatch(fetchselectedproblem(id));
    },[]);


    const runtestcase =() =>{
        alert('ACCEPT SOLUTION');
    }


    const handleSubmitProblem =(e)=>{
        e.preventDefault();
        dispatch(submitProblemcode({text,problem_id:id}));



    }
    



    
  return (
    <>
    <div className='flex justify-between h-[89vh] w-full text-white'>
    <div className='flex flex-col justify-between w-[49%]'>
       <ul className='flex justify-between list-none items-center h-[13%] text-lg'>
           <li>Description</li>
           <li onClick = {()=>{navigate(`/problems/:${id}/submissions`)}}>Submission</li>
       </ul>
       <hr/>
       {problem.map(problem =>
       <RenderProblems
          key={problem._id}
          id= {problem.problem_id}
          Title = {problem.Title}
          description = {problem.description}
          Examples = {problem.Examples}
          Constraints ={problem.Constraints}
       />
      )
       }
    
   </div>
   <div className='w-[49%]'>
       <div className='flex justify-start h-[50px] '>
       <select className=' bg-[#333453] h-full'name="language" id="language">
      <option value="Cpp">Cpp</option>
      <option value="Python">Python</option>
      <option value="Java">Java</option>
      <option value="Javascript">Javascript</option>
      </select>
       </div>
       <div className='h-4/5  border-blue-400 border-solid'>
           <textarea className='w-full  h-full resize-none  bg-[#4f5072] rounded-md border-[#4e4e69]' id='code' value={text} onChange={(e)=>{setText(e.target.value)}}/>
       </div>
       <div className='h-[16%] w-[98%] hidden'>
           <h4>Input Test Case :</h4>
           <textarea className='w-full h-3/5 resize-none bg-[#4f5072]' onChange={(e)=>{console.log(text) ;setTestcase(e.target.value)}} value={testcase} />
       </div>
       <div className='flex justify-end h-[10%]'>
               <button id='submit_btn'>Test Cases</button>
               <button id ='submit_btn'onClick = {runtestcase} type ='submit'>Run code</button>
               <button id ='submit_btn' onClick={(e)=>{handleSubmitProblem(e);}}type='submit'>Submit Code</button>
           </div>
   </div>
   </div>
  </>
 );
}

function RenderProblems(props)
{
   return(
       <div className='justify-around border-r-2 p-[2%] h-fit overflow-y-scroll' key ={props.id}>
        <h1>{props.key}</h1>
       <h2 className='text-lg'>{props.Title}</h2>
       <hr />
       <div>{props.description}</div>
       <hr/>
       <div className='flex flex-col justify-between '>
        {props.Examples.map(example =>
            <div className='flex flex-col justify-between h-2/5' key ={example.id}> 
            <h3 className='text-lg'>Examples: {example.id}</h3>
            <div  >
            <h4 >Input :</h4>
            <p >{example.Input}</p>
            <h4 >Output :</h4>
            <p >{example.Output}</p>
            <h4 >Explaination: </h4>
            <p >{example.Explanation}</p>
            <hr/>
            </div>
            </div>
           )}
       </div>
       <hr />
       <div className='flex flex-col '>
       <h3 className='text-lg'>Constraints: </h3>
       <div className='bg-blueviolet'>{props.Constraints}</div>
       </div>  
       </div>
   
    );
}


export default Page
