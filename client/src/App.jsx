import { Route, Routes, BrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from "react";


const Home =  lazy(()=> import ('./Components/Home'));
const Page =  lazy(()=> import('./Components/Page'));
const SignUp =  lazy(()=> import ("./Components/SignUp"));
const Navbar =  lazy(()=>import("./Components/Navbar"))
const Login =  lazy(()=>import("./Components/Login")); 
const Submission=  lazy(()=>import("./Components/Submission"));
import './App.css';
const Me =  lazy(()=>import ("./Components/Me"));
const Loginprotected =  lazy(()=>import("./middleware/Loginprotected")); 
const  Blog =  lazy(()=>import("./Components/Blog")) 
const Allsubmission =  lazy(()=>import("./Components/Allsubmission")) 
const Pagenotfound =  lazy(()=>import("./Components/Pagenotfound")) 
import { Toaster }  from "react-hot-toast";





function App() {
  
  return(
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>

    <Toaster  autoClose={4000}/>

    <Navbar />
    <Routes>
    <Route path='/' element={<SignUp/>}></Route>
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
    </Suspense>
    </BrowserRouter> 

  
  )
  
}


export default App

