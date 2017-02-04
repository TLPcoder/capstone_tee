'use strict';
import React, {Component} from 'react';
import ProfileNav from './profile-nav';
import UserInfo from './profile-user-info';
import DisplayWindow from './profile-display-windows';
import CourseAuction from './course-auctions';

class ProfileMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateWindow: false
        };
        this.getUserId = this.getUserId.bind(this);
        this.updateWindow = this.updateWindow.bind(this);
    }
    getUserId() {
        var data = sessionStorage.getItem('golfMember');
        return data;
    }
    updateWindow() {
        if (!this.state.updateWindow) {
            this.setState({updateWindow: true});
        } else {
            this.setState({updateWindow: false});
        }
    }
    render() {
        var userId = this.getUserId();
        if (userId === null) {
            return (
                <a href="http://localhost:8080/#/login">
                    <h1>Login</h1>
                </a>
            )
        }
        return (
            <div id="profile-body-container">
                <ProfileNav updateWindow={this.updateWindow}/>
                <div id="profile-container">
                    <UserInfo findUser={this.getUserId} updateWindow={this.state.updateWindow}/>
                    <DisplayWindow category ={'Bids'} url={`http://localhost:3000/user/bids/${userId}`}/>
                    <DisplayWindow category ={'Favorites'} url={`http://localhost:3000/user/favorites/${userId}`}/>
                    <DisplayWindow category ={'Current'} url={`http://localhost:3000/auction`}/>
                </div>
            </div>
        )
    }
}

export default ProfileMain;
