import axios from '../axios';

export function getUserInfo(){
    return axios.get('/currentuser').then(response=>{
        return({
            type: 'GET_USER_INFO',
            payload: response.data
        });
    });
}

export function getProfileInfo(){
    return axios.get('/bio').then(response=>{
        return({
            type: 'GET_PROFILE_INFO',
            payload: response.data
        });
    });
}
export function editProfile(){
    return({
        type: 'EDIT_PROFILE',
        payload: {
            showEditor: true
        }
    });
}
export function hideProfileEditor(){
    return({
        type: 'HIDE_PROFILE_EDITOR',
        payload: {
            showEditor: false
        }
    });
}
export function saveProfileInfo(bio,superpower){
    return axios.post('/bio', {
        bio: bio,
        superpower: superpower
    }).then(response=>{
        return({
            type: 'SAVE_PROFILE_INFO',
            payload: response.data
        });
    });
}

export function getOtherProfileInfo(id){
    return axios.get('/getOtherProfileInfo/'+id).then(response => {
        if(response.data.noUserFound){
            return({
                type: 'ERROR_NO_USER_FOUND',
                payload: response.data
            });
        }else if(!response.data.redirect){
            return({
                type: 'GET_OTHER_PROFILE_INFO',
                payload: response.data
            });
        }else{
            return {
                type: 'ERROR_THIS_IS_YOUR_PROFILE',
                payload: response.data
            };
        }
    });
}
export function showPicUploader(){
    return({
        type: 'SHOW_PIC_UPLOADER',
        payload: {
            showPicUploader: true
        }
    });
}
export function hidePicUploader(){
    return({
        type: 'HIDE_PIC_UPLOADER',
        payload: {
            showPicUploader: false
        }
    });
}
export function updateProfilePic(url){
    return({
        type: 'UPDATE_PROFILE_PIC',
        payload: {
            imgUrl: url,
            showPicUploader: false
        }
    });
}
export function logOut(){
    return axios.get('/logout').then(response=>{
        return({
            type: 'LOG_OUT',
            payload: response.data
        });
    });
}

export function getFriendshipStatus(recipient_id){
    return axios.get('/friendstatus/get/'+recipient_id).then(response=>{
        return({
            type: 'GET_FRIENDSHIP_STATUS',
            payload: response.data
        });
    });
}

export function updateFriendshipStatus(recipient_id){
    return axios.get('/friendstatus/update/'+recipient_id).then(response=>{
        return({
            type: 'UPDATE_FRIENDSHIP_STATUS',
            payload: response.data
        });
    });
}

export function rejectFriendshipRequest(friendshipId){
    return axios.get('/friendstatus/reject/'+friendshipId).then(response=>{
        return({
            type: 'REJECT_FRIENDSHIP_REQUEST',
            payload: response.data
        });
    });
}
