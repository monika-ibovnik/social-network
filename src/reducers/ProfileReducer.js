export default function(state={}, action){
    if(action.type=='GET_PROFILE_INFO'){
        return Object.assign({}, state, action.payload);
    }
    if(action.type=='SAVE_PROFILE_INFO'){
        return Object.assign({}, state, action.payload);
    }
    if(action.type=='EDIT_PROFILE'){
        return Object.assign({}, state, action.payload);
    }
    if(action.type=='HIDE_PROFILE_EDITOR'){
        return Object.assign({}, state, action.payload);
    }
    return state;
}
