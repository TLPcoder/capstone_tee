'use strict';
import React, {Component} from 'react';
import CreateCard from './create-cards';

class DisplayWindow extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: '...loading',
            json: []
        };
        this.getWindowData = this.getWindowData.bind(this);
        this.getJson = this.getJson.bind(this);
        this.getWindowData();
    }
    getWindowData(){
        var url = this.props.url;
        fetch(url)
        .then((promise) =>{
            return promise.json();
        }).then((json) =>{
            this.setState({
                json:json
            });
            this.getJson();
        });
    }
    getJson(){
        console.log("state", this.state.json);
    }
    render(){
        var key = 0;
        var json = this.state.json;
        var all = json.map(function(element){
            key++;
            if(element.auction_id){
                return (
                    <li><CreateCard key = {key} dataAuction={element}/></li>
                )
            }
            if(element.id){
                return (
                    <li><CreateCard key = {key} dataAuction={element}/></li>
                )
            }else{
                return (
                    <li><CreateCard key = {key} data={element}/></li>
                )
            }
        })
        if(!json.length){
            return (<h1></h1>)
        }
        return(
            <div>
                <div>{all}</div>
            </div>
        )
    }
}

export default DisplayWindow;
