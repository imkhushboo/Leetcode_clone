import React, { useEffect } from 'react';
import '../CSS/stylesignup.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { Toaster, toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { LogIn } from '../redux/actionCreator';





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
    const dispatch = useDispatch();
    const profile= useSelector(state=>state.AuthReducer);
    const navigate = useNavigate();

    useEffect(()=>{
        if(profile.token !==null || (profile.loggedIn === true && profile.success === true))
        {
            toast.success(profile.message);
            setTimeout(()=>{
                navigate('/problemSet/all');
            },1000);
        
        }
        else if(profile.loggedIn === false && profile.success === false)
        {
            toast.error(profile.message)
        }
        else if(profile.loading === true){
            toast.loading('Logging up ...!');
        } 
    },[profile.loggedIn])
  

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
             dispatch(LogIn({email: values.email,password: values.password}));

          

          
    // handle submission
        },
    });

   

    
  return (
      <div className='flex items-center h-[90vh] justify-center'>
        <Formik>
         <Form className='bg-gray h-3/5 w-[30%] bg-[#5c5b77] flex flex-col justify-around border-2 border-[#2f2e49] divide-solid rounded-xl' onSubmit={formik.handleSubmit}>
        <div  id="detail" className ="flex flex-col h-[30%] w-4/5 m-auto justify-between"> 
        <label className='w-full text-xl text-white'htmlFor="email">Email : </label>
        <div id= "detail-input" className="flex h-3/5">
        <Field className="h-full w-[90%] rounded-lg border-[#252553] border-2 "id="email" type="email" placeholder='Email Address'  onBlur={formik.handleBlur} value={formik.values.email}  onChange={formik.handleChange} />
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
        <div id="detail" className ="flex flex-col h-[30%] w-4/5 m-auto justify-between">
        <label className="w-full text-lg text-white"htmlFor="password" >Password : </label>
        <div id="detail-input" className=' flex h-3/5'>
        <Field className="h-full w-[90%] rounded-lg border-2 border-[#252553]" id="password" type="password" placeholder='Enter Password'  onBlur={formik.handleBlur} value={formik.values.password}  onChange={formik.handleChange} />
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
        <div className='flex justify-center h-1/5'>
        <button className='h-4/5 w-3/5 rounded-lg hover:bg-slate-500 bg-[#7c7ccf] text-white'type='submit'> Login </button>
        </div>
        </Form>
        </Formik>
      
    </div>
  )
}

export default Login
