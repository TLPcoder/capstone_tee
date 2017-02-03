'use strict';
import React, {Component} from 'react';

class BiddingBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentBid: {}
        }
        this.changeBidAmount = this.changeBidAmount.bind(this);
    }
    changeBidAmount(event){
        this.setState({
            currentBid: event.target.value
        });
    }
    render(){
        console.log("currentBid", this.props)
        return(
            <div>
                <h4 className = "course-auction-name">{this.props.data.name}</h4>
                <h5 className = "course-auction-bid">${this.props.data.top_bid}</h5>
                <input id = 'course-auction-bid-input' type="text" onChange={this.changeBidAmount}/>
                <input id = "course-auction-bid-button" type="button" value = "Place Bid"/>
            </div>
        )
    }
}

export default BiddingBox;
