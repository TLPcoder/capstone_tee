'use strict';
import React, {Component} from 'react';

class PaymentWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            auctionData: this.props.auctionData,
            bid: this.props.auctionData[0].top_bid,
            name: '',
            creditCard: '',
            CVV: ''
        };
        this.changeBidValue = this.changeBidValue.bind(this);
        this.changeBidData = this.changeBidData.bind(this);
        this.allDataFilled = this.allDataFilled.bind(this);
        this.changeNameValue = this.changeNameValue.bind(this);
        this.changeCreditCardValue = this.changeCreditCardValue.bind(this);
        this.changeCVVValue = this.changeCVVValue.bind(this);
        this.createBid = this.createBid.bind(this);
    }
    changeBidValue(event) {
        console.log(this.state.bid);
        this.setState({
            userData: this.state.userData,
            auctionData: this.state.auctionData,
            bid: event.target.value,
            name: this.state.name,
            creditCard: this.state.creditCard,
            CVV: this.state.CVV
        });
    }
    changeNameValue(event) {
        console.log(this.state.name);
        this.setState({
            userData: this.state.userData,
            auctionData: this.state.auctionData,
            bid: this.state.bid,
            name: event.target.value,
            creditCard: this.state.creditCard,
            CVV: this.state.CVV
        });
    }
    changeCreditCardValue(event) {
        console.log(this.state.creditCard);
        this.setState({
            userData: this.state.userData,
            auctionData: this.state.auctionData,
            bid: this.state.bid,
            name: this.state.name,
            creditCard: event.target.value,
            CVV: this.state.CVV
        });
    }
    changeCVVValue(event) {
        console.log(this.state.CVV);
        this.setState({
            userData: this.state.userData,
            auctionData: this.state.auctionData,
            bid: event.target.value,
            name: this.state.name,
            creditCard: this.state.creditCard,
            CVV: event.target.value
        });
    }
    changeBidData() {
        if (this.allDataFilled()) {
            fetch(`http://localhost:3000/auction/changeBid`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({id: this.state.auctionData[0].id, newBid: this.state.bid})
            }).then((promise) => {
                return promise.json();
            }).then((json) => {
                this.setState({currentBid: this.state.currentBid, bidData: this.state.currentBid});
                this.createBid();
                window.location.hash = '/success';
            });
        }else{
            console.log(this.state);
            alert('your payment information is incorrect try again ;)');
        }
    }
    createBid(){
        var bider_id = this.state.userData[0].user_id;
        var auction_id = this.state.auctionData[0].id;
        var bid_amount = this.state.bid;
        fetch(`http://localhost:3000/payment/newBid`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({bider_id: bider_id, auction_id: auction_id, bid_amount:bid_amount})
        }).then((promise) => {
            return promise.json();
        }).then((json) => {
            console.log("created new Bid", json);
        });
    }
    allDataFilled(){
        var userData = this.state.userData[0];
        var name = `${userData.first_name} ${userData.last_name}`;
        if(this.state.name === name && this.state.creditCard === userData.credit_card_number.replace(/\s/g,'') && this.state.CVV === userData.CVV.replace(/\s/g,'')){
            return true;
        }else{
            return false;
        }
    }
    render() {
        console.log("user data", this.state.userData);
        console.log("auction data", this.state.auctionData);
        return (
            <div>
                <h3>Current Bid: {this.props.auctionData[0].top_bid}</h3>
                <input type="text" clasdName='payment-inputs' placeholder='Name' onChange ={this.changeNameValue}/>
                <input type="text" clasdName='payment-inputs' placeholder='credit card number' onChange ={this.changeCreditCardValue}/>
                <input type="text" clasdName='payment-inputs' placeholder='CVV' onChange = {this.changeCVVValue}/>
                <input type="text" clasdName='payment-inputs' placeholder='bid' onChange={this.changeBidValue}/>
                <input type="button" value="Place Bid" onClick={this.changeBidData}/>
            </div>
        )
    }
}

export default PaymentWindow;
