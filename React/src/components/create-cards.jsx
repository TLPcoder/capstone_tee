'use strict';
import React, {Component} from 'react';

class CreateCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        var center ={
            textAlign: 'center'
        };
        var textDecoration = {
            textDecoration:'none',
            color: '#4CAF50'
        };
        if(this.props.dataAuction.top_bid){
            console.log("shit");
        }

        if (this.props.dataAuction.auction_id && this.props.dataAuction.top_bid) {
            var url = `http://localhost:8080/#/courseAuction/${this.props.dataAuction.auction_id}`;
            return (
                <div>
                    <img className = "courseImage" src={this.props.dataAuction.image} alt="" height="300px" width="300px"/>
                    <a href={url} style={textDecoration}>
                        <p style={center}>{this.props.dataAuction.name} Current Bid: ${this.props.dataAuction.top_bid}</p>
                    </a>
                </div>
            )
        } else if(this.props.dataAuction.id && this.props.dataAuction.top_bid){
            var url = `http://localhost:8080/#/courseAuction/${this.props.dataAuction.id}`;
            return (
                <div>
                    <img className = "courseImage" src={this.props.dataAuction.image} alt="" height="300px" width="300px"/>
                    <a href={url} style={textDecoration}>
                        <p style={center}>{this.props.dataAuction.name} Current Bid: ${this.props.dataAuction.top_bid}</p>
                    </a>
                </div>
            )
        }else {
            return (
                <div>
                    <img className = "courseImage" src={this.props.data.image} alt="" height="300px" width="300px"/>
                    <p>{this.props.data.name}</p>
                </div>
            )
        }
    }
}

export default CreateCard;
