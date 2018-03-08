import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logOut} from './actions/actions.js';

class Menu extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <nav>
                <Link to="/friends">Friends</Link><Link to="/profile">Profile</Link><Link to="" onClick={this.state.logout}>Logout</Link>
            </nav>
        );
    }
}

function mapStateToProps(state){
    return {};
};

function mapDispatchToProps(state){
    return bindActionCreators({
        logOut
        },
    dispatch
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
