import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getOtherProfileInfo} from './actions/actions';
import {Link} from 'react-router-dom';
import axios from './axios';
import ProfilePic from './ProfilePic';
import ShowProfile from './ShowProfile';
import FriendButton from './FriendButton';
import NoPageFound404 from './NoPageFound404'
import './css/profile.css';


class OtherProfile extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getOtherProfileInfo(this.props.match.params.id);
    }
    componentWillReceiveProps(nextProps){
        if(this.props.redirect){
            location.replace('/profile');
        }else{
            this.props.getOtherProfileInfo(nextProps.match.params.id);
        }
    }
    render(){
        return(
            <div>
                {!this.props.noUserFound && this.props.userSupername &&
                    <div id="profile">
                        <h2>{this.props.userSupername}</h2>
                        <ProfilePic className="profile-pic" imgUrl={this.props.userImgUrl}/>
                        <ShowProfile bio={this.props.userBio} superpower={this.props.userSuperpower}/>
                        <FriendButton/>
                    </div>
                }
                {this.props.noUserFound &&
                    <NoPageFound404 />
                }
            </div>
        );


    }
}

function mapStateToProps(state){
    return{
        userSupername: state.otherProfile.supername,
        userImgUrl: state.otherProfile.imgUrl,
        userBio: state.otherProfile.bio,
        userSuperpower: state.otherProfile.superpower,
        redirect: state.otherProfile.redirect,
        noUserFound: state.otherProfile.noUserFound
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getOtherProfileInfo
        },
        dispatch,
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile);
