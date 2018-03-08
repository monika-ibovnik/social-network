export default function(state = {}, action){
    if(action.type=="GET_USER_INFO"){
        return Object.assign({}, state, action.payload);
    }
    if(action.type=="UPDATE_PROFILE_PIC"){
        return Object.assign({}, state, action.payload);
    }
    if(action.type=="SHOW_PIC_UPLOADER"){
        return Object.assign({}, state, action.payload);
    }
    if(action.type=="HIDE_PIC_UPLOADER"){
        return Object.assign({}, state, action.payload);
    }
    return state;
}
