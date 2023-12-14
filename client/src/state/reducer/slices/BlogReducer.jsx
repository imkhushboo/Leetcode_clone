
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
    switch(action.type)
    {
      case 'fetchblogsuccessful':
        return {...state,'blog':action.payload,'status':200,'message':'Successfull fetched blog!'};
      case 'fetchblogfail':
        return {...state,'status':500,'message':'fail'};
      case  'addblogsuccessful':
        return {...state,'status':200,'message':'blog added Sucseesfull'};
        case  'addblogfail':
        return {...state,'status':500,'message':'failed'}
    case  'deleteblogsuccessful':
     return {...state,'status':200,message:"Deleted blog sucessfully"}
   
   case 'deleteblogfail':
   
    return {...state,'status':500,message:"failed"}
   
   case  'update profile':
     
     return {...state,...action.payload,'status':200,'message':'Sucessfully updated!'};

   default : return state;


    }
 

}






 

  