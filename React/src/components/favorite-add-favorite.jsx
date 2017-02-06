'use strict';
import React, {Component} from 'react';
import ReactSelectize from "react-selectize";
import CreateCourseForm from "./create-course-form";
var SimpleSelect = ReactSelectize.SimpleSelect;

class AddFavorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            selectedCourse: null,
            selectedCourseId: null
        };
        this.getUserId = this.getUserId.bind(this);
        this.getCourses = this.getCourses.bind(this);
        this.addFavorite = this.addFavorite.bind(this);
        this.courseValue = this.courseValue.bind(this);
        this.getCourses();
    }
    getUserId() {
        var data = sessionStorage.getItem('golfMember');
        return data;
    }
    getCourses() {
        fetch(`http://localhost:3000/course`).then((promise) => {
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
    addFavorite() {
        console.log(this.state);
        var user_id = this.getUserId();
        var course_id = this.state.selectedCourseId;
        fetch(`http://localhost:3000/user/favorite`, {
            method: "POST",
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
            console.log(resData);
            this.props.addedFavorite();
        }).catch(function(res) {
            console.log(res);
        });
    }
    render() {
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
                    <SimpleSelect onValueChange={this.courseValue} options={selectOptions} placeholder="Select a Course"></SimpleSelect>
                    <input type="button" value="Add to Favorites" onClick={this.addFavorite}/>
                    <input type="button" value = 'Create Course'
                    onClick = {this.props.addCourse}/>
                </div>
            )
        }
    }
}

export default AddFavorite;
