import React from 'react';
import {Link} from 'react-router-dom';
import axios from './axios';

import './css/searchbar.css';

class SearchResults extends React.Component{
    constructor(props){
        super(props);
    }
    handleClick(id){
        location.replace('/user/'+id);
    }
    render(){
        const list = this.props.results.map((value,index)=>{
            return <div className="result" key={index} onClick={()=>this.handleClick(value.id)}>{value.supername}</div>
        });
        return <div className="search-results"><div>{list}</div></div>
    }
}

export class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
                searchName: '',
                searchResults: [],
                resultsVisible: false,
                timeout: null,
                source: null
            };
        this.handleChange = this.handleChange.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        //this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleChange(e){
        let self = this;
        this.setState({[e.target.name]: e.target.value}, function(){
                clearTimeout(this.state.timeout);
                let makeRequestTimeout = setTimeout(function(){
                    self.sendRequest();
                }, 1000);
            }
        );
    }
    sendRequest(){
        if(this.state.searchName !== ''){
            axios.post('/searchForUser', {
                searchString: this.state.searchName
            }).then(response=>{
                if(response.data.length!=0){
                    this.setState({
                        searchResults: response.data,
                        resultsVisible: true
                    });
                }
            }).catch(err=>{
                console.log(err);
            });
        }
    }
    // handleBlur(){
    //     this.setState({
    //         resultsVisible: false
    //     })
    // }
    handleFocus(){
        if(this.state.searchResults.length != 0){
            this.setState({
                resultsVisible: true
            });
        }
    }
    handleClick(e){
        console.log(e.target);
    }
    handleSubmit(e){
        e.preventDefault();
    }
    render(){
        return(
            <div className="search-bar">
                <form onSubmit={this.handleSubmit}>
                    <input type="text"
                        name="searchName"
                        value={this.state.searchName}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        autoComplete="off"
                    />
                    <button>Search</button>
                </form>
                <div className="search-results-container">
                    {this.state.resultsVisible &&
                        <SearchResults results = {this.state.searchResults} onClick={this.handleClick}/>
                    }
                </div>
            </div>
        );
    }
}
