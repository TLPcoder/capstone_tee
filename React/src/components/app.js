'use strict';
import React, {Component} from 'react';
import Login from './login';
import NavLogin from './nav-login';
import CreateAccount from './create-account';

export default class App extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className = "create-account-page-container">
                <NavLogin/>
                <div className = 'create-account-container'>
                    <CreateAccount/>
                </div>
            </div>
        );
    }
}

// <div className = "login-page-container">
//     <NavLogin/>
//     <div className = 'login-container'>
//         <Login></Login>
//     </div>
// </div>
