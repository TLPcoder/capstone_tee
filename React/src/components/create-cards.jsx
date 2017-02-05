'use strict';
import React, {Component} from 'react';

class CreateCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log("image url", this.props.dataAuction.image)
        var center ={
            textAlign: 'center'
        };
        // if(!this.props.dataAuction.image){
        //     console.log("shit");
        //     return (<div></div>)
        // }
        if (this.props.dataAuction.auction_id) {
            var url = `http://localhost:8080/#/courseAuction/${this.props.dataAuction.auction_id}`;
            return (
                <div>
                    <img className = "courseImage" src={this.props.dataAuction.image} alt="" height="300px" width="300px"/>
                    <a href={url}>
                        <p style={center}>{this.props.dataAuction.name}</p>
                    </a>
                </div>
            )
        } else if(this.props.dataAuction.id){
            var url = `http://localhost:8080/#/courseAuction/${this.props.dataAuction.id}`;
            return (
                <div>
                    <img className = "courseImage" src={this.props.dataAuction.image} alt="" height="300px" width="300px"/>
                    <a href={url}>
                        <p style={center}>{this.props.dataAuction.name}</p>
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
