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
                zip: null,
                image: ''
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
        this.getImageUrl = this.getImageUrl.bind(this);
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
                password: this.state.loginData.password,
                image: this.state.loginData.image
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
                firstName: event.target.value
            }
        });
    }
    getLastName(event) {
        console.log("last", event.target.value);
        this.setState({
            loginData: {
                lastName: event.target.value
            }
        });
    }
    getDataFromUsername(event) {
        console.log("username", event.target.value);
        this.setState({
            loginData: {
                userName: event.target.value
            }
        });
    }
    getEmail(event) {
        console.log("email", event.target.value);
        this.setState({
            loginData: {
                email: event.target.value
            }
        });
    }
    getDataFromPassword(event) {
        console.log("pass", event.target.value);
        this.setState({
            loginData: {
                password: event.target.value
            }
        });
    }
    getZip(event) {
        console.log("zip", event.target.value);
        this.setState({
            loginData: {
                zip: event.target.value
            }
        });
    }
    getImageUrl(event) {
        this.setState({
            loginData: {
                image: event.target.value,
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
            <div>
                <div id="profile-bakcground-image"></div>
                <div className="create-account-page-container">
                    <NavLogin/>
                    <div className='create-account-container'>
                        <input className="login" type="text" placeholder="first name" onChange={this.getFirstName}/>
                        <input className="login" type="text" placeholder="last name" onChange={this.getLastName}/>
                        <input className="login" type="text" placeholder="email" onChange={this.getEmail}/>
                        <input className="login" type="text" onChange={this.getDataFromUsername} placeholder="username"/>
                        <input placeholder="password" className="login" type="password" onChange={this.getDataFromPassword}/>
                        <input placeholder="zip" className="login" type="text" onChange={this.getZip}/>
                        <input className="login" type="text" placeholder="imageUrl" onChange ={this.getImageUrl}/>
                        <br/>
                        <input className='loginSubmit' type="submit" value="Login" onClick={this.fetchJWT}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateAccount;
