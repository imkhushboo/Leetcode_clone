import React, { useState ,useEffect, useContext} from 'react';
import '../CSS/stylesignup.css';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { Toaster, toast } from 'react-hot-toast';
import HelperContext from '../context/helperContext';


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



function Login() {
    const {profile,LogIn} = useContext(HelperContext)
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: profile.email,
            password: profile.password,
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
            })
        }),
        onSubmit:async(values) => {
            values = Object.assign(values);
            let response = await LogIn({email: values.email,password: values.password});
            if(response.status === 200)
            {
                toast.success("Login  Successfully!");
                setTimeout(()=>{
                    navigate('/problemSet/all');
                },1000);
               
            }
            else if(response.status === 500)
            {
                toast.error("This didn't work.")
    
                    toast.error(response.message);
            }
            else{
                toast.loading('Signing up ...!');
            }  
    // handle submission
        },
    });

    useEffect(()=>{
        if(profile.token !==null)
        {
            
            navigate('/problemSet/all');
        }
    },[])

    
  return (
      <div className='login'>
        <Toaster toastOptions={{
       className: 'toaster'}}
      position="top-center"
      reverseOrder={false}
     />
        <Formik>
         <Form className='form' onSubmit={formik.handleSubmit}>
        <div className ="detail"> 
        <label htmlFor="email">Email : </label>
        <div className="detail-input">
        <Field id="email" type="email" placeholder='Email Address'  onBlur={formik.handleBlur} value={formik.values.email}  onChange={formik.handleChange} />
        {formik.touched.email?
        <div className="error">
                    {formik.errors.email ? 
                     <i id="tooltip-error" className="fa-solid fa-circle-xmark"> <span className='tooltiptext-error'>{formik.errors.email}</span></i>:
                     <i id="tooltip-correct"className="fa-solid fa-circle-check"></i>}

        </div>:
        null
         
        }

        </div>
       
        </div>
        <div className ="detail">
        <label htmlFor="password" >Password : </label>
        <div className="detail-input">
        <Field id="password" type="password" placeholder='Enter Password'  onBlur={formik.handleBlur} value={formik.values.password}  onChange={formik.handleChange} />
        {formik.touched.password?
        <div className="error">
                    {formik.errors.password ? 
                     <i id="tooltip-error" className="fa-solid fa-circle-xmark"> <span className='tooltiptext-error'>{formik.errors.password}</span></i>:
                     <i id="tooltip-correct"className="fa-solid fa-circle-check"></i>}

        </div>:
        null
         
        }

        </div>
        </div>
        <div className='btn'>
        <button type='submit'> Login </button>
        </div>
        </Form>
        </Formik>
      
    </div>
  )
}

export default Login
