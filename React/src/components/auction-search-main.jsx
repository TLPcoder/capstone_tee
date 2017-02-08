'use strict';
import React, {Component} from 'react';
import SearchInfo from './auction-search-info';
import DisplayAuctions from './auction-display';
import MainNav from './nav-main';

class AuctionSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchData: {},
            url: `http://localhost:3000/auction`,
            key: 0
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
                key: this.state.key + 1
            });
        } else {
            return;
        }
    }
    returnURL(data){
        console.log("search data", data);
        var sortByDate = null;
        var location = data.location.run;
        var priceRun = data.priceSort.run;
        var sortBy = data.priceSort.type;
        var name = data.courseName.name;
        var sortType = data.priceSort.type ? sortType = data.priceSort.type : sortType = 'asc';
        console.log("NAME ID ", name);
        if(name){
            return `http://localhost:3000/course/name/id/${name}/${sortType}`
        }else if(data.priceSort.run){
            console.log("sort by something")
            return `http://localhost:3000/auction/sort/by/${sortBy}`
        }
        else if(data.location.type === 'zip'){
            return `http://localhost:3000/tee_time/${data.location.value}/${data.location.radius}/asc/${sortBy}`
        }else  if(location){
            return `http://localhost:3000/tee_time/${data.location.type}/${data.location.value}/asc/${sortBy}`;
        }else{
            location ? location = data.location.type : location = 'United States';
            return `http://localhost:3000/tee_time/country/${location}/asc/${sortBy}`;
        }
    }
    render() {
        console.log("URL", this.state.url);
        return (
            <div>
                <MainNav/>
                <SearchInfo updateSearchData={this.updateSearchData} run={true} auctions={this.state.url}/>
                <DisplayAuctions key ={this.state.key} url={this.state.url}/>
            </div>
        )
    }
}
export default AuctionSearch;
