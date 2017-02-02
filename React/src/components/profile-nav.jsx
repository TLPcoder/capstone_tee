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
            <div>
                <button onClick = {this.logout}>Logout</button>
                <h1>NAV BAR</h1>
            </div>
        )
    }
}

export default ProfileNav;
