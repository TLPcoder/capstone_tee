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
            key: 0,
            yourAuctions: false
        };
        this.updateSearchData = this.updateSearchData.bind(this);
        this.changeURl = this.changeURl.bind(this);
        this.returnURL = this.returnURL.bind(this);
        this.yourAuctions = this.yourAuctions.bind(this);
        this.getUser = this.getUser.bind(this);
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
    getUser() {
        return sessionStorage.getItem('golfMember');
    }
    yourAuctions() {
        if (!this.state.yourAuctions) {
            var user = this.getUser();
            this.setState({yourAuctions: true,
                url: `http://localhost:3000/user/auctions/${user}`,
                key: this.state.key + 1
            });
        }else{
            this.setState({
                yourAuctions: false,
                url: `http://localhost:3000/auction`,
                key: this.state.key + 1
            });
        }
    }
    returnURL(data) {
        console.log("search data", data);
        var sortByDate = null;
        var location = data.location.run;
        var name = data.courseName.name;
        if (name) {
            return `http://localhost:3000/course/name/id/${name}/asc`;
        } else if (data.location.type === 'zip') {
            console.log("i am here for zip")
            return `http://localhost:3000/tee_time/${data.location.value}/${data.location.radius}/asc/asc`;
        } else if (location) {
            return `http://localhost:3000/tee_time/${data.location.type}/${data.location.value}/asc/asc`;
        } else {
            return `http://localhost:3000/tee_time/country/United States/asc/asc`;
        }
    }
    render() {
        console.log("URL", this.state.url);
        if (this.state.yourAuctions) {
            return (
                <div>
                    <div id="auction-search-background"></div>
                    <MainNav/>
                    <div className="auction-search-search-box">
                        <input type="button" value="Back to Auctions"className="submit-search-button" onClick={this.yourAuctions}/>
                    </div>
                    <div className="auction-search-display-container">
                        <DisplayAuctions run={true} key ={this.state.key} url={this.state.url}/>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div id="auction-search-background"></div>
                <MainNav/>
                <div className="auction-search-search-box">
                    <SearchInfo yourAuctions={this.yourAuctions}updateSearchData={this.updateSearchData} run={true} auctions={this.state.url}/>
                </div>
                <div className="auction-search-display-container">
                    <DisplayAuctions key ={this.state.key} url={this.state.url}/>
                </div>
            </div>
        )
    }
}
export default AuctionSearch;
