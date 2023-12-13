
const profile={
    'email':'',
    'blogid':null,
    'blog':[],
    'submission':[],
    'problems':[],
    'status':'',
    'message':''


}



export const BlogReducer = (state = profile,action)=>{
    console.log(state);
    console.log(action);
   if(action.type === 'fetchblogsuccessful')
   {
    return {...state,'blog':action.payload,'status':200,'message':'Successfull fetched blog!'};
   }
   else if(action.type  === 'fetchblogfail')
   {
    return {...state,'status':500,'message':'fail'};
   }
   else if(action.type === 'addblogsuccessful')
   {
     return {...state,'status':200,'message':'blog added Sucseesfull'};
   }
   else if(action.tyep === 'addblogfail')
   {
    return {...state,'status':200,'message':'failed'}
   }

   else if(action.type === 'deleteblogsuccessful')
   {
     return {...state,'status':200,message:"Deleted blog sucessfully"}
   }
   else if(action.type ==='deleteblogfail')
   {
    return {...state,'status':500,message:"failed"}
   }
   else if(action.type === 'update profile')
   {  
     return {...state,...action.payload,'status':200,'message':'Sucessfully updated!'};
   }

   return state;

}






 

  