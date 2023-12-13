const initial_state = {
    title:"",
    description:"",
    time:""
}


export const RenderModalReducer =(state = initial_state ,action)=>{

    if(action.type === 'rendermodal')
    {
        return {...state,...action.payload,status:200,message:'Successfull render'};
    }
    return state;

}