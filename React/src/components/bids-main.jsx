'use strict';
import React, {Component} from 'react';
import MainNav from './nav-main'

class BidsMain extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <MainNav/>
                <h1>Bids</h1>
            </div>
        )
    }
}

export default BidsMain;
