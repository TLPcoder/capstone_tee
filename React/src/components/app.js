'use strict';
import React, {Component} from 'react';
import Login from './login';
import NavLogin from './nav-login'

export default class App extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className = "login-page-container">
                <NavLogin/>
                <div className = 'login-container'>
                    <Login></Login>
                </div>
            </div>
        );
    }
}
