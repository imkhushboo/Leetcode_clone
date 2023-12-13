const token = localStorage.getItem('token') ? localStorage.getItem('token'):null;

const initial_state={
    'email':'',
    'password':'',
    'status':'',
    'message':'',
    'token': token
}



  export const AuthReducer = (state=initial_state,action)=>{
    console.log(action);
    console.log(state);
    if(action.type === 'signupusersuccess')
    {
      return {...state,...action.payload,status:200,sucess:true,message:'Sucessfully Signed up!!'}
    }
    else if(action.type === 'signupuserfail')
    {
        return {...state,...initial_state,status:500,success:false,message:'Sigend upfailed!!'};
    }
    else if(action.type === 'loginsuccess')
    {
       return {...state,...action.payload,status:200,success:true,message:'Login Successfully!'}
    }
    else if(action.type === 'loginfailed')
    {
        return {...state,status:500,success:false,message:'Login Failed!!'}
    }
    else if(action.type === 'logoutsuccess')
    {
       return {...state,...initial_state,statue:200,success:true,message:'Logout successfully!'}
    }
    else if(action.type === 'logoutfailed')
    {
        return {...state,status:500,success:false,message:"Logout failed!"}
    }
    return state;
  }