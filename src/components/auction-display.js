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
    }
    componentWillMount(){
        this.getWindowData();
    }
    getWindowData() {
        var url = this.props.url;
        fetch(url).then((promise) => {
            return promise.json();
        }).then((json) => {
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
        console.log(this.state)
        var allAuctions = [];
        var style;
        if(json.length >= 3){
            console.log('length',json.length);
            style = {
                'width':'945px',
                'position':'relative',
                'top':'200px',
                'margin':'auto'
            };
        }else if(json.length === 2){
            console.log('length',json.length);
            style = {
                'width':'625px',
                'position':'relative',
                'top':'200px',
                'margin':'auto'
            };
        }else{
            console.log('length',json.length);
            style = {
                'width':'300px',
                'position':'relative',
                'top':'200px',
                'margin':'auto'
            };
        }
        json.forEach((auction) =>{
            if(auction.owner_id !== this.getUser() * 1 || this.props.run){;
                console.log(this.getUser());
                allAuctions.push(auction);
            }
        });
        var all = allAuctions.map(function(element) {
            key++;
                return (
                    <div className = "auction-Card"><CreateCard key={key} dataAuction={element}/></div>
                )
        })
        if(!this.state.json.length){
            return (
                <div>
                </div>
            )
        }
        return(
            <div style = {style}>
                {all}
            </div>
        )
    }
}

export default DisplayAuctions;
