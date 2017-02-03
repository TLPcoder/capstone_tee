'use strict';
import React, {Component} from 'react';

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {},
            auctionId: this.props.params.id,
            bid: this.props.params.bid
        };
        console.log(this.props.params);
        this.getUserData = this.getUserData.bind(this);
        this.changeBid = this.changeBid.bind(this);
        this.getUser = this.getUser.bind(this);
        this.getUserData();
    }
    getUserData() {
        var userId = this.getUser();
        console.log("current user id", userId);
        fetch(`http://localhost:3000/payment/userInfo/${userId}`).then((promise) => {
            return promise.json();
        }).then((json) => {
            this.setState({userData: json, auctionId: this.props.params.id, bid: this.props.params.bid});
        });

    }
    changeBid() {
        fetch(`http://localhost:3000/auction/changeBid`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({id: auctionId, newBid: this.state.currentBid})
        }).then((promise) => {
            return promise.json();
        }).then((json) => {
            console.log(json)
            this.setState({currentBid: this.state.currentBid, bidData: this.state.currentBid});
        });
    }
    getUser() {
        return sessionStorage.getItem('golfMember');
    }
    render() {
        if (this.state.userData.length > 0) {
            console.log("user data", this.state.userData);
            return (
                <div>
                    <h1>Payment 2</h1>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Payment</h1>
                </div>
            )
        }
    }
}
export default Payment;
