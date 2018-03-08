export default function(state = {}, action){
    if(action.type=='GET_OTHER_PROFILE_INFO'){
        return Object.assign({}, state, action.payload);
    }
    if(action.type=='ERROR_THIS_IS_YOUR_PROFILE'){
        return Object.assign({}, state, action.payload);
    }
    if(action.type=='ERROR_NO_USER_FOUND'){
        return Object.assign({}, state, action.payload);
    }
    return state;
}
