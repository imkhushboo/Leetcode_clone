import React, { useContext, useEffect, useState } from 'react';
import "../CSS/stylepage.css";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import HelperContext from '../context/helperContext';

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
     const {profile,setProfile,submitProblemcode,showproblems} = useContext(HelperContext);
    const location = useLocation();
   
    const navigate = useNavigate();
    const id = location.pathname.split(':')[1];



  useEffect(()=>{
    showproblems(id);
    },[]);


    const runtestcase =() =>{
        alert('ACCEPT SOLUTION');
    }

    



    
  return (
    <div className='top_bar'>
     <div className='problem_desc'>
        <ul>
            <li>Description</li>
            <li onClick = {()=>{navigate(`/problems/:${id}/submissions`)}}>Submission</li>
        </ul>
        {profile.problems.map(problem =>
        <RenderProblems
           key = {profile.problems._id}
           Title = {problem.Title}
           description = {problem.description}
           Examples = {problem.Examples}
           Constraints ={problem.Constraints}
        />
       )
        }
     
    </div>
    <div className='Notepad'>
        <div className='language_selector'>
        <select name="language" id="language">
       <option value="Cpp">Cpp</option>
       <option value="Python">Python</option>
       <option value="Java">Java</option>
       <option value="Javascript">Javascript</option>
       </select>
        </div>
        <div className='notepad'>
            <textarea onChange={(e)=>{console.log(text) ;setText(e.target.value)}} value={text}/>
        </div>
        <div className='test-case'>
            <h4>Input Test Case :</h4>
            <textarea  onChange={(e)=>{console.log(text) ;setTestcase(e.target.value)}} value={testcase} />
        </div>
        <div id='btn'>
                <button onClick = {runtestcase} type ='submit'>Run code</button>
                <button onClick = {()=>{submitProblemcode({text,problem_id:id})}}type='submit'>Submit Code</button>
            </div>
      
    </div>
    </div>
   
  )
}

function RenderProblems(props)
{
    return(
        <div className='problem2' key ={props.key}>
        <h2>{props.Title}</h2>
        <hr />
        <div className='pdesc'>{props.description}</div>
        <div className='examples'>
         {props.Examples.map(example =>
             <div className='top-examples1' key ={example.id}> 
             <h3 className='title-example'>Examples: {example.id}</h3>
             <div className='example2' >
             <h4 className='title-input'>Input :</h4>
             <p className='example-input'>{example.Input}</p>
             <h4 className='title-output'>Output :</h4>
             <p className='example-output'>{example.Output}</p>
             <h4 className='title-explaination'>Explaination: </h4>
             <p className='example-explaination'>{example.Explanation}</p>
             </div>
             </div>
            )}
        </div>
        <div className='constraints'>
        <h3 className='title-constraint'>Constraints: </h3>
        <div className='constraint-description'>{props.Constraints}</div>

       
        </div>
       
        </div>
    );
}


export default Page
