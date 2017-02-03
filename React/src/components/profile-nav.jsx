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
                <button onClick = {this.logout}>Logout</button>
            </div>
        )
    }
}

export default ProfileNav;
