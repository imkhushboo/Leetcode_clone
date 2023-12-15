import {constant} from '../../constant';


const initial_state={
    problem:[],
    submission:[],
    success:false,
    message:"",
    state:null,
    Acceptance:null
}

export const RenderSelectedProblem =(state=initial_state,action)=>{
    console.log(action);
    console.log(state);
    switch (action.type){
        case constant.FETCH_SELECTED_PROBLEM_SUCCESSFUL:
            return  {...state,problem:action.payload,success:true,message:'fetched selected problem!',status:200}
        case constant.SUBMIT_PROBLEM_SUCCESSFUL:
            return {...state,message:'submitted',success:true,Acceptance:action.payload,status:200}
        case constant.SUBMIT_PROBLEM_FAILED:
            return {...state,message:action.payload,success:false,Acceptance:null,status:500}

        default:
            return state 
    }

}