'use strict';
import React, {Component} from 'react';

class BiddingBox extends Component {
    constructor(props) {
        super(props);
        this.payment = this.payment.bind(this);
        this.checkoutCourse = this.checkoutCourse.bind(this);
    }
    payment() {
        console.log('course data', this.props.data)
        var auctionId = this.props.data.auction_id;
        window.location.hash = `/payment/${auctionId}`;
    }
    checkoutCourse(){
        //window.location.hash = `/course/${this.props.data.course_id}`;
    }
    render() {
        console.log("course id", this.props.data);
        return (
            <div className="auction-bidding-box">
                <h4 className="course-auction-text">{this.props.data.name}</h4>
                <h5 className="course-auction-text">Tee Time: {this.props.data.tee_time.slice(this.props.data.tee_time.indexOf('T') + 1, this.props.data.tee_time.length - 5)}
                     on {this.props.data.tee_time.slice(0, this.props.data.tee_time.indexOf('T'))}</h5>
                <h5 className="course-auction-text">Auction Ends: Midnight on {this.props.data.auction_ends.slice(0, this.props.data.auction_ends.indexOf('T'))}</h5>
                <h5 className="course-auction-text">Current Bid ${this.props.data.top_bid}</h5>
                <ul id = 'course-auction-bid-button'>
                    <li  className="course-auction-bid-buttons"><a href="" onClick={this.payment}>Make Bid</a></li>
                <li className="course-auction-bid-buttons"><a href="" onClick = {this.checkoutCourse}>View Course</a></li>
                </ul>

            </div>
        )
    }
}

export default BiddingBox;
