import React from 'react';
import './css/splash-image.css';
export default function SplashImage(props){
    return(
        <div className="welcome-forms">
            <div id="splash">
                <img src="/img/lalitphat-phunchuang-396169-min.jpg"/>
            </div>
            <div id="overlay"></div>
            <p id="across">Enter the telephone booth</p>
            <div>
                {props.children}
            </div>
        </div>
    );
}
