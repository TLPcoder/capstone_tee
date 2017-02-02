'use strict';
import React, {Component} from 'react';

class CreateCard extends Component{
    constructor(props){
        super(props);
    }
    render(){
        console.log("props", this.props);
        return(
            <div>
                <img src={this.props.data.image} alt="" height="300px" width="300px"/>
                <p>{this.props.data.name}</p>
            </div>
        )
    }
}

export default CreateCard;
