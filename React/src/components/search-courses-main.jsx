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
        var name = data.courseName;
        if(data.location.type === 'zip'){
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
        console.log("hellllllllloooooo thhhhhheeerrreeee",this.state);
        console.log("state main", this.state);
        return (
            <div>
                <MainNav/>
                <SearchInfo updateSearchData={this.updateSearchData} courseSearch={true}/>
                <DisplaySearch url={this.state.url} key={this.state.key}/>
            </div>
        )
    }
}
export default SearchCourse;