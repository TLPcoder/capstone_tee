'use strict';
import React, {Component} from 'react';
import ReactSelectize from "react-selectize";
var SimpleSelect = ReactSelectize.SimpleSelect;
import Allstate from './states';
import Countries from './countries';

class CreateCourseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: '',
            state: '',
            city: '',
            zip: 94030,
            image: '',
            course_name: '',
            address: '',
            description: ''
        };
        this.countryValue = this.countryValue.bind(this);
        this.stateValue = this.stateValue.bind(this);
    }
    stateValue(value) {
        this.setState({
            country: this.state.country,
            state: value.value,
            city: this.state.city,
            zip: this.state.zip,
            image: this.state.image,
            course_name: this.state.course_name,
            address: this.state.address,
            description: this.state.description
        });
    }
    countryValue(value) {
        this.setState({
            country: value.value,
            state: this.state.state,
            city: this.state.city,
            zip: this.state.zip,
            image: this.state.image,
            course_name: this.state.course_name,
            address: this.state.address,
            description: this.state.description
        });
    }
    render() {
        var states = Allstate()
        var countries = Countries();
        if (this.state.country === "United States") {
            return (
                <div>
                    <input type="text" name="name" id="" placeholder='Course Name'/>
                    <input type="text" name="image url" id="" placeholder='Image URL'/>
                    <input type="text" name="address" id="" placeholder='Address'/>
                    <SimpleSelect onValueChange={this.countryValue} options={countries} placeholder="Select Country"></SimpleSelect>
                    <SimpleSelect onValueChange={this.stateValue} options={states} placeholder="Select State"></SimpleSelect>
                    <input type="text" name="city" id="" placeholder='City'/>
                    <input type="text" name="zip" id="" placeholder='Zip Code'/>
                    <label htmlFor="">Description</label>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <input type="button" value="Create Course"/>
                </div>
            )
        } else {
            return (
                <div>
                    <input type="text" name="name" id="" placeholder='Course Name'/>
                    <input type="text" name="Image url" id="" placeholder='image URL'/>
                    <input type="text" name="address" id="" placeholder='Address'/>
                    <SimpleSelect onValueChange={this.countryValue} options={countries} placeholder="Select Country"></SimpleSelect>
                    <input type="text" name="city" id="" placeholder='City'/>
                    <input type="text" name="zip" id="" placeholder='Zip Code'/>
                    <label htmlFor="">Description</label>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <input type="button" value="Create Course"/>
                </div>
            )
        }
    }
}

export default CreateCourseForm;
