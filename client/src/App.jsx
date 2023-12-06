import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './Components/Home';
import Page from './Components/Page';
import SignUp from "./Components/SignUp";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Submission from "./Components/Submission";
import { useEffect, useState } from "react";

import './App.css';
import Me from "./Components/Me";
import Loginprotected from "./middleware/Loginprotected";
import Blog from "./Components/Blog";
import Allsubmission from "./Components/Allsubmission";
import Pagenotfound from "./Components/Pagenotfound";



function App() {
  const [loggedIn , setLoggedIn] = useState(false);
  useEffect(()=>{
     
      if(localStorage.getItem('token'))
      {
          setLoggedIn(true);
      }
      else{
        setLoggedIn(false);
      }

      console.log(loggedIn);
    

  },[])

  const changeloggedin =(temp)=>{
    setLoggedIn(temp);
 
  }

  return(
    <BrowserRouter>
  
    <Navbar loggedIn={loggedIn} changeloggedin ={changeloggedin}/>
    <Routes>
    <Route exact path="/problemSet/all"  element={<Home />}  />
    <Route path="/problem/:1" element={<Page/>} />
    <Route  path="/signup" element={<SignUp/>} />
    <Route exact path="/login" element={<Login/>} />
    <Route path="/problems/:1/submissions" element={<Submission />} />
    <Route exact path='/me' element={<Loginprotected><Me/></Loginprotected>} />
    <Route  exact path ='/blog' element={<Blog/>} />
    <Route exact path="/submissions" element={<Loginprotected><Allsubmission /></Loginprotected>} ></Route>
    <Route exact path='/pagenotfound' element={<Pagenotfound/>} />
    </Routes>
    </BrowserRouter> 
  )
  
}


export default App

