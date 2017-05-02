'use strict';
import React, {Component} from 'react';
import MainNav from './nav-main';
import PaymentWindow from './payment-payment-window';
import AuctionImage from './course-auction-img';

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            auctionData: [],
            auctionId: this.props.params.id
        };
        this.getUserData = this.getUserData.bind(this);
        this.getUser = this.getUser.bind(this);
        this.getAuctionData = this.getAuctionData.bind(this);
    }
    componentWillMount(){
        this.getAuctionData();
    }
    getAuctionData() {
        fetch(`http://localhost:8080/auction/${this.state.auctionId}`).then((promise) => {
            return promise.json();
        }).then((json) => {
            this.setState({userData: this.state.userData, auctionData: json, auctionId: this.props.params.id});
        });
    }
    getUserData() {
        console.log("hello");
        var userId = this.getUser();
        fetch(`http://localhost:8080/payment/userInfo/${userId}`).then((promise) => {
            return promise.json();
        }).then((json) => {
            this.setState({userData: json, auctionData: this.state.auctionData, auctionId: this.props.params.id});
        });
    }
    getUser() {
        return sessionStorage.getItem('golfMember');
    }
    render() {
        var center = {
            color:'white'
            // marginLeft:'10%'
        };
        if (this.state.auctionData.length > 0) {
            console.log("auction data", this.state.auctionData);
            console.log("user data", this.state.userData);
            return (
                <div>
                    <div id="payment-background"></div>
                    <MainNav/>
                    <div className = "payment-window-container">
                        <div className="payment-window">
                            <PaymentWindow userData={this.state.userData} auctionData={this.state.auctionData}/>
                        </div>
                        <div>
                            <img className="payment-image" src={this.state.auctionData[0].image} alt="" height='400px' width='400px'/>
                        </div>
                    </div>
                </div>
            )
        } else {
            console.log("state", this.state)
            console.log("props", this.props)
            return (
                <div>
                    Hello there;
                </div>
            )
        }
    }
}
export default Payment;
