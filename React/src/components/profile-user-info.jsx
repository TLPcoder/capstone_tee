'use strict';
import React, {Component} from 'react';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: '',
            userInfo: {},
        };
        this.getUserInfo = this.getUserInfo.bind(this);
        this.changeUserData = this.changeUserData.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changeImage = this.changeImage.bind(this);
        this.changeZip = this.changeZip.bind(this);
        this.getUserInfo();
    }

    getUserInfo() {
        var id = this.props.findUser();
        console.log('user id', id);
        fetch(`http://localhost:3000/user/${id}`).then((promise) => {
            return promise.json();
        }).then((json) => {
            this.setState({
                loading: '',
                userInfo: json,
                password: json[0].hashed_password,
                email: json[0].email,
                image: json[0].image,
                zip: json[0].zip
            });
            console.log("state", this.state);
        });
    }
    changePassword(event){
        this.setState({
            loading: '',
            userInfo: this.state.userInfo,
            password: event.target.value,
            email: this.state.email,
            image: this.state.image,
            zip: this.state.zip
        });
    }
    changeEmail(event){
        this.setState({
            loading: '',
            userInfo: this.state.userInfo,
            password: this.state.password,
            email: event.target.value,
            image: this.state.image,
            zip: this.state.zip
        });
    }
    changeImage(event){
        this.setState({
            loading: '',
            userInfo: this.state.userInfo,
            password: this.state.password,
            email: this.state.email,
            image: event.target.value,
            zip: this.state.zip
        });
    }
    changeZip(event){
        this.setState({
            loading: '',
            userInfo: this.state.userInfo,
            password: this.state.password,
            email: this.state.email,
            image: this.state.image,
            zip: event.target.value
        });
    }
    changeUserData() {
        console.log("hello");
        fetch(`http://localhost:3000/user/update`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.userInfo[0].id,
                password: this.state.password,
                email: this.state.email,
                image: this.state.image,
                zip: this.state.zip
            })
        }).then((promise) => {
            return promise.json();
        }).then((json) => {
            console.log(json);
        }).catch(function(res) {
            console.log(res);
        });
    }
    render() {
        console.log(this.state)
        if (!this.state.userInfo.length) {
            return (
                <div></div>
            );
        }
        console.log("user info", this.state.userInfo);
        return (
            <div className="userInfor">
                <img className="headshot" height="250px" width="250px" src={this.state.userInfo[0].image} alt="Someone didnt upload an image :("/>
                <h3>{this.state.userInfo[0].first_name} {this.state.userInfo[0].last_name}</h3>
                <form onSubmit={this.changeUserData}>
                    <input type="password" placeholder="password" onChange ={this.changePassword}/>
                    <input type="email" placeholder="email" onChange ={this.changeEmail}/>
                    <input type="text" placeholder="image url" onChange ={this.changeImage}/>
                    <input type="text" placeholder="zip" onChange ={this.changeZip}/>
                    <input type="submit" value = "Change" onClick={this.changeUserData}/>
                </form>
            </div>
        )
    }
}

export default UserInfo;
