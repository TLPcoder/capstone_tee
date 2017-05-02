'use strict';
import React, {Component} from 'react';
import NavLogin from './nav-login';
import Link from 'react-router';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginData: {
                username: '',
                password: ''
            }
        };
        this.fetchJWT = this.fetchJWT.bind(this);
        this.getDataFromUsername = this.getDataFromUsername.bind(this);
        this.getDataFromPassword = this.getDataFromPassword.bind(this);
        this.logout = this.logout.bind(this);
        this.readJWT = this.readJWT.bind(this);
    }
    fetchJWT() {
        fetch(`http://localhost:8080/login/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({username: this.state.loginData.username, password: this.state.loginData.password})
        }).then(function(res) {
            return res.json();
        }).then(function(resData) {
            sessionStorage.setItem("golfMember", resData.payload.id);
            window.location.hash = '/profile';
        }).catch(function(err) {
            console.log("error", err);
        });
        console.log('Your username or password my be incorrect');
        //alert('Your username or password my be incorrect');
    }
    getDataFromUsername(event) {
        this.setState({
            loginData: {
                username: event.target.value,
                password: this.state.loginData.password
            }
        });
    }
    getDataFromPassword(event) {
        this.setState({
            loginData: {
                username: this.state.loginData.username,
                password: event.target.value
            }
        });
    }
    logout() {
        sessionStorage.removeItem('golfMember');
    }
    readJWT(){
        var data = sessionStorage.getItem('golfMember');
        console.log(data);
        return data;
    }
    render() {
        return (
            <div>
            <div id = "profile-bakcground-image"></div>
            <div className = "login-page-container">
                <NavLogin/>
                <div className = 'login-container'>
                    <input className = "login" type="text" onChange={this.getDataFromUsername} placeholder= "username"/>
                    <input className = "login" type="password" onChange={this.getDataFromPassword}placeholder="password"/>
                    <br/>
                    <input className = 'loginSubmit' type="submit" value="Login" onClick={this.fetchJWT}/>
                    <br/>
                    <a className = "create-account-a" href="http://localhost:8080/#/createAccount">Create Account</a>
                </div>
            </div>
            </div>
        )
    }
}

export default Login
