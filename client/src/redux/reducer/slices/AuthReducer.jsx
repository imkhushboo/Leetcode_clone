import {constant} from '../../constant';

const token = localStorage.getItem('token') ? localStorage.getItem('token'):null;

const initial_state={
    'email':'',
    'password':'',
    'status':'',
    'message':'',
    'token': token,
    'loading':false,
    'success':false,
    'loggedIn':false,
    'register':false
}



  export const AuthReducer = (state=initial_state,action)=>{
    console.log(action);
    console.log(state);
    switch(action.type){
      case(action.type === 'loading'):
        return {loading:true};
       case constant.SIGNUP_SUCCESSFUL:
        return {...state,...action.payload,loading:false,status:200,success:true,message:'Sucessfully Signed up!!',register:true}
    
       case constant.SIGNUP_FAILED:
        return {...state,...initial_state,loading:false,status:500,success:false,message:action.payload,register:false};
       case constant.LOGIN_SUCCESSFUL:
        return {...state,...action.payload,loggedIn:true,loading:false,status:200,success:true,message:'Login Successfully!',register:false}
       case constant.LOGIN_FAILED:
        return {...state,token:null,loggedIn:false,loading:false,status:500,success:false,message:'Login Failed!!',register:false}
      
       case constant.LOGOUT_SUCCESSFUL:
        return {...state,...initial_state,loggedIn:false,loading:false,token:null,status:200,success:true,message:'Logout successfully!',register:false}
      
       case constant.LOGIN_FAILED:
        return {...state,status:500,loggedIn:true,loading:false,success:false,message:"Logout failed!"}
      
       default:
        return state;

    }
   
  }