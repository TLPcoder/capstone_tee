'use strict';
import React, {Component} from 'react';
import Login from './login';
import CreateAccount from './create-account';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';

export default class App extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
