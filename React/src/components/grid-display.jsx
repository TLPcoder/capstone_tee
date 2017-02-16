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
        var positionMargin;
        if(this.props.courseData.length === 1){
            positionMargin = {
                margin:'auto',
                position: 'relative',
                top:'150px',
                marginLeft: '40%'
            };
        }else if(this.props.courseData.length === 2){
            positionMargin = {
                margin:'auto',
                position: 'relative',
                top:'150px',
                marginLeft: '30%'
            };
        }else{
            positionMargin = {
                margin:'auto',
                position: 'relative',
                top:'150px',
                marginLeft: '19%'
            };
        }
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
        if(this.props.courseData){
            return(
                <div style={positionMargin}>{favorites}</div>
            )
        }
    }
}

export default GridDisplay;
