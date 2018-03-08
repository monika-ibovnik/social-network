import React from 'react';
import axios from './axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveProfileInfo,
        hideProfileEditor} from './actions/actions';

class ProfileEditor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bio: '',
            superpower: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        let superpowerValue = this.superpowerInput.value;
        let bioValue = this.bioInput.value;
        this.props.saveProfileInfo(bioValue, superpowerValue);
    }
    render(){
        return(
            <div id="profile-editor">
            Edit your bio:
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="superpower"
                       onChange={this.handleChange}
                       defaultValue={this.props.superpower}
                       ref={(input)=>{
                           this.superpowerInput = input;
                       }}/><br/>
                <textarea name="bio"
                          onChange={this.handleChange}
                          defaultValue={this.props.bio}
                          ref={(textarea)=>{
                              this.bioInput = textarea;
                          }}>
                </textarea><br/>
                <button>Save bio</button><br/>
            </form>
            <button onClick={this.props.hideProfileEditor}>Cancel</button>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        bio: state.profile.bio,
        superpower: state.profile.superpower
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(
        {
            saveProfileInfo,
            hideProfileEditor
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditor);
