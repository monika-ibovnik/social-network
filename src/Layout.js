import React from 'react';
import ProfilePic from './ProfilePic';
import {SearchBar} from './SearchBar';
import {Link} from 'react-router-dom';
import './css/layout.css';

function Logo(props){
    if(location.pathname === '/welcome' || location.pathname==='/login'){
        return <Link to="/welcome"><h1>#boomcrashpow</h1></Link>;
    }else{
        return <Link to="/"><h1>#boomcrashpow</h1></Link>;
    }
}

function Menu(props){
    return(
        <nav>
            <Link to="/friends">Friends</Link><Link to="/profile">Profile</Link><a href="/logout">Logout</a>
        </nav>
    );
}

export function Layout(props){
    return(
        <div id="app">
            <header>
                <Logo />
                {props.supername &&
                    <ProfilePic imgUrl={props.imgUrl} className="small-profile-pic"/>
                }
                {props.supername &&
                    <SearchBar />
                }
                {props.supername &&
                    <Menu />
                }
            </header>
            <main>
                {props.children}
            </main>
            <footer>
                <p>&copy; Lolcat</p>
            </footer>
        </div>
    );
}
