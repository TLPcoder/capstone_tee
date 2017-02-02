'use strict';
import React, {Component} from 'react';

class CourseAuction extends Component{
    constructor(props){
        super(props);
    }
    render(){
        console.log("CourseAuction  props", this.props)
        return (
            <h1>hello there from CourseAuction</h1>
        )
    }
}

export default CourseAuction;
