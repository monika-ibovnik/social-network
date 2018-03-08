import React from 'react';
export default function ShowProfile(props){
    return (
        <div id="profile-show">
            <p>Superpower: {props.superpower ? props.superpower : 'no superpower added yet'}</p>
            <p> Bio: {props.bio ? props.bio : 'no bio added yet'}</p>
        </div>
    );
}
