import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

export default function ProfilePic(props){
    return (
        <div className={props.className}>
            <img alt={props.supername} src={props.imgUrl ? props.imgUrl : '/img/icons/profile-pic-default.svg'} onClick={props.onClick}/>
        </div>
    );
}
