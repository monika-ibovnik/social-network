import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getProfileInfo,
        editProfile,
        showPicUploader} from './actions/actions';
import axios from './axios';
import ProfilePic from './ProfilePic';
import ShowProfile from './ShowProfile'
import ProfileEditor from './ProfileEditor';
import PicUploader from './PicUploader';
import './css/profile.css';

class Profile extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getProfileInfo();
    }
    render(){
        return(
            <div id="profile">
                <h2>{this.props.supername}</h2>
                {this.props.supername &&
                    <ProfilePic className="profile-pic" imgUrl={this.props.imgUrl} onClick={this.props.showPicUploader}/>
                }
                {!this.props.showEditor &&
                    <div>
                        <ShowProfile bio={this.props.bio} superpower={this.props.superpower}/>
                        <button onClick={this.props.editProfile}>Edit profile</button>
                    </div>
                }
                {this.props.showEditor &&
                    <ProfileEditor bio={this.props.bio} superpower={this.props.superpower} />
                }
            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        supername: state.user.supername,
        imgUrl: state.user.imgUrl,
        profileId: state.profile.id,
        bio: state.profile.bio,
        superpower: state.profile.superpower,
        showEditor: state.profile.showEditor
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(
        {
            getProfileInfo,
            editProfile,
            showPicUploader
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
