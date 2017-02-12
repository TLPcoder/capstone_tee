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
            textAlign: 'center',
            color:'white',
            textDecoration: 'none'
        };
        var json = this.state.json;
        var length = json.length;
        console.log("all courses", json);
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
            <div>
                {all}
            </div>
        )
    }
}

export default DisplaySearch;
