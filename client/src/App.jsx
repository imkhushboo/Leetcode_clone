import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './Components/Home';
import Page from './Components/Page';
import SignUp from "./Components/SignUp";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Submission from "./Components/Submission";
import './App.css';
import Me from "./Components/Me";
import Loginprotected from "./middleware/Loginprotected";
import Blog from "./Components/Blog";
import Allsubmission from "./Components/Allsubmission";
import Pagenotfound from "./Components/Pagenotfound";
import { Toaster } from "react-hot-toast";



function App() {
  
  return(
    <BrowserRouter>
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
    </BrowserRouter> 

  
  )
  
}


export default App

