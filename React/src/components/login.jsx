'use strict';
import React, {Component} from 'react';

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
        console.log(this.state);
        fetch(`http://localhost:3000/login/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({username: this.state.loginData.username, password: this.state.loginData.password})
        }).then(function(res) {
            return res.json();
        }).then(function(resData) {
            console.log("data", resData);
            sessionStorage.setItem("golfMember", resData.payload.id);
            console.log("set JWT");
        }).catch(function(res) {
            console.log(res);
        });
    }
    getDataFromUsername(event) {
        console.log("username", event.target.value);
        this.setState({
            loginData: {
                username: event.target.value,
                password: this.state.loginData.password
            }
        });
    }
    getDataFromPassword(event) {
        console.log("password", event.target.value);
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
                <input className = "login" type="text" onChange={this.getDataFromUsername} placeholder= "username"/>
                <input className = "login" type="password" onChange={this.getDataFromPassword}placeholder="password"/>
                <input className = 'loginSubmit' type="submit" value="Login" onClick={this.fetchJWT}/>
                <a className = "create-account-a" href="">Create Account</a>
            </div>
        )
    }
}

export default Login
