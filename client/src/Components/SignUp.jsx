import React, { useState } from 'react'
import '../CSS/stylesignup.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { Toaster, toast } from 'react-hot-toast';


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
    const [email ,setEmail ] = useState();
    const [password ,setPassword] = useState();

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
    onSubmit: async values => {
        // console.log(values);
        values = Object.assign(values);
        console.log(values);
        let response = await signupUser({email: values.email,password: values.password});
        console.log(response);
        // toast.error("This didn't work.")
            if(response.status === 200)
            {
                toast.success("Signed Up Successfully!");
                 
                setTimeout(()=>{
                    navigate('/login')
                },100);
            }
            else if(response.status === 500)
            {
                toast.error("This didn't work.")
    
                    toast.error(response.message);
            }
            else{
                toast.loading('Signing up ...!');
            } 
        
      }});

   const signupUser = async ({email,password})=>{
    try{
        console.log(email,password);
        
         const response=  await fetch("http://localhost:3001/signup",{
            method : 'POST',
            headers: {
                "Content-Type": "application/json",
            },

            body : JSON.stringify({
                email,password
            })
        });

        
        const json= await response.json();
        
        if(response.status !=200)
        {
            const err = json.msg;
            throw err;
        }
        // setTimeout(()=>{
        //     navigate('/login');
        // },1000);

        return {status:200,message:'SuccessFull!!'}
        
        
    }
    catch(err)
    {
          return {status:500,message:err};
   }
}
   

  return (
    <>
   

    <div className='signup'>
    <Toaster
toastOptions={{
  className: '',
  style: {
    border: '1px solid #713200',
    padding: '16px',
    maxHeight:'10%',
    display:'flex',
    color:'red',
    flexDirection:"column",
  },
}}
/>
      
        <Formik >
        <Form className='form' onSubmit={formik.handleSubmit}>
        <div className ="detail"> 
        <label htmlFor="email">Email : </label>
        <div className='detail-input'>
        <Field
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
        <Field
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
        <Field
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
        <button   disabled={    Object.keys(formik.errors).length ===0 ?false:true} type='submit'> Create Account</button>
        <p>Already have a account? <Link to='/login'>Login</Link></p>
        </div>
        </Form>

        </Formik>
 
    </div>
    </>
   
  )
}

export default SignUp
