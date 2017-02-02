'use strict';
import React, {Component} from 'react';

class UserInfo extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: '',
            userInfo: {}
        };
        this.getUserInfo = this.getUserInfo.bind(this);
        this.getUserInfo();
    }
    getUserInfo(id){
        fetch(`http://localhost:3000/user/1`)
        .then((promise) =>{
            return promise.json();
        }).then((json)=>{
            this.setState({
                loading: '',
                userInfo: json
            });
            console.log("user json", json);
        });
    }
    render(){
        if(!this.state.userInfo.length){
            return(<div></div>)
        }
        console.log("user info", this.state.userInfo);
        return(
            <div>
                <h3>{this.state.userInfo[0].first_name} { this.state.userInfo[0].last_name}</h3>
            </div>
        )
    }
}

export default UserInfo;
