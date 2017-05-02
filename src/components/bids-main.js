'use strict';
import React, {Component} from 'react';
import MainNav from './nav-main';
import GridDisplay from './grid-display';

class BidsMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bidData: []
        };
        this.getBidData = this.getBidData.bind(this);
        this.getUserId = this.getUserId.bind(this);
    }
    componentWillMount(){
        this.getBidData();
    }
    getUserId() {
        var data = sessionStorage.getItem('golfMember');
        return data;
    }
    getBidData() {
        var bidURL = `http://localhost:8080/user/bids/${this.getUserId()}`;
        fetch(bidURL).then((promise) => {
            return promise.json();
        }).then((json) => {
            this.setState({bidData: json});
        });
    }
    render() {
        if (this.state.bidData) {
            return (
                <div>
                    <div id = 'bids-background-image'></div>
                    <MainNav/>
                    <div>
                        <GridDisplay courseData={this.state.bidData}/>
                    </div>
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }
    }
}

export default BidsMain;
