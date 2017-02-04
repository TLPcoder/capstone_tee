'use strict';
import React, {Component} from 'react';

class CourseAuctionBody extends Component{
    constructor(props){
        super(props);
    }
    render(){
        var center = {
            textAlign:'center'
        }
        return(
            <div>
                <h5  style={center} className="course-auction-description">Description of {this.props.data.name}</h5>
                <p className = "course-auction-description">{this.props.data.description}</p>
            </div>
        )
    }
}

export default CourseAuctionBody;
