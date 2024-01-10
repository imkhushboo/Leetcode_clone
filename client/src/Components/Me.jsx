import React, { useEffect, useState } from 'react';
import '../CSS/stylemepage.css';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Toaster, toast } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { updateProfile } from '../redux/actionCreator';


function Me() {
  const profile = useSelector(state =>state.AuthReducer);
  const navigate = useNavigate();
  const imagename = profile.image ? profile.image :'avatar.png';
  const [profileimage,setProfileimage] = useState(`../client/public/static/images/${imagename}`);
  const [selectedfile,setSelectedFile]= useState(null);
  const dispatch = useDispatch();

  useEffect(()=>{
    // console.log(profileimage);
     if(profile.token === null)
     {
       navigate('/login');
     }
  },[profile.token])
  const onUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    // Update image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileimage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfileimage(profile.image);
    }
  };

  const formik = useFormik({
    initialValues: {
      email:profile.email,
      name:profile.name,
      location:profile.location,
      birthday:profile.birthday.split('T')[0],
      gender:profile.gender,
      image:profile.image 
    },
    onSubmit:async(values) => {
        values = Object.assign(values);
        const formData = new FormData();
        if(selectedfile !== null)
        formData.append('image', selectedfile);
        formData.append('name', values.name);
        formData.append('gender', values.gender);
        formData.append('location', values.location);
        if(values.birthday)
        formData.append('birthday', values.birthday);
        console.log(formData);
        dispatch(updateProfile(formData));
      
// handle submission
    },
});

     

  return (
    <div className='flex flex-col items-center mt-7'>
      <h1 className='text-white text-3xl'>Personal Details :</h1>
        <Formik>
         <Form className='bg-gray w-4/5 h-[70vh] bg-[#5c5b77] flex flex-col justify-around border-2 border-[#2f2e49] divide-solid rounded-xl' onSubmit={formik.handleSubmit}>
         <div className="flex justify-center py-4 h-[45%]">
          <label className='bg-white border-white border-2 rounded-full h-[100px] w-[100px]' htmlFor="profile">
              <img className='h-full w-full' src={profileimage} alt="avatar" />
          </label>
          <input  onChange={onUpload} className='hidden'type="file" id='profile' name='profile' />
         </div>
        < hr />
        <div className='flex h-2/5'>
        <div  id="detail" className ="flex flex-col h-[50%] w-2/5 m-auto "> 
        <label className='w-full text-xl text-white 'htmlFor="name">Name : </label>
        <div id= "detail-input" className="flex h-3/5">
        <Field className="h-full w-[90%] text-black rounded-lg border-[#252553] border-2 appearance-none"id="name" type="text" placeholder='Enter Name'  onBlur={formik.handleBlur} value={formik.values.name}  onChange={formik.handleChange} />
        </div>
        
       
        </div>
        <div  id="detail" className ="flex flex-col h-[50%] w-2/5 m-auto justify-between"> 
        <label className='w-full text-xl text-white' htmlFor="email">Email :</label>
        <div id= "detail-input" className="flex h-3/5">
        <Field className="h-full w-[90%] text-black rounded-lg border-[#252553] border-2 "id="email" type="email" placeholder='email'  onBlur={formik.handleBlur} value={formik.values.email}  />

        </div>
        
       
        </div>
        </div>
        <hr />
        <div className='flex h-2/5'>
              <div id="detail" className ="flex h-[50%]  w-2/5 m-auto ">
              <label className="text-lg text-white "htmlFor="gender" >Gender : </label>
              <div id="detail-input" className=' flex h-3/5'>
              <select name='gender' id='gender' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.gender}>
                  <option values='Female'>Female</option>
                  <option values='Male'>Male</option>
                  <option values='Others'>Others</option>
                </select>
             </div>
             </div>
              <div id="detail" className ="flex flex-col h-[50%] w-2/5  m-auto justify-between">
              <label className="w-full text-lg text-white"htmlFor="location" >location:</label>
              <div id="detail-input" className=' flex h-3/5'>
              <Field className="h-full w-[90%] text-black rounded-lg border-2 border-[#252553]" id="location" type="text" placeholder='Enter location'  onBlur={formik.handleBlur} value={formik.values.location} onChange={formik.handleChange}/>
              </div>
              </div>



        </div>
        <hr />
        <div className='flex h-2/5'>
              <div id="detail" className ="flex flex-col h-[50%] w-2/5 m-auto justify-between">
              <label className="w-full text-lg text-white"htmlFor="Birthday" >Birthday: </label>
              <div id="detail-input" className=' flex h-3/5'>
              <Field className="h-full w-[90%] text-black rounded-lg border-2 border-[#252553]" id="birthday" type="date" placeholder='Enter Birthday' max='2020-01-08' onBlur={formik.handleBlur} value={formik.values.birthday} onChange={formik.handleChange}  />
              </div>
              </div>
              {/* <div id="detail" className ="flex flex-col h-[50%] w-4/5 m-auto justify-between">
              <label className="w-full text-lg "htmlFor="password" >Password : </label>
              <div id="detail-input" className=' flex h-3/5'>
              <Field className="h-full w-[90%] text-black rounded-lg border-2 border-[#252553]" id="password" type="password" placeholder='Enter Password'  onBlur={formik.handleBlur} value={formik.values.password}   />
              {formik.touched.password?
              <div className="error">
                          {formik.errors.password ? 
                          <i id="tooltip-error" className="fa-solid fa-circle-xmark"> <span className='tooltiptext-error'>{formik.errors.password}</span></i>:
                          <i id="tooltip-correct"className="fa-solid fa-circle-check"></i>}

              </div>:
              null
              
              }

              </div>
              </div> */}



        </div>
        <hr />
     
        <div className='flex justify-center h-1/5'>
        <button className='h-4/5 w-3/5 rounded-lg hover:bg-slate-500 bg-[#7c7ccf] text-white'type='submit'> Save </button>
        </div>
        </Form>
        </Formik>
      

    </div>
  )
}

export default Me
