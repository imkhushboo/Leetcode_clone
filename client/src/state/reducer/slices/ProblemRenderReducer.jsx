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

        case 'fetchproblemsuccessful':
            return {...state,problem:payload,success:true,status:200,message:"fetched successfully"};
        case 'fetchproblemfail':
            return {success:false,status:500,message:"fetched failed!"}
        case 'fetchselectedproblemsuccessful':
            return {problem:payload,sucess:true,status:200,message:'Fetched !!'}
        case 'fetchedselectedproblemfail':
            return {problem:[],sucess:false,status:500,message:'Failed!'}


        default:
            return state

    }


}



   