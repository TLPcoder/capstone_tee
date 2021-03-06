'use strict';
import React, {Component} from 'react';

class MainNav extends Component {
    constructor(props) {
        super(props);
        this.getUserId = this.getUserId.bind(this);
        this.logout = this.logout.bind(this);
    }
    getUserId() {
        var id = sessionStorage.getItem("golfMember");
        console.log(id);
    }
    logout() {
        sessionStorage.clear();
    }
    render() {
        console.log(this.getUserId());
        return (
            <div id='main-nav'>
                <h1>Tee-Bay</h1>
                <ul id = "main-nav-buttons">
                    <li className = "main-nav-button">
                        <a href="http://localhost:8080/#/profile">Profile</a>
                    </li>
                    <li className = "main-nav-button">
                        <a href="http://localhost:8080/#/auctionSearch">Auctions</a>
                    </li>
                    <li className = "main-nav-button">
                        <a href="http://localhost:8080/#/createauction">Create Auction</a>
                    </li>
                    <li className = "main-nav-button">
                        <a href="http://localhost:8080/#/bids">Current Bids</a>
                    </li>
                    <li className = "main-nav-button">
                        <a href="http://localhost:8080/#/favorites">Favorites</a>
                    </li>
                    <li className = "main-nav-button">
                        <a href="http://localhost:8080/#/searchcourse">Search Courses</a>
                    </li>
                    <li className = "main-nav-button">
                        <a onClick ={this.logout} href="http://localhost:8080/#/login">Logout</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default MainNav;
