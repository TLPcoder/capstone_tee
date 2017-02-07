'use strict';
import React, {Component} from 'react';
import CreateCard from './create-cards';

class DisplaySearch extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: '...loading',
            json: []
        };
        this.getWindowData = this.getWindowData.bind(this);
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
    render(){
        var key = 0;
        var center = {
            textAlign: 'center'
        };
        var json = this.state.json;
        console.log("json", json);
        var length = json.length;
        var all = json.map(function(element) {
            var url = `http://localhost:8080/#/course/${element.id}`
            key++;
                return (
                    <div>
                        <img src={element.image} alt="" height="300px" width="300px"/>
                        <p style={center}><a href={url}>{element.name}</a></p>
                    </div>
                )
        })
        if(!this.state.json.length){
            return (
                <div></div>
            )
        }
        return(
            <div>
                {all}
            </div>
        )
    }
}

export default DisplaySearch;
