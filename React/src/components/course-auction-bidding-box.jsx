'use strict';
import React, {Component} from 'react';

class BiddingBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBid: {},
            bidData: this.props.data.top_bid
        }
        this.changeBidState = this.changeBidState.bind(this);
        this.payment = this.payment.bind(this);
    }
    changeBidState(event) {
        this.setState({
            currentBid: event.target.value,
            bidData: this.props.data.top_bid
        });
    }
    payment() {
        var auctionId = this.props.data.id;
        if (this.state.currentBid > this.props.data.top_bid) {
            window.location.hash = `/payment/${auctionId}/${this.state.currentBid}`;
        }else{
            alert("Your bid must be larger than current bid");
        }
    }
    render() {
        return (
            <div>
                <h4 className="course-auction-name">{this.props.data.name}</h4>
                <h5 className="course-auction-bid">Current Bid ${this.state.bidData}</h5>
                <input id='course-auction-bid-input' type="text" onChange={this.changeBidState}/>
                <input id="course-auction-bid-button" type="button" value="Place Bid" onClick={this.payment}/>
            </div>
        )
    }
}

export default BiddingBox;
