'use strict';
import React, {Component} from 'react';
import MainNav from './nav-main';
import AuctionImage from './course-auction-img';
import BiddingBox from './course-auction-bidding-box';
import CourseAuctionBody from './course-auction-body';

class CourseAuction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: {}
        };
        this.fetchInfo = this.fetchInfo.bind(this);
        this.fetchInfo();
    }
    fetchInfo() {
        fetch(`http://localhost:3000/auction/${this.props.params.id}`).then((promise) => {
            return promise.json();
        }).then((json) => {
            console.log("json", json)
            this.setState({loading: false, data: json});
        });
    }
    render() {
        console.log("CourseAuction  props", this.props.params.id);
        if (this.state.loading) {
            return (
                <div></div>
            )
        } else {
            return (
                <div id = "auction-container">
                    <MainNav/>
                    <div id = "auction-body-container">
                        <AuctionImage image={this.state.data[0].image}/>
                        <BiddingBox data = {this.state.data[0]}/>
                        <CourseAuctionBody data = {this.state.data[0]}/>
                    </div>
                </div>
            )
        }
    }
}

export default CourseAuction;
