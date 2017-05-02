'use strict';
import React, {Component} from 'react';
import AutoSelect from './auto-select';
import MainNav from './nav-main'

class CreateAuction extends Component {
    constructor(props) {
        super(props);

    }
    render() {
            return (
                <div id = 'create-auction-container'>
                    <MainNav/>
                    <div className = "create-auction-body-container">
                        <AutoSelect/>
                    </div>
                </div>
            )
    }
}

export default CreateAuction;
