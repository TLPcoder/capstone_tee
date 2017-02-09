'use strict';
import React, {Component} from 'react';
import SearchInfo from './auction-search-info';
import MainNav from './nav-main';
import DisplaySearch from './display-search';

class SearchCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchData: [],
            url: `http://localhost:3000/course`,
            key: 0,
        };
        this.updateSearchData = this.updateSearchData.bind(this);
        this.changeURl = this.changeURl.bind(this);
        this.returnURL = this.returnURL.bind(this);
    }

    updateSearchData(data) {
        this.changeURl(data);
    }
    changeURl(data) {
        if (data) {
            this.setState({
                searchData: data,
                url: this.returnURL(data),
                key: this.state.key + 1,
            });
        } else {
            return;
        }
    }

    returnURL(data){
        var location = data.location.run;
        var name = data.courseName.name;
        console.log("data is here", data)
        if(name){
            return `http://localhost:3000/course/${name}`
        }else if(data.location.type === 'zip'){
            return `http://localhost:3000/course/zip/${data.location.value}/${data.location.radius}`;
        }else if(location){
            return `http://localhost:3000/course/${data.location.type}/${data.location.value}`;
        }else if(data.course_id){
            return `http://localhost:3000/course/${data.course_id}`;
        }else{
            location ? location = data.location.type : location = 'United States';
            return `http://localhost:3000/course/country/${location}`;
        }
    }
    render() {
        return (
            <div>
                <div id = "search-course-background-image"></div>
                <MainNav/>
                <div id = 'search-course-search-box'>
                    <SearchInfo updateSearchData={this.updateSearchData} courseSearch={true}/>
                </div>
                <div id = 'search-course-display'>
                    <DisplaySearch url={this.state.url} key={this.state.key}/>
                </div>
            </div>
        )
    }
}
export default SearchCourse;
