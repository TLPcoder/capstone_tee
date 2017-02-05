'use strict';
import React, {Component} from 'react';
import SearchInfo from './auction-search-info';
import DisplayAuctions from './auction-display';

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
            console.log('should rerender')
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
        var sortByDate = null;
        var location = data.location.run;
        var price = data.priceSort.run;
        var name = data.courseName;
        price ? price = data.priceSort.type : price = 'asc';
        if(data.location.type === 'zip'){
            return `http://localhost:3000/tee_time/${data.location.value}/${data.location.radius}/asc/${price}`
        }else if(location){
            return `http://localhost:3000/tee_time/${data.location.type}/${data.location.value}/asc/${price}`;
        }else{
            location ? location = data.location.type : location = 'United States';
            return `http://localhost:3000/tee_time/country/${location}/asc/${price}`;
        }
    }
    render() {
        console.log("state main", this.state);
        return (
            <div>
                <SearchInfo updateSearchData={this.updateSearchData}/>
                <DisplayAuctions key ={this.state.key} url={this.state.url}/>
            </div>
        )
    }
}
export default AuctionSearch;
