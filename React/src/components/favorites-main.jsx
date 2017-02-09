'use strict';
import React, {Component} from 'react';
import MainNav from './nav-main';
import ReactSelectize from "react-selectize";
var SimpleSelect = ReactSelectize.SimpleSelect;
import GridDisplay from './grid-display';
import AddFavorite from './favorite-add-favorite';
import CreateCourseForm from './create-course-form';

class FavoriteMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            addCourse: false
        };
        this.getUserId = this.getUserId.bind(this);
        this.getFavorties = this.getFavorties.bind(this);
        this.addCourse = this.addCourse.bind(this);
        this.addedFavorite = this.addedFavorite.bind(this);
        this.getFavorties();
    }
    getFavorties() {
        var userID = this.getUserId();
        console.log(userID)
        fetch(`http://localhost:3000/user/favorites/courses/${userID}`).then((promise) => {
            return promise.json();
        }).then((json) => {
            console.log("api call", json);
            this.setState({courses: json, addCourse: false});
        });
    }
    addedFavorite() {
        this.getFavorties();
    }
    getUserId() {
        var data = sessionStorage.getItem('golfMember');
        return data;
    }
    addCourse() {
        if (!this.state.addCourse) {
            this.setState({courses: this.state.courses, addCourse: true});
        } else {
            this.setState({courses: this.state.courses, addCourse: false});
            this.getFavorties();
        }
    }
    render() {
        var userId = this.getUserId();
        console.log("add course", this.state.addCourse)
        if (this.state.courses && !this.state.addCourse) {
            return (
                <div>
                    <div id="favorite-body-container"></div>
                    <MainNav/>
                    <div className="favorite-options">
                        <AddFavorite addedFavorite={this.addedFavorite} addCourse={this.addCourse}/>
                    </div>
                    <div className="favorite-images">
                        <GridDisplay courseData={this.state.courses} addCourse={this.addCourse}/>
                    </div>
                </div>
            )
        } else if (this.state.addCourse) {
            return (
                <div>
                    <div id="favorite-body-container"></div>
                    <MainNav/>
                    <div className="favorite-options-create">
                        <CreateCourseForm createCourse={this.addCourse}/>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default FavoriteMain;
