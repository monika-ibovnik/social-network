import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUserInfo,
        showPicUploader} from './actions/actions.js';
import {BrowserRouter, Route} from 'react-router-dom';
import PicUploader from './PicUploader';
import Profile from './Profile';
import OtherProfile from './OtherProfile';
import FriendList from './FriendList';
import {Layout} from './Layout'
import {LoggedInPage} from './LoggedInPage';

class App extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getUserInfo();
    }
    render(){
        return(
            <BrowserRouter>
                <Layout  supername={this.props.supername} imgUrl={this.props.imgUrl}>
                    <Route exact path="/" component={LoggedInPage} />
                    <Route path="/friends" component={FriendList} />
                    <Route path="/profile" component={Profile}/>
                    <Route path="/user/:id" component={OtherProfile}/>
                    {this.props.showPicUploader &&
                        <PicUploader />
                    }
                </Layout>
            </BrowserRouter>
        );
    }
}
function mapStateToProps(state){
    return{
        supername: state.user.supername,
        id: state.user.id,
        email: state.user.email,
        imgUrl: state.user.imgUrl,
        showPicUploader: state.user.showPicUploader
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(
            {
                getUserInfo,
            },
            dispatch,
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
