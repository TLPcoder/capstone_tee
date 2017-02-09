'use strict';
import React, {Component} from 'react';
import ReactSelectize from "react-selectize";
import CreateCourseForm from "./create-course-form";
var SimpleSelect = ReactSelectize.SimpleSelect;

class AutoSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseNames: [],
            course_name: null,
            course_id: null,
            tee_time: null,
            auction_ends: null,
            top_bid: null,
            createCourse: false
        };
        this.getCourseNames = this.getCourseNames.bind(this);
        this.courseValue = this.courseValue.bind(this);
        this.teeTime = this.teeTime.bind(this);
        this.auctionEnds = this.auctionEnds.bind(this);
        this.startingBid = this.startingBid.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.getUserId = this.getUserId.bind(this);
        this.createAuction = this.createAuction.bind(this);
        this.createBid = this.createBid.bind(this);
        this.getCourseNames();
    }
    getCourseNames() {
        fetch(`http://localhost:3000/auction/course/name/id`).then((promise) => {
            return promise.json();
        }).then((json) => {
            this.setState({
                courseNames: json,
                course_name: this.state.course_name,
                course_id: this.state.course_id,
                tee_time: this.state.tee_time,
                auction_ends: this.state.auction_ends,
                top_bid: this.state.top_bid,
                createCourse: this.state.createCourse
            });
        });
    }
    courseValue(value) {
        console.log("course value", value);
        this.setState({
            courseNames: this.state.courseNames,
            course_name: value.label,
            course_id: value.value,
            tee_time: this.state.tee_time,
            auction_ends: this.state.auction_ends,
            top_bid: this.state.top_bid,
            createCourse: this.state.createCourse
        });
    }
    teeTime(event) {
        var date = (event.target.value);
        date = date.split('T');
        var formatedDate = this.formatDate(date[0]);
        formatedDate = `${formatedDate} ${date[1]}:00 UTC`;
        console.log("teetime", formatedDate);
        this.setState({
            courseNames: this.state.courseNames,
            course_name: this.state.course_name,
            course_id: this.state.course_id,
            tee_time: formatedDate,
            auction_ends: this.state.auction_ends,
            top_bid: this.state.top_bid,
            createCourse: this.state.createCourse
        });
    }
    auctionEnds(event) {
        var date = this.formatDate(event.target.value);
        console.log("auction time", event.target.value);
        date = `${date} 24:00:00 UTC`;
        console.log(date);
        this.setState({
            courseNames: this.state.courseNames,
            course_name: this.state.course_name,
            course_id: this.state.course_id,
            tee_time: this.state.tee_time,
            auction_ends: date,
            top_bid: this.state.top_bid,
            createCourse: this.state.createCourse
        });
    }
    startingBid(event) {
        console.log("bid", event.target.value);
        this.setState({
            courseNames: this.state.courseNames,
            course_name: this.state.course_name,
            course_id: this.state.course_id,
            tee_time: this.state.tee_time,
            auction_ends: this.state.auction_ends,
            top_bid: event.target.value,
            createCourse: this.state.createCourse
        });
    }
    createCourse(){
        console.log("hello there bitch")
        var createCourse = !this.state.createCourse;
        this.setState({
            courseNames: this.state.courseNames,
            course_name: this.state.course_name,
            course_id: this.state.course_id,
            tee_time: this.state.tee_time,
            auction_ends: this.state.auction_ends,
            top_bid: this.state.top_bid,
            createCourse: createCourse
        });
        this.getCourseNames();
    }
    createAuction() {
        fetch(`http://localhost:3000/auction/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                course_id: this.state.course_id,
                owner_id: this.getUserId(),
                top_bid: this.state.top_bid,
                tee_time: this.state.tee_time,
                auction_ends: this.state.auction_ends
            })
        }).then((res) => {
            return res.json();
        }).then((resData) => {
            console.log(resData);
            this.createBid(resData);
        }).catch(function(res) {
            console.log(res);
        });
    }
    createBid(data){
        var bider_id = this.getUserId();
        var auction_id = data[0].id;
        var bid_amount = data[0].top_bid;
        fetch(`http://localhost:3000/payment/newBid`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                bider_id: bider_id,
                auction_id: auction_id,
                bid_amount:bid_amount})
        }).then((promise) => {
            return promise.json();
        }).then((json) => {
            console.log("created new Bid", json);
        });
    }
    getUserId(){
        var data = sessionStorage.getItem('golfMember');
        return data;
    }
    formatDate(date) {
        var splitString = date.split('-');
        var format = splitString.map(function(e, index) {
            console.log(index);
            if (index > 0 || index > 2) {
                e = e * 1;
                if (e > 10) {
                    e -= 1;
                    return e.toString();
                } else {
                    e -= 1;
                    e = e.toString();
                    e = '0' + e;
                    return e;
                }
            }
            return e;
        });
        return (format.join('-'));
    }
    render() {
        var divKey = 0;
        divKey++;
        console.log("course id", this.state.course_id);
        var key = 0;
        var simpleSelect = {
            fontFamily:'Arial, Helvetica, sans-serif',
            width: '210px',
            top:'10px',
            left: '100px',
            color:'brown',
            backgroundColor:'white'
        };
        var color = {
            color:'brown'
        };
        var options = this.state.courseNames.map((course) => {
            return {label: course.course_name, value: course.course_id};
        });
        if (!this.state.courseNames) {
            return (
                <div></div>
            )
        }
        if (this.state.courseNames && this.state.createCourse) {
            return (
                <div key = {divKey}>
                    <CreateCourseForm createCourse = {this.createCourse}/>
                </div>
            )
        }
        if (this.state.courseNames) {
            return (
                <div className = "create-auction-box-container" key = {divKey}>
                    <SimpleSelect style={simpleSelect}className = "create-auction-inputs create-auction-drop-down" onValueChange={this.courseValue} options={options} placeholder="Select a Course"></SimpleSelect>
                    <br/>
                    <input style={color} className = "create-auction-inputs create-auction-tee-time" type="datetime-local" name="" id="" onChange={this.teeTime}/>
                    <br/>
                    <input style={color} className = "create-auction-inputs create-auction-auction-ends" type="date" name="" id="" onChange={this.auctionEnds}/>
                    <br/>
                    <input style={color} className = "create-auction-inputs create-auction-starting-bid" type="text" name="" id="" placeholder="Starting Bid" onChange={this.startingBid}/>
                    <br/>
                    <br/>
                    <input className = "create-auction-inputs create-auction-buttons create-auction-buttons-left" type="button" value = "Create Course" onClick={this.createCourse}/>
                    <input className = "create-auction-inputs create-auction-buttons" type="button" value="Create Auction" onClick = {this.createAuction}/>
                </div>
            )
        }
    }
}

export default AutoSelect;
