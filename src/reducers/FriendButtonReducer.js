export default function(status={}, action){
    if(action.type=='GET_FRIENDSHIP_STATUS'){
        return Object.assign({}, status, action.payload);
    }
    if(action.type=='UPDATE_FRIENDSHIP_STATUS'){
        return Object.assign({}, status, action.payload);
    }
    if(action.type=='REJECT_FRIENDSHIP_REQUEST'){
        return Object.assign({}, status, action.payload);
    }
    return status;
}
