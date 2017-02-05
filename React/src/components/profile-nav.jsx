import React, {Component} from 'react';

class ProfileNav extends Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout(){
        sessionStorage.clear();
        window.location.hash = '/login';
    }
    render(){
        return(
            <div id = 'profile-nav'>
                <h1>Tee-Ball</h1>
                <ul id = "profile-nav-buttons-ul">
                    <li className = "profile-nav-button">
                        <a href="http://localhost:8080/#/auctionSearch">Auctions</a>
                    </li>
                    <li className = "profile-nav-button">
                        <a href="">Search</a>
                    </li>
                    <li className = "profile-nav-button">
                        <a href="http://localhost:8080/#/profile">Profile</a>
                    </li>
                    <li className = "profile-nav-button">
                        <a onClick ={this.logout} href="http://localhost:8080/#/login">Logout</a>
                    </li>
                    <li className = "profile-nav-button">
                        <a onClick ={this.props.updateWindow}>Update Profile</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default ProfileNav;
