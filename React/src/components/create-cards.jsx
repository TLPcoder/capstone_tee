'use strict';
import React, {Component} from 'react';

class CreateCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.dataAuction.auction_id) {
            var url = `http://localhost:8080/#/courseAuction/${this.props.dataAuction.auction_id}`;
            return (
                <div>
                    <img src={this.props.dataAuction.image} alt="" height="300px" width="300px"/>
                    <a href={url}>
                        <p>{this.props.dataAuction.name}</p>
                    </a>
                </div>
            )
        } if(this.props.dataAuction.id){
            var url = `http://localhost:8080/#/courseAuction/${this.props.dataAuction.id}`;
            return (
                <div>
                    <img src={this.props.dataAuction.image} alt="" height="300px" width="300px"/>
                    <a href={url}>
                        <p>{this.props.dataAuction.name}</p>
                    </a>
                </div>
            )
        }else {
            return (
                <div>
                    <img src={this.props.data.image} alt="" height="300px" width="300px"/>
                    <p>{this.props.data.name}</p>
                </div>
            )
        }
    }
}

export default CreateCard;
