'use strict';
import React, {Component} from 'react';

class BiddingBox extends Component {
    constructor(props) {
        super(props);
        this.payment = this.payment.bind(this);
        this.checkoutCourse = this.checkoutCourse.bind(this);
        this.deleteAuction = this.deleteAuction.bind(this);
        this.getUser = this.getUser.bind(this);
    }
    payment() {
        console.log('course data', this.props.data)
        var auctionId = this.props.data.auction_id;
        console.log('auction ID', this.props.data.auction_id);
        window.location.hash = `/payment/${auctionId}`;
    }
    checkoutCourse() {
        window.location.hash = `/course/${this.props.data.course_id}`;
    }
    getUser() {
        return sessionStorage.getItem('golfMember');
    }
    deleteAuction(){
        fetch(`http://localhost:3000/auction/delete`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                auction_id: this.props.data.auction_id
            })
        }).then((res) => {
            return res.json();
        }).then((resData) => {
            console.log(resData);
            alert("Your auction has been deleted");
            window.location.hash = '/profile';
        }).catch(function(res) {
            console.log(res);
        });
    }
    render() {
        console.log("course id", this.props.data);
        var courseId = `http://localhost:8080/#/course/${this.props.data.course_id}`
        if (this.props.owner) {
            return (
                <div className="auction-bidding-box">
                    <h3 className="course-auction-text">{this.props.data.name}</h3>
                    <p className="course-auction-text">Tee Time: {this.props.data.tee_time.slice(this.props.data.tee_time.indexOf('T') + 1, this.props.data.tee_time.length - 5)} on {this.props.data.tee_time.slice(0, this.props.data.tee_time.indexOf('T'))}</p>
                    <p className="course-auction-text">Auction Ends: Midnight on {this.props.data.auction_ends.slice(0, this.props.data.auction_ends.indexOf('T'))}</p>
                    <p className="course-auction-text">Current Bid ${this.props.data.top_bid}</p>
                    <input type="button" onClick={this.deleteAuction}className="course-auction-delete" value = "Delete"/>
                </div>
            )
        } else {
            return (
                <div className="auction-bidding-box">
                    <h3 className="course-auction-text">{this.props.data.name}</h3>
                    <p className="course-auction-text">Tee Time: {this.props.data.tee_time.slice(this.props.data.tee_time.indexOf('T') + 1, this.props.data.tee_time.length - 5)} on {this.props.data.tee_time.slice(0, this.props.data.tee_time.indexOf('T'))}</p>
                    <p className="course-auction-text">Auction Ends: Midnight on {this.props.data.auction_ends.slice(0, this.props.data.auction_ends.indexOf('T'))}</p>
                    <p className="course-auction-text">Current Bid ${this.props.data.top_bid}</p>
                    <ul id='course-auction-bid-button'>
                        <li className="course-auction-bid-buttons">
                            <a href="" onClick={this.payment}>Make Bid</a>
                        </li>
                        <li className="course-auction-bid-buttons">
                            <a href={courseId} onClick={this.checkoutCourse}>View Course</a>
                        </li>
                    </ul>

                </div>
            )
        }
    }
}

export default BiddingBox;
