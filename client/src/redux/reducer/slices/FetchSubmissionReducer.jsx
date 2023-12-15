import {constant} from '../../constant';




export const FetchSubmissionReducer=(state=[],action)=> {
    console.log(state,action);
    switch(action.type){
        case constant.FETCH_SUBMISSION_SUCCESSFUL:
            return [...action.payload];
        default:
            return []
    }
}



