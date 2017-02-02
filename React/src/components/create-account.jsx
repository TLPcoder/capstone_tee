'use strict';
import React, {Component} from 'react';
import Alert from 'react-s-alert';
import NavLogin from './nav-login';

// import 'react-s-alert/dist/s-alert-default.css';

class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginData: {
                firstName: '',
                lastName: '',
                userName: '',
                email: '',
                password: '',
                zip: null
            }
        };
        this.fetchJWT = this.fetchJWT.bind(this);
        this.getDataFromUsername = this.getDataFromUsername.bind(this);
        this.getDataFromPassword = this.getDataFromPassword.bind(this);
        this.logout = this.logout.bind(this);
        this.readJWT = this.readJWT.bind(this);
        this.getFirstName = this.getFirstName.bind(this);
        this.getLastName = this.getLastName.bind(this);
        this.getEmail = this.getEmail.bind(this);
        this.getZip = this.getZip.bind(this);
    }
    fetchJWT() {
        console.log(this.state);
        fetch(`http://localhost:3000/login/createAccount`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                first_name: this.state.loginData.firstName,
                last_name: this.state.loginData.lastName,
                username: this.state.loginData.userName,
                email: this.state.loginData.email,
                zip: this.state.loginData.zip,
                password: this.state.loginData.password
            })
        }).then((res) => {
            return res.json();
        }).then((resData) => {
            console.log("resData.usernameAvailable", resData.usernameNotAvailable);
            if (resData.usernameNotAvailable) {
                alert('The username you have entered is taken');
                // Alert.error('The username you have entered is taken');
            } else {
                console.log("data", resData);
                sessionStorage.setItem("golfMember", resData.payload.id);
                console.log("set JWT");
                window.location.hash = '/profile';
            }
        }).catch(function(res) {
            console.log(res);
        });
    }
    getFirstName(event) {
        console.log("first", event.target.value);
        this.setState({
            loginData: {
                firstName: event.target.value,
                lastName: this.state.loginData.lastName,
                userName: this.state.loginData.userName,
                email: this.state.loginData.email,
                zip: this.state.loginData.zip,
                password: this.state.loginData.password
            }
        });
    }
    getLastName(event) {
        console.log("last", event.target.value);
        this.setState({
            loginData: {
                firstName: this.state.loginData.firstName,
                lastName: event.target.value,
                userName: this.state.loginData.userName,
                email: this.state.loginData.email,
                zip: this.state.loginData.zip,
                password: this.state.loginData.password
            }
        });
    }
    getDataFromUsername(event) {
        console.log("username", event.target.value);
        this.setState({
            loginData: {
                firstName: this.state.loginData.firstName,
                lastName: this.state.loginData.lastName,
                userName: event.target.value,
                email: this.state.loginData.email,
                zip: this.state.loginData.zip,
                password: this.state.loginData.password
            }
        });
    }
    getEmail(event) {
        console.log("email", event.target.value);
        this.setState({
            loginData: {
                firstName: this.state.loginData.firstName,
                lastName: this.state.loginData.lastName,
                userName: this.state.loginData.userName,
                email: event.target.value,
                zip: this.state.loginData.zip,
                password: this.state.loginData.password
            }
        });
    }
    getDataFromPassword(event) {
        console.log("pass", event.target.value);
        this.setState({
            loginData: {
                firstName: this.state.loginData.firstName,
                lastName: this.state.loginData.lastName,
                userName: this.state.loginData.userName,
                email: this.state.loginData.email,
                zip: this.state.loginData.zip,
                password: event.target.value
            }
        });
    }
    getZip(event) {
        console.log("zip", event.target.value);
        this.setState({
            loginData: {
                firstName: this.state.loginData.firstName,
                lastName: this.state.loginData.lastName,
                userName: this.state.loginData.userName,
                email: this.state.loginData.email,
                password: this.state.loginData.password,
                zip: event.target.value
            }
        });
    }
    logout() {
        sessionStorage.removeItem('golfMember');
    }
    readJWT() {
        var data = sessionStorage.getItem('golfMember');
        console.log(data);
        return data;
    }
    render() {
        return (
            <div className="create-account-page-container">
                <NavLogin/>
                <div className='create-account-container'>
                    <input className="login" type="text" placeholder="first name" onChange={this.getFirstName}/>
                    <input className="login" type="text" placeholder="last name" onChange={this.getLastName}/>
                    <input className="login" type="text" placeholder="email" onChange={this.getEmail}/>
                    <input className="login" type="text" onChange={this.getDataFromUsername} placeholder="username"/>
                    <input placeholder="password" className="login" type="password" onChange={this.getDataFromPassword}/>
                    <input placeholder="zip" className="login" type="text" onChange={this.getZip}/>
                    <input className='loginSubmit' type="submit" value="Login" onClick={this.fetchJWT}/>
                </div>
            </div>
        )
    }
}

export default CreateAccount;
