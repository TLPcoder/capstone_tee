'use strict';
import React, {Component} from 'react';
import Select from 'react-select';

class SearchInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            priceSort: {
                run: false,
                type: null
            },
            location: {
                run: false,
                type: null,
                value: null,
                radius: null
            },
            date: {
                run: false,
                time: null
            },
            courseName: {
                name: null
            },
            courseData: []
        };
        this.radioButton = this.radioButton.bind(this);
        this.radioButtonSearchBar = this.radioButtonSearchBar.bind(this);
        this.zipCodeRadius = this.zipCodeRadius.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        this.activateSort = this.activateSort.bind(this);
        this.logChange = this.logChange.bind(this);
        this.getCourseData = this.getCourseData.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
        this.getCourseData();
    }
    radioButton(event) {
        console.log("radio button", event.target.value);
        this.setState({
            priceSort: {
                run: this.state.priceSort.run,
                type: this.state.priceSort.type
            },
            location: {
                run: true,
                type: event.target.value,
                radius: this.state.location.radius
            },
            date: {
                run: false,
                time: null
            },
            courseName: {
                name: this.state.courseName.name
            },
            courseData: this.state.courseData
        });
    }
    radioButtonSearchBar(event) {
        console.log("radio bar", event.target.value);
        this.setState({
            priceSort: {
                run: this.state.priceSort.run,
                type: this.state.priceSort.type
            },
            location: {
                run: true,
                type: this.state.location.type,
                value: event.target.value,
                radius: this.state.location.radius
            },
            date: {
                run: false,
                time: null
            },
            courseName: {
                name: this.state.courseName.name
            },
            courseData: this.state.courseData
        });
    }
    zipCodeRadius(event) {
        console.log("zip value", event.target.value);
        this.setState({
            priceSort: {
                run: this.state.priceSort.run,
                type: this.state.priceSort.type
            },
            location: {
                run: true,
                type: this.state.location.type,
                value: this.state.location.value,
                radius: event.target.value
            },
            date: {
                run: false,
                time: null
            },
            courseName: {
                name: this.state.courseName.name
            },
            courseData: this.state.courseData
        });
    }
    activateSort(event) {
        console.log("zip value", event.target.value);
        this.setState({
            priceSort: {
                run: true,
                type: event.target.value
            },
            location: {
                run: true,
                type: this.state.location.type,
                value: this.state.location.value,
                radius: this.state.location.radius
            },
            date: {
                run: false,
                time: null
            },
            courseName: {
                name: this.state.courseName.name
            },
            courseData: this.state.courseData
        });
    }
    dateChange(event) {
        console.log("date", event.target.value);
    }
    updateCourse(event) {
        this.setState({
            priceSort: {
                run: true,
                type: this.state.priceSort.type
            },
            location: {
                run: true,
                type: this.state.location.type,
                value: this.state.location.value,
                radius: this.state.location.radius
            },
            date: {
                run: false,
                time: null
            },
            courseName: {
                name: event.target.value
            },
            courseData: this.state.courseData
        });
    }
    logChange(val) {
        console.log("Selected: " + val.value);
        this.setState({
            priceSort: {
                run: true,
                type: this.state.priceSort.type
            },
            location: {
                run: true,
                type: this.state.location.type,
                value: this.state.location.value,
                radius: this.state.location.radius
            },
            date: {
                run: false,
                time: null
            },
            courseName: {
                name: val.value
            },
            courseData: this.state.courseData
        });
    }
    getCourseData() {
        fetch(`http://localhost:3000/auction/course`).then((promise) => {
            return promise.json();
        }).then((json) => {
            this.setState({
                priceSort: {
                    run: true,
                    type: this.state.priceSort.type
                },
                location: {
                    run: true,
                    type: this.state.location.type,
                    value: this.state.location.value,
                    radius: this.state.location.radius
                },
                date: {
                    run: false,
                    time: null
                },
                courseName: {
                    name: this.state.courseName.name
                },
                courseData: json
            });
        });
    }
    submitSearch(event) {
        event.preventDefault();
        this.props.updateSearchData(this.state);
    }
    render() {
        var json = this.state.courseData;
        // console.log(json);
        // var options = [];
        // json.forEach(function(element) {
        //     options.push({value: element.name, label: element.name});
        // });
        // console.log("iotsdflnsdflkd", options);
        if (this.state.location.type === 'zip') {
            return (
                <div>
                    <form>
                        <input type="radio" name='location' value='country' onClick ={this.radioButton}/>Country
                        <input type="radio" name='location' value='state' onClick ={this.radioButton}/>State
                        <input type="radio" name='location' value='city' onClick ={this.radioButton}/>City
                        <input type="radio" name='location' value='zip' onClick ={this.radioButton}/>Zip
                        <input type="text" onChange={this.radioButtonSearchBar} placeholder={this.state.location.type}/>
                        <select onChange={this.zipCodeRadius} name="distance" id="">
                            <option value="0">Select Distance</option>
                            <option value="10">10 Miles</option>
                            <option value="20">20 Miles</option>
                            <option value="30">30 Miles</option>
                        </select>
                        <input type="radio" name="sort" value='asc' onClick={this.activateSort}/>Sort Asc Price
                        <input type="radio" name="sort" value='desc' onClick={this.activateSort}/>Sort Desc Price
                        <input type="date" name="date" id=""/>
                        <input type="text" name="course" onChange={this.updateCourse} placeholder="course name"/>
                        <input type="submit" onClick={this.submitSearch}/>
                    </form>
                </div>
            )
        }
            return (
                <div>
                    <form>
                        <input type="radio" name='location' value='country' onClick ={this.radioButton}/>Country
                        <input type="radio" name='location' value='state' onClick ={this.radioButton}/>State
                        <input type="radio" name='location' value='city' onClick ={this.radioButton}/>City
                        <input type="radio" name='location' value='zip' onClick ={this.radioButton}/>Zip
                        <input type="text" onChange={this.radioButtonSearchBar} placeholder={this.state.location.type}/>
                        <input type="radio" name="sort" value='asc' onClick={this.activateSort}/>Sort Asce Price
                        <input type="radio" name="sort" value='desc' onClick={this.activateSort}/>Sort Desc Price
                        <input type="date" name="date" id="" onChange={this.dateChange}/>
                        <input type="text" name="course" onChange={this.updateCourse} placeholder="course name"/>

                        <input type="submit" onClick={this.submitSearch}/>
                    </form>
                </div>
            )
    }
}
export default SearchInfo;



// <Select ref="stateSelect" autofocus options={options} simpleValue clearable={true} name="selected-state" value={this.state.courseName.name} onChange={this.logChange} searchable={true}/>
