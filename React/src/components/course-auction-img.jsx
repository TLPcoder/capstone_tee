'use strict';
import React, {Component} from 'react';

class AuctionImage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        console.log("image", this.props)
        return(
            <img src={this.props.image} alt="" height='300px' width='300px'/>
        )
    }
}

export default AuctionImage;
