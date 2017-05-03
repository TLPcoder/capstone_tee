'use strict';
import React, {Component} from 'react';
import ReactSelectize from "react-selectize";
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
            if (course.owner_id === userId * 1) {
                return;
            }
            return (
                <CreateCard dataAuction={course} key={key}/>
            )
        });
        var style;
        console.log("PROPS", this.props)
        if(this.props.courseData.length >= 3){
            console.log('length', this.props.courseData.length)
            style = {
                'width':'937px',
                'position':'relative',
                'top':'200px',
                'margin':'auto'
            };
        }else if(this.props.courseData.length === 2){
            console.log('length', this.props.courseData.length)
            style = {
                'width':'629px',
                'position':'relative',
                'top':'200px',
                'margin':'auto'
            };
        }else{
            console.log('length', this.props.courseData.length)
            style = {
                'width':'300px',
                'position':'relative',
                'top':'200px',
                'margin':'auto'
            };
        }
        if(this.props.courseData){
            return(
                <div style={style}>{favorites}</div>
            )
        }
    }
}

export default GridDisplay;
