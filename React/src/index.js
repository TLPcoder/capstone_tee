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
import Payment from './components/payment-main';
import Success from './components/success';
import AuctionSearch from './components/auction-search-main';
import CreateAuction from './components/new-auction-main';
import FavoriteMain from './components/favorites-main';
import BidsMain from './components/bids-main';
import SearchCourse from './components/search-courses-main';
import CourseProfile from './components/course-profile-main';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Home}></IndexRoute>
            <Route path='createAccount' component={CreateAccount}></Route>
            <Route path='login' component={Login}></Route>
            <Route path='profile' component={ProfileMain}></Route>
            <Route path='courseAuction/:id' component={CourseAuction}></Route>
            <Route path='payment/:id' component={Payment}></Route>
            <Route path='success' component={Success}></Route>
            <Route path='auctionSearch' component={AuctionSearch}></Route>
            <Route path='createAuction' component={CreateAuction}></Route>
            <Route path='favorites' component={FavoriteMain}></Route>
            <Route path='bids' component={BidsMain}></Route>
            <Route path='searchcourse' component={SearchCourse}></Route>
            <Route path='course/:id' component={CourseProfile}></Route>
        </Route>
    </Router>
  , document.querySelector('.app'));





  // ReactDOM.render(
  //     <App />
  //     , document.querySelector('.app'));
