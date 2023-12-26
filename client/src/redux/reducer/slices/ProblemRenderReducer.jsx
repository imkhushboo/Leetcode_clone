import {constant} from '../../constant';

const initial_state ={
    problem:[],
    status:null,
    message:'',
    success:false,
}

export const ProblemRenderReducer = (state=initial_state,{type,payload}) => {
    console.log(state);
    console.log(type,payload);

    switch (type){
        case constant.FETCH_PROBLEM_SUCCESSFUL:
            return {problem:payload,success:true,status:200,message:"fetched successfully"};
        case constant.FETCH_PROBLEM_FAILED:
            return {problem:[],success:false,status:500,message:"fetched failed!"} 
        default :
            return state
    }


}



   