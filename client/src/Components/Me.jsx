import React, { useState } from 'react';
import '../CSS/stylemepage.css';


function Me() {
    const [name,setName] = useState();
     

  return (
    <div className='Personal-details'>
        <div className='left'>
           <img />
           <div>name</div>
           <div>email</div>
           <button>logout</button>
        </div>

        <div className='right'>
            <h1>Personal Details : </h1>
           
          <label htmlFor="name">Name :</label>
         <input onChange={(e)=>{setName(e.target.value)}}id = "name" value ={name}></input> 
         <label htmlFor='email'>Email</label>
          <input id="email" />

          <label htmlFor="">Contact</label>
          <input />

          <div>
            <button>Update User</button>
            <button> Delete User</button>
        </div>

        </div>
        
     

    </div>
  )
}

export default Me
