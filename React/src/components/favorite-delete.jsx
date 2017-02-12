'use strict';
import React, {Component} from 'react';
import ReactSelectize from "react-selectize";
import CreateCourseForm from "./create-course-form";
var SimpleSelect = ReactSelectize.SimpleSelect;

class DeleteFavorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            selectedCourse: null,
            selectedCourseId: null
        };
        this.getUserId = this.getUserId.bind(this);
        this.getCourses = this.getCourses.bind(this);
        this.deleteFavorite = this.deleteFavorite.bind(this);
        this.courseValue = this.courseValue.bind(this);
        this.deleteFavoriteCourse = this.deleteFavoriteCourse.bind(this);
        this.getCourses();
    }
    getUserId() {
        var data = sessionStorage.getItem('golfMember');
        return data;
    }
    getCourses() {
        var userID = this.getUserId();
        fetch(`http://localhost:3000/user/favorites/courses/${userID}`).then((promise) => {
            return promise.json();
        }).then((json) => {
            this.setState({courses: json});
        });
    }
    courseValue(value) {
        console.log(this.state);
        this.setState({
            courses: this.state.courses,
            selectedCourse: value.label,
            selectedCourseId: value.value
        });
    }
    deleteFavorite() {
        console.log(this.state);
        var user_id = this.getUserId();
        var course_id = this.state.selectedCourseId;
        fetch(`http://localhost:3000/user/delete/favorite`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: user_id,
                course_id: course_id
            })
        }).then((res) => {
            return res.json();
        }).then((resData) => {
            console.log(resData.name);
            this.getCourses();
            this.props.addedFavorite();
            this.props.deleteFavorite();
        }).catch(function(res) {
            console.log(res);
        });
    }
    deleteFavoriteCourse(courseId){
        this.props.deleteFavoriteCourse(courseId);
    }
    render() {
        var simpleSelect = {
                top:'10',
                left:'70',
                width:'250px'
            };
        if (!this.state.courses) {
            return (
                <div></div>
            )
        } else {
            var selectOptions = this.state.courses.map((course) => {
                return {label: course.name, value: course.id};
            });
            var userId = this.getUserId();
            return (
                <div>
                    <SimpleSelect style={simpleSelect} className = "favorite-options-inputs" onValueChange={this.courseValue} options={selectOptions} placeholder="Select a Course"></SimpleSelect>
                    <input className = "favorite-options-inputs favorite-options-inputs-buttons favorite-options-inputs-buttons-left" type="button" value="Back to Favorites" onClick={this.props.deleteFavorite}/>
                    <input className = "favorite-options-inputs favorite-options-inputs-buttons" type="button" value = 'Delete Favorite'
                    onClick = {this.deleteFavorite}/>
                </div>
            )
        }
    }
}

export default DeleteFavorite;
