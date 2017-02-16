'use strict';
import React, {Component} from 'react';
import CreateCard from './create-cards';

class DisplayAuctions extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: '...loading',
            json: []
        };
        this.getWindowData = this.getWindowData.bind(this);
        this.getUser = this.getUser.bind(this);
        this.getWindowData();
    }
    getWindowData() {
        var url = this.props.url;
        fetch(url).then((promise) => {
            return promise.json();
        }).then((json) => {
            console.log("error is found here", json)
            this.setState({
                loading: '...loading',
                json: json
            });
        }).catch(function(err){
            console.log(err);
        });
    }
    getUser() {
        return sessionStorage.getItem('golfMember');
    }
    render(){
        var key = 0;
        var json = this.state.json;
        var positionMargin;
        if(json.length === 1){
            positionMargin = {
                margin:'auto',
                marginTop: '150px',
                marginLeft: '40%'
            };
        }else if(json.length === 2){
            positionMargin = {
                margin:'auto',
                marginTop: '150px',
                marginLeft: '30%'
            };
        }else{
            positionMargin = {
                margin:'auto',
                marginTop: '150px',
                marginLeft: '19%'
            };
        }
        console.log("json", json);
        var length = json.length;
        var allAuctions = [];
        var user = this.getUser();
        json.forEach((auction) =>{
            if(auction.owner_id !== this.getUser() * 1 || this.props.run){;
                console.log(this.getUser());
                allAuctions.push(auction);
            }
        });
        console.log("allAuctions", allAuctions)
        var all = allAuctions.map(function(element) {
            key++;
                return (
                    <div className = "auction-Card"><CreateCard key={key} dataAuction={element}/></div>
                )
        })
        if(!this.state.json.length){
            return (
                <div></div>
            )
        }
        return(
            <div style={positionMargin}>
                {all}
            </div>
        )
    }
}

export default DisplayAuctions;
