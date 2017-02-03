'use strict';
import React, {Component} from 'react';

class BiddingBox extends Component {
    constructor(props) {
        super(props);
        this.payment = this.payment.bind(this);
    }
    payment() {
        var auctionId = this.props.data.id;
            window.location.hash = `/payment/${auctionId}`;
    }
    render() {
        return (
            <div>
                <h4 className="course-auction-name">{this.props.data.name}</h4>
                <h5 className="course-auction-bid">Current Bid ${this.props.data.top_bid}</h5>
                <input id="course-auction-bid-button" type="button" value="Make Bid" onClick={this.payment}/>
            </div>
        )
    }
}

export default BiddingBox;
