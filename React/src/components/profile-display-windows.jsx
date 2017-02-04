'use strict';
import React, {Component} from 'react';
import CreateCard from './create-cards';

class DisplayWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: '...loading',
            json: []
        };
        this.getWindowData = this.getWindowData.bind(this);
        this.getJson = this.getJson.bind(this);
        this.getWindowData();
    }
    getWindowData() {
        var url = this.props.url;
        fetch(url).then((promise) => {
            return promise.json();
        }).then((json) => {
            this.setState({json: json});
            this.getJson();
        });
    }
    getJson() {
        console.log("state", this.state.json);
    }
    render() {
        console.log("category", this.props.category);
        var threeOrMoreCards = {
            width: '89%',
            margin: 'auto'
        };
        var twoCards = {
            width: '60%',
            margin: 'auto'
        };
        var oneCard = {
            width: '60%',
            margin: 'auto'
        };
        var key = 0;
        var json = this.state.json;
        console.log("length", json.length);
        var length = json.length;
        var all = json.map(function(element) {
            key++;
            if (element.auction_id) {
                return (
                    <li><CreateCard key={key} dataAuction={element}/></li>
                )
            }
            if (element.id) {
                return (
                    <li><CreateCard key={key} dataAuction={element}/></li>
                )
            } else {
                return (
                    <li><CreateCard key={key} data={element}/></li>
                )
            }
        })
        if (!json.length) {
            return (
                <h1></h1>
            )
        }
        if(length === 0){
            return(
                <div></div>
            )
        }
        if (length === 1) {
            return (
                <div>
                    <h1>{this.props.category}</h1>
                    <div style ={oneCard} className="profile-bids">
                        <ul>
                            <div>{all}</div>
                        </ul>
                    </div>
                </div>
            )
        }else if (length === 2) {
            return(
                <div>
                    <h1>{this.props.category}</h1>
                    <div style ={twoCards} className="profile-bids">
                        <ul>
                            <div>{all}</div>
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>{this.props.category}</h1>
                    <div style ={threeOrMoreCards} className="profile-bids">
                        <ul>
                            <div>{all}</div>
                        </ul>
                    </div>
                </div>
            )
        }
    }
}

export default DisplayWindow;
