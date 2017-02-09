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
        this.createCourse = this.createCourse.bind(this);
        this.courseNameValue = this.courseNameValue.bind(this);
        this.zipValue = this.zipValue.bind(this);
        this.cityValue = this.cityValue.bind(this);
        this.addressValue = this.addressValue.bind(this);
        this.descriptionValue = this.descriptionValue.bind(this);
        this.imageValue = this.imageValue.bind(this);
    }
    stateValue(value) {
        console.log(value.value);
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
    cityValue(event) {
        console.log(event.target.value);
        this.setState({
            country: this.state.country,
            state: this.state.state,
            city: event.target.value,
            zip: this.state.zip,
            image: this.state.image,
            course_name: this.state.course_name,
            address: this.state.address,
            description: this.state.description
        });
    }
    zipValue(event) {
        console.log(event.target.value);
        this.setState({
            country: this.state.country,
            state: this.state.state,
            city: this.state.city,
            zip: event.target.value,
            image: this.state.image,
            course_name: this.state.course_name,
            address: this.state.address,
            description: this.state.description
        });
    }
    imageValue(event) {
        console.log(event.target.value);
        this.setState({
            country: this.state.country,
            state: this.state.state,
            city: this.state.city,
            zip: this.state.zip,
            image: event.target.value,
            course_name: this.state.course_name,
            address: this.state.address,
            description: this.state.description
        });
    }
    courseNameValue(event) {
        console.log(event.target.value);
        this.setState({
            country: this.state.country,
            state: this.state.state,
            city: this.state.city,
            zip: this.state.zip,
            image: this.state.image,
            course_name: event.target.value,
            address: this.state.address,
            description: this.state.description
        });
    }
    addressValue(event) {
        console.log(event.target.value);
        this.setState({
            country: this.state.country,
            state: this.state.state,
            city: this.state.city,
            zip: this.state.zip,
            image: this.state.image,
            course_name: this.state.course_name,
            address: event.target.value,
            description: this.state.description
        });
    }
    descriptionValue(event) {
        console.log(event.target.value);
        this.setState({
            country: this.state.country,
            state: this.state.state,
            city: this.state.city,
            zip: this.state.zip,
            image: this.state.image,
            course_name: this.state.course_name,
            address: this.state.address,
            description: event.target.value
        });
    }
    countryValue(value) {
        console.log(value.value);
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
    createCourse(){
        var country = this.state.country;
        var state = this.state.state;
        var city = this.state.city;
        var zip = this.state.zip;
        var image = this.state.image;
        var name = this.state.course_name;
        var address = this.state.address;
        var description = this.state.description

        fetch(`http://localhost:3000/course/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                country:country,
                state:state,
                city:city,
                zip:zip,
                image:image,
                name:name,
                address:address,
                description:description
                })
        }).then((promise) => {
            return promise.json();
        }).then((json) => {
            console.log("props",this.props);
            this.props.createCourse();
            console.log("created new course", json);
        });
    }
    render() {
        var states = Allstate();
        var countries = Countries();
        var simpleSelect = {
            fontFamily:'Arial, Helvetica, sans-serif',
            width: '210px',
            top:'10px',
            left: '90px',
            color:'brown',
            backgroundColor:'white',
            marginBottom: '10px',
        };
        var color = {
            color:'brown'
        }
        if (this.state.country === "United States") {
            return (
                <div className = "create-course-box-container">
                    <input style={color} className = "create-course-input" type="text" name="name" id="" placeholder='Course Name' onChange = {this.courseNameValue}/>

                    <input style={color} className = "create-course-input" type="text" name="image url" id="" placeholder='Image URL' onChange ={this.imageValue}/>

                    <input style={color} className = "create-course-input" type="text" name="address" id="" placeholder='Address' onChange={this.addressValue}/>

                    <SimpleSelect style={simpleSelect}  className='create-course-select' onValueChange={this.countryValue} options={countries} placeholder="Select Country"></SimpleSelect>

                    <SimpleSelect style={simpleSelect} onValueChange={this.stateValue} options={states} placeholder="Select State"></SimpleSelect>

                    <input style={color} className = "create-course-input" type="text" name="city" id="" placeholder='City' onChange={this.cityValue}/>

                    <input style={color} className = "create-course-input" type="text" name="zip" id="" placeholder='Zip Code' onChange = {this.zipValue}/>
                    <textarea style={color} className = "create-course-input-text-box" placeholder="Description" name="" id="" cols="40" rows="10" onChange={this.descriptionValue}></textarea>
                    <br/>
                    <input className = "create-course-input-button" type="button" value="Back" onClick={this.props.createCourse}/>
                    <input className = "create-course-input-button" type="button" value="Create Course" onClick={this.createCourse}/>
                </div>
            )
        } else {
            return (
                <div className = "create-course-box-container">
                    <input style={color} className = "create-course-input" type="text" name="name" id="" placeholder='Course Name' onChange = {this.courseNameValue}/>

                    <input style={color} className = "create-course-input" type="text" name="image url" id="" placeholder='Image URL' onChange ={this.imageValue}/>

                    <input style={color} className = "create-course-input" type="text" name="address" id="" placeholder='Address' onChange={this.addressValue}/>

                    <SimpleSelect style={simpleSelect} onValueChange={this.countryValue} options={countries} placeholder="Select Country"></SimpleSelect>

                    <input style={color} className = "create-course-input" type="text" name="city" id="" placeholder='City' onChange={this.cityValue}/>

                    <input style={color} className = "create-course-input" type="text" name="zip" id="" placeholder='Zip Code' onChange = {this.zipValue}/>
                    <textarea style={color} className = "create-course-input-text-box" placeholder="Description" name="" id="" cols="50" rows="10" onChange={this.descriptionValue}></textarea>
                    <br/>
                    <input className = "create-course-input-button"type="button" value="Back" onClick={this.props.createCourse}/>
                    <input className = "create-course-input-button"type="button" value="Create Course" onClick={this.createCourse}/>
                </div>
            )
        }
    }
}

export default CreateCourseForm;
