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
                color: '#4caf50',
                fontSize: '15px'
            };
        }else{
            center = {
                textAlign: 'center',
                color: 'white',
                fontSize: '15px'
            };
        }
        var textDecoration = {
            textDecoration: 'none',
            color: '#4CAF50'
        };
        var bidBoarder = {
            border: 'solid 2px red'
        };
        if (this.props.dataAuction.top_bid) {
            console.log("shit");
        }
        if (this.props.dataAuction.auction_id && this.props.dataAuction.top_bid && this.props.dataAuction.max < this.props.dataAuction.top_bid) {
            console.log("skljflksadjf;klafjkl;asjfl;ksadjf;lkadsjf;", this.props.dataAuction);
            var url = `http://localhost:8080/#/courseAuction/${this.props.dataAuction.auction_id}`;
            return (
                <div className="card">
                    <img style={bidBoarder} className="courseImage" src={this.props.dataAuction.image} alt="" height="300px" width="300px"/>
                    <a href={url} style={textDecoration}>
                        <p style={center}>{this.props.dataAuction.name}
                            Current Bid: ${this.props.dataAuction.top_bid}</p>
                    </a>
                </div>
            )
        } else if (this.props.dataAuction.id && this.props.dataAuction.top_bid && this.props.dataAuction.max < this.props.dataAuction.top_bid) {
            var url = `http://localhost:8080/#/courseAuction/${this.props.dataAuction.id}`;
            return (
                <div className="card">
                    <img style={bidBoarder} className="courseImage" src={this.props.dataAuction.image} alt="" height="300px" width="300px"/>
                    <a href={url} style={textDecoration}>
                        <p style={center}>{this.props.dataAuction.name}
                            Current Bid: ${this.props.dataAuction.top_bid}</p>
                    </a>
                </div>
            )
        } else if (this.props.dataAuction.course_id && this.props.dataAuction.max < this.props.dataAuction.top_bid) {
            var courseURL = `http://localhost:8080/#/course/${this.props.dataAuction.course_id}`
            return (
                <div className="card">
                    <a href={courseURL}>
                        <img style={bidBoarder} className="courseImage" src={this.props.dataAuction.image} alt="" height="300px" width="300px"/>
                    </a>
                    <p>{this.props.dataAuction.name}</p>
                </div>
            //------------------------------------------------------------->
            )
        } else if (this.props.dataAuction.auction_id && this.props.dataAuction.top_bid) {
            var url = `http://localhost:8080/#/courseAuction/${this.props.dataAuction.auction_id}`;
            return (
                <div className="card">
                    <img style={border} className="courseImage" src={this.props.dataAuction.image} alt="" height="300px" width="300px"/>
                    <a href={url} style={textDecoration}>
                        <p style={center}>{this.props.dataAuction.name}
                            Current Bid: ${this.props.dataAuction.top_bid}</p>
                    </a>
                </div>
            )
        } else if (this.props.dataAuction.id && this.props.dataAuction.top_bid) {
            var url = `http://localhost:8080/#/courseAuction/${this.props.dataAuction.id}`;
            return (
                <div className="card">
                    <img style={border} className="courseImage" src={this.props.dataAuction.image} alt="" height="300px" width="300px"/>
                    <a href={url} style={textDecoration}>
                        <p style={center}>{this.props.dataAuction.name}
                            Current Bid: ${this.props.dataAuction.top_bid}</p>
                    </a>
                </div>
            )
        } else if (this.props.dataAuction.course_id) {
            var courseURL = `http://localhost:8080/#/course/${this.props.dataAuction.course_id}`
            return (
                <div className="card">
                    <a href={courseURL}>
                        <img style={border} className="courseImage" src={this.props.dataAuction.image} alt="" height="300px" width="300px"/>
                    </a>
                    <p>{this.props.dataAuction.name}</p>
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
