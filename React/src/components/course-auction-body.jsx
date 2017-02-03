'use strict';
import React, {Component} from 'react';

class CourseAuctionBody extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <p id =     "course-auction-description">{this.props.data.description}</p>
            </div>
        )
    }
}

export default CourseAuctionBody;
