const token = localStorage.getItem('token') ? localStorage.getItem('token'):null;

const initial_state={
    'email':'',
    'password':'',
    'status':'',
    'message':'',
    'token': token,
    'loading':false,
    'success':false
}



  export const AuthReducer = (state=initial_state,action)=>{
    console.log(action);
    console.log(state);
    if(action.type === 'loading')
    {
      return {...state,loading:true};
    }
    else if(action.type === 'signupusersuccess')
    {
      return {...state,...action.payload,loading:false,status:200,success:true,message:'Sucessfully Signed up!!'}
    }
    else if(action.type === 'signupuserfail')
    {
        return {...state,...initial_state,loading:false,status:500,success:false,message:'Sigend upfailed!!'};
    }
    else if(action.type === 'loginsuccess')
    {
       return {...state,...action.payload,loggedIn:true,loading:false,status:200,success:true,message:'Login Successfully!'}
    }
    else if(action.type === 'loginfailed')
    {
        return {...state,token:null,loggedIn:false,loading:false,status:500,success:false,message:'Login Failed!!'}
    }
    else if(action.type === 'logoutsuccess')
    {
       return {...state,...initial_state,loading:false,token:null,status:200,success:true,message:'Logout successfully!'}
    }
    else if(action.type === 'logoutfailed')
    {
        return {...state,status:500,loading:false,success:false,message:"Logout failed!"}
    }
    return state;
  }