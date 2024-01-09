import React, { useContext, useEffect, useState } from 'react'
import '../CSS/stylesignup.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { Toaster, toast } from 'react-hot-toast';
import { signupUser } from '../redux/actionCreator';
import {  useDispatch, useSelector } from 'react-redux';






function passwordverify( password) {
    // console.log(password);
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var specialchar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var error = null ;
    // console.log(values);
    if (!password) {
        error = 'Password Required!!';
    }
    else if (password.includes(" ")) {
        error = 'Invalid Password!';
    }
    else if (!password.match(lowerCaseLetters)) {
        error = "must contain lower case letter";
    }

    // Validate capital letters
    else if (!password.match(upperCaseLetters)) {
        error = "must contain Upper case letter";
    }

    // Validate numbers
    else if (!password.match(numbers)) {
        // console.log(password.match(numbers));
        error = "must contain numbers";

    }

    // Validate length
    else if (password.length < 8) {
        error = "must greater than 8 characters ";

    }
    else if (!specialchar.test(password)) {
        error = "must contain special character!";
    }
    return error;


}



function SignUp() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profile = useSelector(state=>state.AuthReducer);
    useEffect(()=>{
        console.log(profile);
        if(profile.email==='' && profile.loggedIn === false && profile.status === 200 && profile.success === true)
        {
           navigate('/signup');
        }
        else if( profile.register && (profile.status === 200 && profile.success === true))
         {
             toast.success(profile.message);
              
             setTimeout(()=>{
                 navigate('/login')
             },100);
         }
         else if(profile.status === 500 && profile.success === false)
         {
                 toast.error(profile.message);
         }
         else if(profile.loading  === true){
             toast.loading('loading...',{autoClose:1000});
             toast.dismiss();
         } 
    },[profile]);
   
    const formik = useFormik({
        initialValues: {
            "email":"",
            "password":"",
            "confirmPassword":""
    },
    validationSchema: Yup.object().shape({
        email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
        password:Yup.string().required("Required").test(function(values,error)
        {
        //    console.log(passwordverify(values));
           const msg = passwordverify(values);
          
           if(msg === null)
           {
            return true;
           }
          return error.createError({message:msg});
        }),
        confirmPassword: Yup.string().required("Required").oneOf([Yup.ref('password'), null], 'Passwords must match')
    }),
    onSubmit: (values) => {
        console.log(values);
      
        values = Object.assign(values);
         dispatch(signupUser({email: values.email,password: values.password}));
          
      }});

    
  return (
    <>

    <div className='flex mx-auto items-center w-[30%] h-[90vh]'>
  
      
        <Formik >
        <Form className='flex flex-col justify-around w-full bg-[#5c5b77] h-4/5 border-2  border-[#2f2e49] text-white divide-solid text-lg rounded-xl' onSubmit={formik.handleSubmit}>
        <div className ="detail"> 
        <label  htmlFor="email">Email : </label>
        <div className='detail-input'>
        <Field className="text-black w-[90%]"
               id="email"
               type="email"
               name="email"
               placeholder="Enter email address"
               onChange={formik.handleChange}
               value={formik.values.email}
               onBlur={formik.handleBlur}
             /> 
        {
        (formik.touched.email) ? 
        <div className='error'> 
        {
            (formik.errors.email)?
                                   <i id="tooltip-error" className="fa-solid fa-circle-xmark"> <span className='tooltiptext-error'>{formik.errors.email}</span></i>:
                                   <i id="tooltip-correct"className="fa-solid fa-circle-check"></i>
                                   
        }
        </div>: 
        null
        
        }
        
        </div>
       

       
        </div>
        <div className ="detail">
        <label htmlFor="password" >Password : </label>
        <div className="detail-input">
        <Field className="text-black w-[90%]"
               id="password"
               type="password"
               name="password"
               placeholder="enter password"
               onChange={formik.handleChange}
               value={formik.values.password}
               onBlur={formik.handleBlur}
               
             />

        {formik.touched.password?
         <div className="error">
         { (formik.errors.password)?
          <i id="tooltip-error" className="fa-solid fa-circle-xmark"> <span className='tooltiptext-error'>{formik.errors.password}</span></i>:
          <i id="tooltip-correct"className="fa-solid fa-circle-check"></i>
          }

   </div>:
        null
       
        }
        

        </div>
        

        </div>
        <div className ="detail"> 
        <label htmlFor="confirmPassword" >Confirm Password :</label>
        <div className='detail-input'>
        <Field className="text-black h-1/5"
               id="confirmPassword"
               type="password"
               name="confirmPassword"
               placeholder="confirm password"
               onChange={formik.handleChange}
               value={formik.values.confirmPassword}
               onBlur={formik.handleBlur}
             />

        {formik.touched.confirmPassword?
         <div className="error">
         {formik.errors.confirmPassword?
         <i id="tooltip-error" className="fa-solid fa-circle-xmark"> <span className='tooltiptext-error'>{formik.errors.confirmPassword}</span></i>:
         <i id="tooltip-correct"className="fa-solid fa-circle-check"></i>}

          </div>:
           null
       
        }


        </div>
        
        </div>
        <div className='btn'>
        <button  id='signup_button' disabled={    Object.keys(formik.errors).length ===0 ?false:true} type='submit'> Create Account</button>
        <p>Already have a account? <Link to='/login'>Login</Link></p>
        </div>
        </Form>

        </Formik>
 
    </div>
    </>
   
  )
}

export default SignUp
