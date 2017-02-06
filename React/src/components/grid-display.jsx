'use strict';
import React, {Component} from 'react';
import ReactSelectize from "react-selectize";
import CreateCourseForm from "./create-course-form";
import CreateCard from './create-cards';
var SimpleSelect = ReactSelectize.SimpleSelect;

class GridDisplay extends Component {
    constructor(props) {
        super(props);
        this.getUserId = this.getUserId.bind(this);
    }
    getUserId() {
        var data = sessionStorage.getItem('golfMember');
        return data;
    }
    render() {
        var userId = this.getUserId();
        var key = 0;
        var favorites = this.props.courseData.map((course) =>{
            key++;
            console.log(course);
            return (
                <CreateCard dataAuction={course} key={key}/>
            )
        });
        if(this.props.courseData){
            return(
                <div>{favorites}</div>
            )
        }
    }
}

export default GridDisplay;
