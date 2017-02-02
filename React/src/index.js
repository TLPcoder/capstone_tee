'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import CreateAccount from './components/create-account';
import Login from './components/login';
import Home from './components/home';
import App from './components/app';
import ProfileMain from './components/profile-main';
import CourseAuction from './components/course-auctions';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Home}></IndexRoute>
            <Route path='createAccount' component={CreateAccount}></Route>
            <Route path='login' component={Login}></Route>
            <Route path='profile' component={ProfileMain}></Route>
            <Route path='courseAuction/:id' component={CourseAuction}></Route>
        </Route>
    </Router>
  , document.querySelector('.app'));





  // ReactDOM.render(
  //     <App />
  //     , document.querySelector('.app'));
