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
                        <a href="http://localhost:8080/#/createauction">Create Auction</a>
                    </li>
                    <li className = "profile-nav-button">
                        <a href="http://localhost:8080/#/bids">Current Bids</a>
                    </li>
                    <li className = "profile-nav-button">
                        <a href="http://localhost:8080/#/favorites">Favorites</a>
                    </li>
                    <li className = "profile-nav-button">
                        <a href="http://localhost:8080/#/searchcourse">Search Courses</a>
                    </li>
                    <li className = "profile-nav-button">
                        <a onClick ={this.props.updateWindow}>Update Profile</a>
                    </li>
                    <li className = "profile-nav-button">
                        <a onClick ={this.logout} href="http://localhost:8080/#/login">Logout</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default ProfileNav;
