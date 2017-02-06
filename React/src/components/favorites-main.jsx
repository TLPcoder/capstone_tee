'use strict';
import React, {Component} from 'react';
import MainNav from './nav-main';
import ReactSelectize from "react-selectize";
import CreateCourseForm from "./create-course-form";
var SimpleSelect = ReactSelectize.SimpleSelect;
import GridDisplay from './grid-display';

class FavoriteMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        };
        this.getUserId = this.getUserId.bind(this);
        this.getFavorties = this.getFavorties.bind(this);
        this.getFavorties();
    }
    getFavorties() {
        var userID = this.getUserId();
        console.log(userID)
        fetch(`http://localhost:3000/user/favorites/courses/${userID}`).then((promise) => {
            return promise.json();
        }).then((json) => {
            console.log("api call", json);
            this.setState({
                courses: json
            });
        });
    }
    getUserId() {
        var data = sessionStorage.getItem('golfMember');
        return data;
    }
    render() {
        var userId = this.getUserId();
        if (this.state.courses) {
            return (
                <div id="favorite-body-container">
                    <MainNav/>
                    <GridDisplay courseData = {this.state.courses}/>
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }
    }
}

export default FavoriteMain;
