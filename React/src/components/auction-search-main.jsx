'use strict';
import React, {Component} from 'react';


class AuctionSearch extends Component{
    constructor(props){
        super(props)
        this.state ={
            searchData:{}
        };
        this.updateSearchData = this.updateSearchData.bind(this);
    }
    updateSearchData(data){
        this.setState({
            searchData:data
        });
    }
    render(){
        return(
            <div>

            </div>
        )
    }
}
export default AuctionSearch;
