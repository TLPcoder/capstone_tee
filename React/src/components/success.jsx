'use strict';
import React, {Component} from 'react';
import MainNav from './nav-main';
class Success extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <MainNav/>
                <h1 id = "success-text">You have succesful placed your bid</h1>
            </div>
        )
    }
}

export default Success;
