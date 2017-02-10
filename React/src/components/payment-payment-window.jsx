'use strict';
import React, {Component} from 'react';
import ReactSelectize from "react-selectize";
var SimpleSelect = ReactSelectize.SimpleSelect;

class PaymentWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            auctionData: this.props.auctionData,
            bid: this.props.auctionData[0].top_bid,
            name: '',
            creditCard: '',
            CVV: '',
            addPayment: false,
            month: '',
            year: ''
        };
        this.changeBidValue = this.changeBidValue.bind(this);
        this.changeBidData = this.changeBidData.bind(this);
        this.allDataFilled = this.allDataFilled.bind(this);
        this.changeNameValue = this.changeNameValue.bind(this);
        this.changeCreditCardValue = this.changeCreditCardValue.bind(this);
        this.changeCVVValue = this.changeCVVValue.bind(this);
        this.createBid = this.createBid.bind(this);
        this.addNewPayment = this.addNewPayment.bind(this);
        this.addPayment = this.addPayment.bind(this);
        this.getMonthData = this.getMonthData.bind(this);
        this.getYearData = this.getYearData.bind(this);
        this.getUser = this.getUser.bind(this);
    }
    getMonthData(value){
        this.setState({
            month:value.value
        });
    }
    getYearData(value){
        this.setState({
            year:value.value
        });
    }
    changeBidValue(event) {
        this.setState({
            bid: event.target.value,
        });
    }
    changeNameValue(event) {
        this.setState({
            name: event.target.value,
        });
    }
    changeCreditCardValue(event) {
        this.setState({
            creditCard: event.target.value,
        });
    }
    changeCVVValue(event) {
        this.setState({
            bid: event.target.value,
            CVV: event.target.value
        });
    }
    changeBidData() {
            fetch(`http://localhost:3000/auction/changeBid`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    id: this.state.auctionData[0].auction_id,
                    newBid: this.state.bid
                })
            }).then((promise) => {
                return promise.json();
            }).then((json) => {
                this.setState({currentBid: this.state.currentBid, bidData: this.state.currentBid});
                this.createBid();
            });
    }
    createBid() {
        var bider_id = this.getUser();
        var auction_id = this.state.auctionData[0].auction_id;
        var bid_amount = this.state.bid;
        fetch(`http://localhost:3000/payment/newBid`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                bider_id: bider_id,
                auction_id: auction_id,
                bid_amount: bid_amount
            })
        }).then((promise) => {
            return promise.json();
        }).then((json) => {
            console.log("created new Bid", json);
            alert("you have made a bid!")
            window.location.hash = '/profile';
        });
    }
    allDataFilled() {
        var userData = this.state.userData[0];
        var name = `${userData.first_name} ${userData.last_name}`;
        if (this.state.name === name && this.state.creditCard === userData.credit_card_number.replace(/\s/g, '') && this.state.CVV === userData.CVV.replace(/\s/g, '')) {
            return true;
        } else {
            return false;
        }
    }
    getUser(){
        var data = sessionStorage.getItem('golfMember');
        return data;
    }
    addPayment() {
        this.setState({
            userData: this.props.userData,
            auctionData: this.props.auctionData,
            bid: '',
            name: '',
            creditCard: '',
            CVV: '',
            addPayment: !this.state.addPayment
        });
    }
    addNewPayment(){
        //2020-02-20 24:00:00 UTC
        var expiration = `${this.state.year}-${this.state.month}-30 24:00:00 UTC`;
        var user_id = this.getUser();
        console.log("user id", user_id);
        console.log("expiration", expiration);
        fetch(`http://localhost:3000/payment/new/payment`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: user_id,
                credit_card_number: this.state.creditCard,
                CVV:this.state.CVV,
                expiration:expiration
            })
        }).then((res) =>{
            return res.json();
        }).then((resData) =>{
            this.addPayment();
        }).catch(function(err) {
            console.log("error", err);
        });
    }
    render() {
        console.log(this.state.addPayment);
        var simpleSelect ={

            width: '105px',
            margin:'auto',
            marginRight: '115px',
            color:'brown'
            // marginTop: '10px'
        };
        var position = {
            width: '105px',
            float:'left',
            margin:'auto',
            color:'brown',
            marginLeft: '6px'
        };
        var top = {
            marginTop:'9px',
            marginBottom:'-15px'
        };
        if (this.state.addPayment) {
            var years = [2017,2018,2019,2020,2021,2022,2023,2024,2025].map(function(year){
                return {
                    label:year.toString(),
                    value:year
                };
            });
            var months = [1,2,3,4,5,6,7,8,9,10,11,12].map(function(month){
                return {
                    label:month.toString(),
                    value:month
                };
            });
            console.log(months);
            return (
                <div>
                    <h3>Add New Payment Method</h3>
                    <input type="text" id='payment-inputs' name = "add-card" placeholder='Credit Card Number' onChange ={this.changeCreditCardValue}/>
                    <input type="text" id='payment-inputs' placeholder='CVV' onChange ={this.changeCVVValue}/>
                    <input type="text" id='payment-inputs' placeholder='Address'/>
                    <div style={top}>
                        <SimpleSelect style={position} onValueChange={this.getYearData} options={years} placeholder="Year"></SimpleSelect>
                        <SimpleSelect  style={simpleSelect} onValueChange={this.getMonthData} options={months} placeholder="Month"></SimpleSelect>
                    </div>
                    <br/>
                    <input id='payment-inputs-button' type="button" value="Back" onClick={this.addPayment}/>
                    <input id='payment-inputs-button' type="button" value="Add Card" onClick={this.addNewPayment}/>
                </div>
            )
        } else {
            return (
                <div>
                    <h3>Current Bid: ${this.props.auctionData[0].top_bid}</h3>
                    <input type="text" id='payment-inputs' placeholder='Name' onChange ={this.changeNameValue}/>
                    <input type="text" id='payment-inputs' placeholder='Credit Card Number' onChange ={this.changeCreditCardValue}/>
                    <input type="text" id='payment-inputs' placeholder='CVV' onChange={this.changeCVVValue}/>
                    <input type="text" id='payment-inputs' placeholder='Bid' onChange={this.changeBidValue}/>
                    <br/>
                    <input id='payment-inputs-button' type="button" value="Add Card" onClick={this.addPayment}/>
                    <input id='payment-inputs-button' type="button" value="Place Bid" onClick={this.changeBidData}/>
                </div>
            )
        }
    }
}

export default PaymentWindow;
