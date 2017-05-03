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
    }
    componentWillMount(){
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
            textAlign: 'center',
            color:'white',
            textDecoration: 'none'
        };
        var style;
        console.log('something',this.state);
        if(this.state.json.length >= 3){
            style = {
                'width':'937px',
                'position':'relative',
                'top':'200px',
                'margin':'auto'
            };
        }else if(this.state.json.length === 2){
            style = {
                'width':'625px',
                'position':'relative',
                'top':'200px',
                'margin':'auto'
            };
        }else{
            style = {
                'width':'300px',
                'position':'relative',
                'top':'200px',
                'margin':'auto'
            };
        }
        var json = this.state.json;
        var length = json.length;

        var all = json.map(function(element) {
            var url;
            if(element.course_id){
                url = `http://localhost:8080/#/course/${element.course_id}`;
            }else{
                url = `http://localhost:8080/#/course/${element.id}`;
            }
            key++;
                return (
                    <div className = "card">
                        <div className = "shadowCard">
                        <a style={center}href={url}>
                        <img className = 'course-search-imgs'src={element.image} alt="" height="300px" width="300px"/>
                        </a>
                        </div>
                        <p style={center}>{element.name}</p>
                    </div>
                )
        })
        if(!this.state.json.length){
            return (
                <div></div>
            )
        }
        return(
            <div style = {style}>
                {all}
            </div>
        )
    }
}

export default DisplaySearch;
