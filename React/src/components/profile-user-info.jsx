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
            password: event.target.value,
        });
    }
    changeEmail(event){
        this.setState({
            email: event.target.value
        });
    }
    changeImage(event){
        this.setState({
            image: event.target.value
        });
    }
    changeZip(event){
        this.setState({
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
            // window.location.hash = '/profile';
            location.reload();
            console.log(json);
        }).catch(function(res) {
            console.log(res);
        });
    }
    render() {
        var imageUpdate = {
            marginLeft: '204px'
        };
        var imageNoUpdate = {
            margin: 'auto',
            marginTop: '20px'
        };
        var imgSource;
        // if(!this.state.userInfo[0].image){
        //     imgSource = "http://www.racingpal.com/images/nouser.png";
        // }else{
        //     imgSource = this.state.userInfo[0].image;
        // }
        if (!this.state.userInfo.length) {
            return (
                <div></div>
            );
        }
        if(this.props.updateWindow){
            return (
                <div className="userInfor">
                    <img className="headshot" height="250px" width="250px" style = {imageUpdate} src={this.state.userInfo[0].image} alt="http://www.racingpal.com/images/nouser.png"/>
                    <form onSubmit={this.changeUserData} className = "update-profile">
                        <input className = 'profile-inputs' type="password" placeholder="password" onChange ={this.changePassword}/>
                        <input className = 'profile-inputs' type="email" placeholder="email" onChange ={this.changeEmail}/>
                        <input className = 'profile-inputs' type="text" placeholder="image url" onChange ={this.changeImage}/>
                        <input className = 'profile-inputs' type="text" placeholder="zip" onChange ={this.changeZip}/>
                        <a className = "profile-update-button" href="http://localhost:8080/#/profile" onClick = {this.changeUserData}>Update</a>
                    </form>
                    <h3>{this.state.userInfo[0].first_name} {this.state.userInfo[0].last_name}</h3>
                </div>
            )
        }
        return (
            <div className="userInfor">
                <img className="headshot" height="250px" width="250px" style = {imageNoUpdate} src={this.state.userInfo[0].image} alt="Someone didnt upload an image :("/>
                <h3>{this.state.userInfo[0].first_name} {this.state.userInfo[0].last_name}</h3>
            </div>
        )
    }
}

export default UserInfo;




// <input className = "profile-update-button"type="submit" value = "Update" onClick={this.changeUserData}/>
