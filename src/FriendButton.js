import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getFriendshipStatus,
        updateFriendshipStatus,
        rejectFriendshipRequest} from './actions/actions.js';

const sentRequestToButtonMessageMap = {
    'none': 'Make a friend request',
    'pending': 'Cancel friend request',
    'accepted': 'Unfriend'
}
const receivedRequestToButtonMessageMap = {
    'none': 'Make a friend request',
    'pending': 'Accept friend request',
    'accepted': 'Unfriend'
}
class FriendButton extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getFriendshipStatus(this.props.recipient_id);
    }
    render(){
        let message=''
        if(this.props.friendshipId == -1){
            message = "Make a friend request";
        }else{
            if(this.props.sentRequestStatus){
                message = sentRequestToButtonMessageMap[this.props.sentRequestStatus];
            }else if(this.props.receivedRequestStatus){
                message = receivedRequestToButtonMessageMap[this.props.receivedRequestStatus];
            }
        }
        return(
            <div>
                <button onClick={()=>this.props.updateFriendshipStatus(this.props.recipient_id)}>{message}</button>
                {this.props.receivedRequestStatus == 'pending' &&
                <button onClick={()=>this.props.rejectFriendshipRequest(this.props.friendshipId)}>Reject friendship request</button>
                }
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        sender_id: state.user.id,
        recipient_id: state.otherProfile.id,
        sentRequestStatus: state.friendButton.sentRequestStatus,
        receivedRequestStatus: state.friendButton.receivedRequestStatus,
        friendshipId: state.friendButton.friendshipId
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(
            {
                getFriendshipStatus,
                updateFriendshipStatus,
                rejectFriendshipRequest
            },
            dispatch,
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(FriendButton);
