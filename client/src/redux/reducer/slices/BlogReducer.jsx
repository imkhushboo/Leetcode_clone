import {constant} from '../../constant';


const profile={
    'blogid':null,
    'blog':[],
    'status':'',
    'message':''
}



export const BlogReducer = (state = profile,action)=>{
    console.log(state);
    console.log(action);
    switch(action.type)
    {
      case constant.FETCH_BLOG_SUCCESSFUL:
        return {...state,'blog':action.payload,'status':200,'message':'Successfull fetched blog!'};
      case constant.FETCH_BLOG_FAILED:
        return {...state,'status':500,'message':'fail'};
      case  constant.ADD_BLOG_SUCCESSFUL:
        return {...state,'status':200,'message':'blog added Sucseesfull'};
      case  constant.ADD_BLOG_FAILED:
        return {...state,'status':500,'message':'failed'}
      case  constant.DELETE_BLOG_SUCCESSFUL:
        return {...state,'status':200,message:"Deleted blog sucessfully"}
      case constant.DELETE_BLOG_FAILED:
        return {...state,'status':500,message:"failed"}
      default :
        return profile;
    }
 

}






 

  