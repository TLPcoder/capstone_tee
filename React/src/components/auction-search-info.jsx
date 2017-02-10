'use strict';
import React, {Component} from 'react';
import ReactSelectize from "react-selectize";
var SimpleSelect = ReactSelectize.SimpleSelect;
import Allstate from './states';
import Countries from './countries';

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
            courseName: {
                name: null
            },
            courseData: [],
            courses: []
        };
        this.radioButton = this.radioButton.bind(this);
        this.radioButtonSearchBar = this.radioButtonSearchBar.bind(this);
        this.zipCodeRadius = this.zipCodeRadius.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        this.activateSort = this.activateSort.bind(this);
        this.logChange = this.logChange.bind(this);
        this.getCourseData = this.getCourseData.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
        this.getCourses = this.getCourses.bind(this);
        this.setState = this.setState.bind(this);
        this.radioButtonSearchBarText = this.radioButtonSearchBarText.bind(this);
        this.zipDistance = this.zipDistance.bind(this);
        this.getCourses(`http://localhost:3000/course`);
        this.getCourseData();

    }
    getCourses(url) {
        fetch(url).then((promise) => {
            return promise.json();
        }).then((json) => {
            this.setState({
                priceSort: {
                    run: this.state.priceSort.run,
                    type: this.state.priceSort.type
                },
                location: {
                    run: this.state.location.run,
                    type: this.state.location.type,
                    radius: this.state.location.radius,
                    value: this.state.location.value
                },
                courseName: {
                    name: this.state.courseName.name
                },
                courseData: this.state.courseData,
                courses: json
            });
        });
    }
    radioButton(event) {
        console.log("radio button", event.target.value);
        var value;
        var run;
        if (event.target.value === 'default') {
            value = null;
            run = false;
        } else {
            value = event.target.value;
            run = true;
        }
        this.setState({
            priceSort: {
                run: this.state.priceSort.run,
                type: this.state.priceSort.type
            },
            location: {
                run: run,
                type: value,
                radius: this.state.location.radius,
                value: this.state.location.value
            },
            courseName: {
                name: this.state.courseName.name
            },
            courseData: this.state.courseData,
            courses: this.state.courses
        });

    }
    radioButtonSearchBarText(event) {
        console.log(event.target.value);
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
            courseName: {
                name: this.state.courseName.name
            },
            courseData: this.state.courseData,
            courses: this.state.courses
        });
    }
    zipDistance(value) {
        console.log('hello', value);
        this.setState({
            priceSort: {
                run: this.state.priceSort.run,
                type: this.state.priceSort.type
            },
            location: {
                run: true,
                type: this.state.location.type,
                value: this.state.location.value,
                radius: value.value
            },
            courseName: {
                name: this.state.courseName.name
            },
            courseData: this.state.courseData,
            courses: this.state.courses
        });
    }
    radioButtonSearchBar(event) {
        console.log("radio bar", value);
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
            courseName: {
                name: this.state.courseName.name
            },
            courseData: this.state.courseData,
            courses: this.state.courses
        });
    }
    zipCodeRadius(value) {
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
                radius: value.value
            },
            courseName: {
                name: this.state.courseName.name
            },
            courseData: this.state.courseData,
            courses: this.state.courses
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
            courseName: {
                name: this.state.courseName.name
            },
            courseData: this.state.courseData,
            courses: this.state.courses
        });
    }
    dateChange(event) {
        console.log(event.target.value);
        this.setState({
            priceSort: {
                run: this.state.priceSort.run,
                type: this.state.priceSort.type
            },
            location: {
                run: true,
                type: this.state.location.type,
                value: this.state.location.value,
                radius: this.state.location.radius
            },
            courseName: {
                name: this.state.courseName.name
            },
            courseData: this.state.courseData,
            courses: this.state.courses
        });
    }
    updateCourse(value) {
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
            courseName: {
                name: value.value
            },
            courseData: this.state.courseData,
            courses: this.state.courses
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
            courseName: {
                name: val.value
            },
            courseData: this.state.courseData,
            courses: this.state.courses
        });
    }
    getCourseData() {
        fetch(`http://localhost:3000/auction`).then((promise) => {
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
                courseName: {
                    name: this.state.courseName.name
                },
                courseData: json,
                courses: this.state.courses
            });
        });
    }
    submitSearch(event) {
        this.setState({
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
            courseName: {
                name: null
            },
            courseData: this.state.courseData,
            courses: this.state.courses
        });
        console.log("event", event);
        event.preventDefault();

        this.props.updateSearchData(this.state);
    }
    render() {
        if (this.props.courseSearch) {
            var courses = this.state.courses.map((course) => {
                return {value: course.id, label: course.name};
            });
        }
        if (this.props.run) {
            var auctionCourses = this.state.courseData.map((course) => {
                return {label: course.name, value: course.course_id};
            });
        }
        if (this.state.location.type === 'state') {
            console.log('state');
            var states = Allstate();
        }
        if (this.state.location.type === 'country') {
            console.log('country');
            var countries = Countries();
        }
        if (this.state.location.type === 'zip') {
            var zip = ['10', '20', '30'].map((miles) => {
                return {label: miles, value: miles};
            });
        }
        var size = {
            width:'100px',
            top:'5px',
            left:'145px',
            color:'brown'
        }
        var color = {
            color:'brown'
        }
        if (this.props.courseSearch && this.state.courses.length && this.state.location.type === 'zip') {
            return (
                <div className="search-courses-params">
                    <form>
                        <input className="auction-search-inputs" type="radio" name='location' value='default' onClick ={this.radioButton}/>Default
                        <input className="auction-search-inputs" type="radio" name='location' value='country' onClick ={this.radioButton}/>Country
                        <input className="auction-search-inputs" type="radio" name='location' value='state' onClick ={this.radioButton}/>State
                        <input className="auction-search-inputs" type="radio" name='location' value='city' onClick ={this.radioButton}/>City
                        <input className="auction-search-inputs" type="radio" name='location' value='zip' onClick ={this.radioButton}/>Zip
                        <input className="search-zip" type="text" onChange={this.radioButtonSearchBarText} placeholder={this.state.location.type}/>
                        <SimpleSelect style={size} onValueChange={this.zipDistance} options={zip} placeholder="Select a Distance"></SimpleSelect>
                        <input type="submit" className="submit-search-button" onClick={this.submitSearch}/>
                    </form>
                </div>
            )
            // <SimpleSelect style={color} onValueChange={this.zipCodeRadius} options={zipDitance} placeholder="Select a Distance"></SimpleSelect>

        } else if (this.props.courseSearch && this.state.courses.length && this.state.location.type === 'country') {
            return (
                <div className="search-courses-params">
                    <form>
                        <input className="auction-search-inputs" type="radio" name='location' value='default' onClick ={this.radioButton}/>Default
                        <input className="auction-search-inputs" type="radio" name='location' value='country' onClick ={this.radioButton}/>Country
                        <input className="auction-search-inputs" type="radio" name='location' value='state' onClick ={this.radioButton}/>State
                        <input className="auction-search-inputs" type="radio" name='location' value='city' onClick ={this.radioButton}/>City
                        <input className="auction-search-inputs" type="radio" name='location' value='zip' onClick ={this.radioButton}/>Zip
                        <SimpleSelect style={color} onValueChange={this.radioButtonSearchBar} options={countries} placeholder="Select a Country"></SimpleSelect>
                        <input type="submit" className="submit-search-button" onClick={this.submitSearch}/>
                    </form>
                </div>
            )
        } else if (this.props.courseSearch && this.state.courses.length && this.state.location.type === 'state') {
            return (
                <div className="search-courses-params">
                    <form>
                        <input className="auction-search-inputs" type="radio" name='location' value='default' onClick ={this.radioButton}/>Default
                        <input className="auction-search-inputs" type="radio" name='location' value='country' onClick ={this.radioButton}/>Country
                        <input className="auction-search-inputs" type="radio" name='location' value='state' onClick ={this.radioButton}/>State
                        <input className="auction-search-inputs" type="radio" name='location' value='city' onClick ={this.radioButton}/>City
                        <input className="auction-search-inputs" type="radio" name='location' value='zip' onClick ={this.radioButton}/>Zip
                        <SimpleSelect style={color} onValueChange={this.radioButtonSearchBar} options={states} placeholder="Select a State"></SimpleSelect>
                        <input type="submit" className="submit-search-button" onClick={this.submitSearch}/>
                    </form>
                </div>
            )
        } else if (this.props.courseSearch && this.state.courses.length && this.state.location.type === 'city') {
            return (
                <div className="search-courses-params">
                    <form>
                        <input className="auction-search-inputs" type="radio" name='location' value='default' onClick ={this.radioButton}/>Default
                        <input className="auction-search-inputs" type="radio" name='location' value='country' onClick ={this.radioButton}/>Country
                        <input className="auction-search-inputs" type="radio" name='location' value='state' onClick ={this.radioButton}/>State
                        <input className="auction-search-inputs" type="radio" name='location' value='city' onClick ={this.radioButton}/>City
                        <input className="auction-search-inputs" type="radio" name='location' value='zip' onClick ={this.radioButton}/>Zip
                        <input className="search-zip" type="text" onChange={this.radioButtonSearchBarText} placeholder={this.state.location.type}/>
                        <input type="submit" className="submit-search-button" onClick={this.submitSearch}/>
                    </form>
                </div>
            )
        } else if (this.props.courseSearch && this.state.courses.length) {
            return (
                <div className="search-courses-params">
                    <form>
                        <input className="auction-search-inputs" type="radio" name='location' value='default' onClick ={this.radioButton}/>Default
                        <input className="auction-search-inputs" type="radio" name='location' value='country' onClick ={this.radioButton}/>Country
                        <input className="auction-search-inputs" type="radio" name='location' value='state' onClick ={this.radioButton}/>State
                        <input className="auction-search-inputs" type="radio" name='location' value='city' onClick ={this.radioButton}/>City
                        <input className="auction-search-inputs" type="radio" name='location' value='zip' onClick ={this.radioButton}/>Zip
                        <SimpleSelect style={color} onValueChange={this.updateCourse} options={courses} placeholder="Select a Course"></SimpleSelect>
                        <input type="submit" className="submit-search-button" onClick={this.submitSearch}/>
                    </form>
                </div>
            )
        } else if (this.state.location.type === 'zip') {
            return (
                <div>
                    <form>
                        <input className="auction-search-inputs" type="radio" name='location' value='default' onClick ={this.radioButton}/>Default
                        <input className="auction-search-inputs" type="radio" name='location' value='country' onClick ={this.radioButton}/>Country
                        <input className="auction-search-inputs" type="radio" name='location' value='state' onClick ={this.radioButton}/>State
                        <input className="auction-search-inputs" type="radio" name='location' value='city' onClick ={this.radioButton}/>City
                        <input className="auction-search-inputs" type="radio" name='location' value='zip' onClick ={this.radioButton}/>Zip
                        <input className="search-zip" type="text" onChange={this.radioButtonSearchBarText} placeholder={this.state.location.type}/>
                        <br/>
                        <SimpleSelect style={size}onValueChange={this.zipDistance} options={zip} placeholder="Select a Distance"></SimpleSelect>
                        <br/>
                        <input type="submit" value = "Search"className="submit-search-button" onClick={this.submitSearch}/>
                        <input type="button" value = "Your Auctions" className="submit-search-button" onClick={this.props.yourAuctions}/>
                    </form>
                </div>
            )
            // <SimpleSelect style={color} onValueChange={this.zipCodeRadius} options={zipDitance} placeholder="Select a Distance"></SimpleSelect>
        } else if (this.state.courseData && this.state.location.type === 'country') {
            return (
                <div>
                    <form>
                        <input className="auction-search-inputs" type="radio" name='location' value='default' onClick ={this.radioButton}/>Default
                        <input className="auction-search-inputs" type="radio" name='location' value='country' onClick ={this.radioButton}/>Country
                        <input className="auction-search-inputs" type="radio" name='location' value='state' onClick ={this.radioButton}/>State
                        <input className="auction-search-inputs" type="radio" name='location' value='city' onClick ={this.radioButton}/>City
                        <input className="auction-search-inputs" type="radio" name='location' value='zip' onClick ={this.radioButton}/>Zip
                        <SimpleSelect style={color} onValueChange={this.radioButtonSearchBar} options={countries} placeholder="Select a Country"></SimpleSelect>
                        <input type="submit" value = "Search"className="submit-search-button" onClick={this.submitSearch}/>
                        <input type="button" value = "Your Auctions" className="submit-search-button" onClick={this.props.yourAuctions}/>
                    </form>
                </div>
            )
        } else if (this.state.courseData && this.state.location.type === 'state') {
            return (
                <div>
                    <form>
                        <input className="auction-search-inputs" type="radio" name='location' value='default' onClick ={this.radioButton}/>Default
                        <input className="auction-search-inputs" type="radio" name='location' value='country' onClick ={this.radioButton}/>Country
                        <input className="auction-search-inputs" type="radio" name='location' value='state' onClick ={this.radioButton}/>State
                        <input className="auction-search-inputs" type="radio" name='location' value='city' onClick ={this.radioButton}/>City
                        <input className="auction-search-inputs" type="radio" name='location' value='zip' onClick ={this.radioButton}/>Zip
                        <SimpleSelect style={color} onValueChange={this.radioButtonSearchBar} options={states} placeholder="Select a Course"></SimpleSelect>
                        <input type="submit" value = "Search"className="submit-search-button" onClick={this.submitSearch}/>
                        <input type="button" value = "Your Auctions" className="submit-search-button" onClick={this.props.yourAuctions}/>
                    </form>
                </div>
            )
        } else if (this.state.courseData && this.state.location.type === 'city') {
            return (
                <div>
                    <form>
                        <input className="auction-search-inputs" type="radio" name='location' value='default' onClick ={this.radioButton}/>Default
                        <input className="auction-search-inputs" type="radio" name='location' value='country' onClick ={this.radioButton}/>Country
                        <input className="auction-search-inputs" type="radio" name='location' value='state' onClick ={this.radioButton}/>State
                        <input className="auction-search-inputs" type="radio" name='location' value='city' onClick ={this.radioButton}/>City
                        <input className="auction-search-inputs" type="radio" name='location' value='zip' onClick ={this.radioButton}/>Zip
                        <input className="search-zip" type="text" onChange={this.radioButtonSearchBarText} placeholder={this.state.location.type}/>
                        <br/>
                        <input type="submit" value = "Search"className="submit-search-button" onClick={this.submitSearch}/>
                        <input type="button" value = "Your Auctions" className="submit-search-button" onClick={this.props.yourAuctions}/>
                    </form>
                </div>
            )
        } else if (!this.props.courseSearch && this.state.courseData) {
            return (
                <div>
                    <form>
                        <input className="auction-search-inputs" type="radio" name='location' value='default' onClick ={this.radioButton}/>Default
                        <input className="auction-search-inputs" type="radio" name='location' value='country' onClick ={this.radioButton}/>Country
                        <input className="auction-search-inputs" type="radio" name='location' value='state' onClick ={this.radioButton}/>State
                        <input className="auction-search-inputs" type="radio" name='location' value='city' onClick ={this.radioButton}/>City
                        <input className="auction-search-inputs" type="radio" name='location' value='zip' onClick ={this.radioButton}/>Zip
                        <SimpleSelect style={color} onValueChange={this.updateCourse} options={auctionCourses} placeholder="Select a Course"></SimpleSelect>
                        <input type="submit" value = "Search"className="submit-search-button" onClick={this.submitSearch}/>
                        <input type="button" value = "Your Auctions" className="submit-search-button" onClick={this.props.yourAuctions}/>
                    </form>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}
export default SearchInfo;
