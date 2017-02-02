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
        console.log('url', this.props.url);
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
            console.log("hello", element);
            key++;
            return <CreateCard key = {key} data={element}/>
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
