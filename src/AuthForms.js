import React from 'react';
import ReactDOM from 'react-dom';
import axios from './axios';
import {Link} from 'react-router-dom';

//useful functions to check user input

//components
function Error({error}){
    if(error){
        return(
            <p className="error">{error}</p>
        );
    }else{
        return(
            <p className="invisible">{error}</p>
        );
    }
}
export class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    handleSubmit(e){
        e.preventDefault();
        //check if the fields are ok
        if(this.state.email != '' && this.state.password !=''){
            axios.post('/login', {
                email: this.state.email,
                password: this.state.password
            }).then(response =>{
                console.log("response", response);
                location.replace('/');
            });
        }
    }
    render(){
        return(
        <div className="component">
            <div className="welcome-form">
                <h2>Log in</h2>
                <Error error={this.state.error}/>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="email" placeholder="E-mail" onChange={this.handleChange}/>
                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                    <button>Submit</button>
                </form>
                <p>You don't have an account?<br/> Please <Link to="/welcome">sign up!</Link></p>
            </div>
        </div>
        );
    }

}

export class RegistrationForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            supername: '',
            email: '',
            password: '',
            repeatPassword: '',
            error: null,
            fieldError: {
                'supername' : false,
                'email' : false,
                'password' : false,
                'repeatPassword': false
                }
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleBlur=this.handleBlur.bind(this);
    }
    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    handleSubmit(e){
        e.preventDefault();
        //check if the fields are empty
        let readyToSubmit = true;
        for(let key in this.state){
            if(this.state[key]==''){
                readyToSubmit = false;
                let fieldsObject = {supername: true, email: true, password: true, repeatPassword: true};
                this.setState({error : "Please fill all of the fields.",
                                fieldError : fieldsObject});
                break;
            }
        }
        if(readyToSubmit){
            console.log('ready',readyToSubmit)
            if(this.state.password != this.state.repeatPassword){
                let fieldsObject = {password: true, repeatPassword: true};
                fieldsObject = Object.assign({}, this.state.fieldError, fieldsObject);
                console.log(fieldsObject);
                this.setState({error: 'Passwords don\'t match',
                                fieldError: fieldsObject});
            }else{
                axios.post('/register', {
                    supername: this.state.supername,
                    email: this.state.email,
                    password: this.state.password
                }).then(res=>{
                    location.replace('/');
                }).catch(error=>{
                    console.log('error', error);
                });
            }
        }
    }
    handleBlur(e){
        let obj = {};
        if(e.target.value == ''){
            obj[e.target.name] = true;
        }else{
            obj[e.target.name] = false;
        }
        let stateObject = Object.assign({}, this.state.fieldError, obj);
        this.setState({fieldError : stateObject});
    }
    render(){
        return(
            <div className="component">
                <h2>Register</h2>
                <Error error={this.state.error}/>
                <div className="welcome-form">
                    <form onSubmit={this.handleSubmit}>
                        <input className={this.state.fieldError.supername ? "errorInput" : ""} type="text" name="supername" placeholder="Your hero name" value={this.state.supername} onChange={this.handleChange} onBlur={this.handleBlur}/><br/>
                        <input className={this.state.fieldError.email ? "errorInput" : ""} type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} onBlur={this.handleBlur}/><br/>
                        <input className={this.state.fieldError.password ? "errorInput" : ""} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} onBlur={this.handleBlur}/><br/>
                        <input className={this.state.fieldError.repeatPassword ? "errorInput" : ""} type="password" name="repeatPassword" placeholder="Repeat password" value={this.state.repeatPassword} onChange={this.handleChange} onBlur={this.handleBlur}/><br/>
                        <button className="button">Sign up</button>
                    </form>
                    <p>Already registered?<br/> Please <Link to="/login">sign in!</Link></p>
                </div>
            </div>
        );
    }
}
