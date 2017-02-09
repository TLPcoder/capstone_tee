'use strict';
import React, {Component} from 'react';
import ReactSelectize from "react-selectize";
import CreateCard from './create-cards';
var SimpleSelect = ReactSelectize.SimpleSelect;

class GridDisplay extends Component {
    constructor(props) {
        super(props);
        this.getUserId = this.getUserId.bind(this);
        this.setClassNameBasedOnLength = this.setClassNameBasedOnLength.bind(this);
    }
    getUserId() {
        var data = sessionStorage.getItem('golfMember');
        return data;
    }
    setClassNameBasedOnLength(length){
        this.props.setClassName(length);
    }
    render() {
        var userId = this.getUserId();
        var key = 0;
        var favorites = this.props.courseData.map((course) =>{
            key++;
            if (course.owner_id === userId * 1) {
                return;
            }
            return (
                <CreateCard dataAuction={course} key={key}/>
            )
        });
        this.setClassNameBasedOnLength(favorites.length);
        console.log("length here", favorites.length);

        if(this.props.courseData){
            return(
                <div className = "grid-display">{favorites}</div>
            )
        }
    }
}

export default GridDisplay;
