'use strict';
import React, {Component} from 'react';

class CreateCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var border = {
            border: 'solid 1px #b9bcc5'
        };
        var center;
        if (this.props.profile) {
            center = {
                textAlign: 'center',
                color: 'brown',
                fontSize: '15px'
            };
        } else {
            center = {
                textAlign: 'center',
                color: 'brown',
                fontSize: '15px'
            };
        }
        var textDecoration = {
            textDecoration: 'none',
            color: 'white'
        };

        var teeTime;
        if (this.props.dataAuction.tee_time) {
            var time = this.props.dataAuction.tee_time.slice(11, 13) > 12;
            if (time) {
                teeTime = (this.props.dataAuction.tee_time.slice(11, 13) * 1 - 12).toString() + this.props.dataAuction.tee_time.slice(this.props.dataAuction.tee_time.indexOf('T') + 3, this.props.dataAuction.tee_time.length - 8) + 'pm';
            } else {
                teeTime = (this.props.dataAuction.tee_time.slice(11, 13) * 1).toString() + this.props.dataAuction.tee_time.slice(this.props.dataAuction.tee_time.indexOf('T') + 3, this.props.dataAuction.tee_time.length - 8) + 'am';
            }

            var auctionEnds = this.props.dataAuction.auction_ends.slice(0, this.props.dataAuction.auction_ends.indexOf('T'));
        }


        var bidBoarder = {
            border: 'solid 2px red'
        };
        if (this.props.dataAuction.top_bid) {
            console.log("shit");
        }
        console.log("check this shit out", this.props.dataAuction)
        if (this.props.dataAuction.auction_id && this.props.dataAuction.top_bid && this.props.dataAuction.bid_amount < this.props.dataAuction.top_bid) {
            console.log("skljflksadjf;klafjkl;asjfl;ksadjf;lkadsjf;", this.props.dataAuction);
            var url = `http://localhost:8080/#/courseAuction/${this.props.dataAuction.auction_id}`;
            return (
                <div className="card-auction">
                    <a href={url}>
                        <div className="card-image-hover">
                            <img style={bidBoarder} className="courseImage" src={this.props.dataAuction.image} alt="" height="300px" width="300px"/>
                        </div>
                        <p style={center}>{this.props.dataAuction.name}
                            Current Bid: ${this.props.dataAuction.top_bid}</p>
                        <p style={center}>
                            Tee Time: {teeTime} on {this.props.dataAuction.tee_time.slice(0, this.props.dataAuction.tee_time.indexOf('T'))}</p>
                        <p style={center}>Auction Ends: Midnight on {auctionEnds}</p>
                    </a>
                </div>
            )
        } else if (this.props.dataAuction.id && this.props.dataAuction.top_bid && this.props.dataAuction.bid_amount < this.props.dataAuction.top_bid) {
            var url = `http://localhost:8080/#/courseAuction/${this.props.dataAuction.id}`;
            return (
                <div className="card-auction">
                    <a href={url}>
                        <img style={bidBoarder} className="courseImage" src={this.props.dataAuction.image} alt="" height="300px" width="300px"/>
                        <p style={center}>{this.props.dataAuction.name}
                            Current Bid: ${this.props.dataAuction.top_bid}</p>
                        <p style={center}>Tee Time: {teeTime} on {this.props.dataAuction.tee_time.slice(0, this.props.dataAuction.tee_time.indexOf('T'))}</p>
                        <p style={center}>Auction Ends: Midnight on {auctionEnds}</p>
                    </a>
                </div>
            )
        } else if (this.props.dataAuction.course_id && this.props.dataAuction.bid_amount < this.props.dataAuction.top_bid) {
            var courseURL = `http://localhost:8080/#/course/${this.props.dataAuction.course_id}`
            return (
                <div className="card-auction">
                    <a href={courseURL}>
                        <img style={bidBoarder} className="courseImage" src={this.props.dataAuction.image} alt="" height="300px" width="300px"/>
                        <p style={center}>{this.props.dataAuction.name}</p>
                        <p style={center}>Tee Time: {teeTime} on {this.props.dataAuction.tee_time.slice(0, this.props.dataAuction.tee_time.indexOf('T'))}</p>
                        <p style={center}>Auction Ends: Midnight on {auctionEnds}</p>
                    </a>
                </div>
            //------------------------------------------------------------->
            )
        } else if (this.props.dataAuction.auction_id && this.props.dataAuction.top_bid) {
            var url = `http://localhost:8080/#/courseAuction/${this.props.dataAuction.auction_id}`;
            return (
                <div className="card-auction">
                    <a href={url}>
                        <img style={border} className="courseImage" src={this.props.dataAuction.image} alt="" height="300px" width="300px"/>
                        <p style={center}>{this.props.dataAuction.name}
                            Current Bid: ${this.props.dataAuction.top_bid}</p>
                        <p style={center}>Tee Time: {teeTime} on {this.props.dataAuction.tee_time.slice(0, this.props.dataAuction.tee_time.indexOf('T'))}</p>
                        <p style={center}>Auction Ends: Midnight on {auctionEnds}</p>
                    </a>
                </div>
            )
        } else if (this.props.dataAuction.id && this.props.dataAuction.top_bid) {
            var url = `http://localhost:8080/#/courseAuction/${this.props.dataAuction.id}`;
            return (
                <div className="card-auction">
                    <a href={url}>
                        <img style={border} className="courseImage" src={this.props.dataAuction.image} alt="" height="300px" width="300px"/>
                        <p style={center}>{this.props.dataAuction.name}
                            Current Bid: ${this.props.dataAuction.top_bid}</p>
                        <p style={center}>Tee Time: {teeTime} on {this.props.dataAuction.tee_time.slice(0, this.props.dataAuction.tee_time.indexOf('T'))}</p>
                        <p style={center}>Auction Ends: Midnight on {auctionEnds}</p>
                    </a>
                </div>
            )
        } else if (this.props.dataAuction.course_id) {
            var courseURL = `http://localhost:8080/#/course/${this.props.dataAuction.course_id}`
            return (
                <div className="card">
                    <a style={textDecoration} href={courseURL}>
                        <img style={border} className="courseImage" src={this.props.dataAuction.image} alt="" height="300px" width="300px"/>
                        <p>{this.props.dataAuction.name}</p>
                    </a>
                </div>
            )
        } else {
            return (
                <div>
                    <img style={border} className="courseImage" src={this.props.data.image} alt="" height="300px" width="300px"/>
                    <p>{this.props.data.name}</p>
                </div>
            )
        }
    }
}

export default CreateCard;
