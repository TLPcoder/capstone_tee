'use strict';
import React, {Component} from 'react';
import MainNav from './nav-main';
import ReactSelectize from "react-selectize";
var SimpleSelect = ReactSelectize.SimpleSelect;
import GridDisplay from './grid-display';
import AddFavorite from './favorite-add-favorite';
import CreateCourseForm from './create-course-form';
import DeleteFavorite from './favorite-delete';

class FavoriteMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            addCourse: false,
            deleteFavorite: false
        };
        this.getUserId = this.getUserId.bind(this);
        this.getFavorties = this.getFavorties.bind(this);
        this.addCourse = this.addCourse.bind(this);
        this.addedFavorite = this.addedFavorite.bind(this);
        this.deleteFavorite = this.deleteFavorite.bind(this);
        this.deleteFavoriteCourse = this.deleteFavoriteCourse.bind(this);
    }
    componentWillMount(){
        this.getFavorties();
    }
    getFavorties() {
        var userID = this.getUserId();
        console.log(userID)
        fetch(`http://localhost:8080/user/favorites/courses/${userID}`).then((promise) => {
            return promise.json();
        }).then((json) => {
            console.log("api call", json);
            this.setState({courses: json, addCourse: false});
        });
    }
    deleteFavoriteCourse(){
        console.log('deleteFavoriteCourse')
    }
    deleteFavorite(){
        console.log("delete")
        this.setState({
            deleteFavorite: !this.state.deleteFavorite
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
        var style;
        console.log('something',this.state);
        if(this.state.courses.length >= 3){
            style = {
                'width':'937px',
                'position':'relative',
                'top':'200px'
            };
        }else if(this.state.courses.length === 2){
            style = {
                'width':'625px',
                'position':'relative',
                'top':'200px'
            };
        }else{
            style = {
                'width':'300px',
                'position':'relative',
                'top':'200px'
            };
        }
        if(this.state.deleteFavorite){
            return (
                <div>
                    <div id="favorite-body-container"></div>
                    <MainNav/>
                    <div className="favorite-options">
                        <DeleteFavorite addedFavorite={this.addedFavorite} deleteFavorite={this.deleteFavorite} deleteFavoriteCourse={this.deleteFavoriteCourse}/>
                    </div>
                    <div className = "favorite-display" style={style}>
                        <GridDisplay courseData={this.state.courses} addCourse={this.addCourse}/>
                    </div>
                </div>
            )
        }else if (this.state.courses && !this.state.addCourse) {
            return (
                <div>
                    <div id="favorite-body-container"></div>
                    <MainNav/>
                    <div className="favorite-options">
                        <AddFavorite deleteFavorite={this.deleteFavorite} addedFavorite={this.addedFavorite} addCourse={this.addCourse}/>
                    </div>
                    <div className = "favorite-display" style={style}>
                        <GridDisplay courses={this.state.courses.length} courseData={this.state.courses} addCourse={this.addCourse}/>
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