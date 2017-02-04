'use strict';
import React, {Component} from 'react';

class AuctionImage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        console.log("image", this.props)
        return(
            <img id = "auction-image" src={this.props.image} alt="" height='400px' width='400px'/>
        )
    }
}

export default AuctionImage;
