'use strict';
import React, {Component} from 'react';
import ProfileNav from './profile-nav';
import UserInfo from './profile-user-info';
import DisplayWindow from './profile-display-windows';

class ProfileMain extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>hello there budddy</h1>
                <ProfileNav/>
                <UserInfo/>
                <h1>Bids</h1>
                <DisplayWindow url={`http://localhost:3000/user/bids/1`}/>
                <h1>favorites</h1>
                <DisplayWindow url={`http://localhost:3000/user/favorites/1`}/>
                <h1>Current</h1>
                <DisplayWindow url={`http://localhost:3000/auction`}/>
            </div>
        )
    }
}

export default ProfileMain;
