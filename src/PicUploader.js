import React from 'react';
import axios from './axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateProfilePic,
        hidePicUploader} from './actions/actions.js';

class PicUploader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            file : '',
            imagePrev : ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.uploadPic = this.uploadPic.bind(this);
    }
    handleChange(e){
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePrev: reader.result
            });
        }
        reader.readAsDataURL(file);
    }
    uploadPic(e){
        e.preventDefault();
        let formData = new FormData();
        formData.append('file', this.state.file);
        axios.post('/uploadPic', formData).then(result=>{
            this.props.updateProfilePic(result.data);
        })
    }
    render(){
        return(
            <div id="uploader">
                {this.state.file &&
                    <img src={this.state.imagePrev}/>
                }
                <form>
                    <input type="file" onChange={this.handleChange}/>
                    <button onClick={this.uploadPic}>Upload</button>
                </form>
                    <button onClick={this.props.hidePicUploader}>Cancel</button>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(
            {
                updateProfilePic,
                hidePicUploader
            },
            dispatch,
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(PicUploader);
