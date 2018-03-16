import React from 'react';
import axios from './axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getFriendsList} from './actions/actions.js';


class FriendList extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        return axios.get('/friends/get').then(result=>{
            console.log(result.data);
        });
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
