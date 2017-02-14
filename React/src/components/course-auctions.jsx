'use strict';
import React, {Component} from 'react';
import MainNav from './nav-main';
import AuctionImage from './course-auction-img';
import BiddingBox from './course-auction-bidding-box';
import CourseAuctionBody from './course-auction-body';
import Comments from './comments'
import StarRating from 'react-star-rating';

class CourseAuction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            courseComments: [],
            run: false
        };
        this.fetchInfo = this.fetchInfo.bind(this);
        this.getComments = this.getComments.bind(this);
        this.rating = this.rating.bind(this);
        this.getUser = this.getUser.bind(this);
        this.fetchInfo();
    }
    fetchInfo() {
        fetch(`http://localhost:3000/auction/${this.props.params.id}`).then((promise) => {
            return promise.json();
        }).then((json) => {
            console.log("course info", json);
            this.setState({
                loading: false,
                data: json,
                run:true
            });
        });
    }
    getComments() {
        fetch(`http://localhost:3000/course/${this.state.data[0].course_id}/comments`).then((promise) => {
            return promise.json();
        }).then((json) => {
            console.log(json);
            this.setState({
                courseComments: json,
                run:false
            });
        });
    }
    rating(){
        var ratings = 0;
        var numberOfRatings = 0;
        this.state.courseComments.forEach((rating)=>{
            numberOfRatings++;
            ratings += rating.rating;
        });
        ratings = ratings / numberOfRatings;
        return ratings;
    }
    getUser() {
        return sessionStorage.getItem('golfMember');
    }
    render() {
        var rating = this.rating();

        if(this.state.run){
                this.getComments();
        }
        var comments = this.state.courseComments.map((commentInfo)=>{
            return <Comments comments={commentInfo}/>
        });
        console.log("comments", this.state.courseComments);
        console.log("auction info", this.state.data);

        if (this.state.loading) {
            return (
                <div></div>
            )
        } else if(this.state.data[0].owner_id === this.getUser()*1){
            return (
                <div id = "auction-container">
                    <div id = "auction-background"></div>
                    <MainNav/>
                    <div id = "auction-body-container">
                        <AuctionImage image={this.state.data[0].image}/>
                        <BiddingBox owner={true} data = {this.state.data[0]}/>
                        <div className = "auction-rating">Course Rating:
                            <StarRating name="course-rating" caption='' rating={rating} size={17}/>
                        </div>
                        <CourseAuctionBody data = {this.state.data[0]}/>
                    </div>
                    <div className = "auction-comments">
                        {comments}
                    </div>
                </div>
            )
        }else {
            return (
                <div id = "auction-container">
                    <div id = "auction-background"></div>
                    <MainNav/>
                    <div id = "auction-body-container">
                        <AuctionImage image={this.state.data[0].image}/>
                        <BiddingBox data = {this.state.data[0]}/>
                        <div className = "auction-rating">Course Rating:
                            <StarRating name="course-rating" caption='' rating={rating} size={17}/>
                        </div>
                        <CourseAuctionBody data = {this.state.data[0]}/>
                    </div>
                    <div className = "auction-comments">
                        {comments}
                    </div>
                </div>
            )
        }
    }
}

export default CourseAuction;
