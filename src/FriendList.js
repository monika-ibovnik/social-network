import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getFriendsList} from './actions/actions.js';


class FriendList extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <h3>Friends</h3>
        );
    }
}

function mapStateToProps(state){
    return {};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(
            {},
            dispatch,
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
