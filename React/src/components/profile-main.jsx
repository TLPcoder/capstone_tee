'use strict';
import React, {Component} from 'react';
import ProfileNav from './profile-nav';
import UserInfo from './profile-user-info';
import DisplayWindow from './profile-display-windows';
import CourseAuction from './course-auctions';

class ProfileMain extends Component {
    constructor(props) {
        super(props);
        this.getUserId = this.getUserId.bind(this);
    }
    getUserId() {
        var data = sessionStorage.getItem('golfMember');
        return data;
    }

    render() {
        var userId = this.getUserId();
        console.log("session", userId);
        if (userId === null) {
            return (
                <a href="http://localhost:8080/#/login">
                    <h1>Login</h1>
                </a>
            )
        }
        return (
            <div id ="profile-body-container">
                <ProfileNav/>
                <div id="profile-container">
                    <UserInfo findUser={this.getUserId}/>
                    <h1>Bids</h1>
                    <div className="profile-bids">
                        <ul>
                            <DisplayWindow url={`http://localhost:3000/user/bids/${userId}`}/>
                        </ul>
                    </div>
                    <h1>Favorites</h1>
                    <div className="profile-bids">
                        <ul>
                            <DisplayWindow url={`http://localhost:3000/user/favorites/${userId}`}/>
                        </ul>
                    </div>
                    <h1>Current</h1>
                    <div className="profile-bids">
                        <ul>
                            <DisplayWindow url={`http://localhost:3000/auction`}/>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileMain;
