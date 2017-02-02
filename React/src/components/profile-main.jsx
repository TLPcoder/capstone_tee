'use strict';
import React, {Component} from 'react';
import ProfileNav from './profile-nav';
import UserInfo from './profile-user-info';
import DisplayWindow from './profile-display-windows';

class ProfileMain extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <h1>hello there budddy</h1>
                <ProfileNav/>
                <UserInfo/>
                <DisplayWindow/>
            </div>
        )
    }
}

export default ProfileMain;
