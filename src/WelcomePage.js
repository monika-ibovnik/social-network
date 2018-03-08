import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {RegistrationForm, LoginForm} from './AuthForms';
import {Layout} from './Layout';
import SplashImage from './SplashImage';

export function WelcomePage(props){
    return(
        <BrowserRouter>
        <Layout>
            <SplashImage>
                    <Route path="/welcome" component={RegistrationForm} />
                    <Route path="/login" component={LoginForm} />
            </SplashImage>
        </Layout>
        </BrowserRouter>
    );
}
