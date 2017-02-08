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
        if(event.target.value === 'default'){
            value = null;
            run = false;
        }else{
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
    radioButtonSearchBarText(event){
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
    radioButtonSearchBar(value) {
        console.log("radio bar", value);
        this.setState({
            priceSort: {
                run: this.state.priceSort.run,
                type: this.state.priceSort.type
            },
            location: {
                run: true,
                type: this.state.location.type,
                value: value.value,
                radius: this.state.location.radius
            },
            courseName: {
                name: this.state.courseName.name
            },
            courseData: this.state.courseData,
            courses: this.state.courses
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
        var margin = {
            marginTop: '100px'
        };
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
        if (this.props.courseSearch && this.state.courses.length && this.state.location.type === 'zip') {
            return (
                <div className="search-courses-params" style={margin}>
                    <form>
                        <input type="radio" name='location' className ="radio" value='default' onClick ={this.radioButton}/>Default
                        <input type="radio" name='location' className ="radio" value='country' onClick ={this.radioButton}/>Country
                        <input type="radio" name='location' className ="radio" value='state' onClick ={this.radioButton}/>State
                        <input type="radio" name='location' className ="radio" value='city' onClick ={this.radioButton}/>City
                        <input type="radio" name='location' className ="radio" value='zip' onClick ={this.radioButton}/>Zip
                        <input type="text" onChange={this.radioButtonSearchBarText} placeholder={this.state.location.type}/>
                        <select onChange={this.zipCodeRadius} name="distance" id="">
                            <option value="0">Select Distance</option>
                            <option value="10">10 Miles</option>
                            <option value="20">20 Miles</option>
                            <option value="30">30 Miles</option>
                        </select>
                        <input type="submit" onClick={this.submitSearch}/>
                    </form>
                </div>
            )

        } else if (this.props.courseSearch && this.state.courses.length && this.state.location.type === 'country') {
            return (
                <div className="search-courses-params" style={margin}>
                    <form>
                        <input type="radio" name='location' className ="radio" value='default' onClick ={this.radioButton}/>Default
                        <input type="radio" name='location' className ="radio" value='country' onClick ={this.radioButton}/>Country
                        <input type="radio" name='location' className ="radio" value='state' onClick ={this.radioButton}/>State
                        <input type="radio" name='location' className ="radio" value='city' onClick ={this.radioButton}/>City
                        <input type="radio" name='location' className ="radio" value='zip' onClick ={this.radioButton}/>Zip
                        <SimpleSelect onValueChange={this.radioButtonSearchBar} options={countries} placeholder="Select a Country"></SimpleSelect>
                        <input type="submit" onClick={this.submitSearch}/>
                    </form>
                </div>
            )
        } else if (this.props.courseSearch && this.state.courses.length && this.state.location.type === 'state') {
            return (
                <div className="search-courses-params" style={margin}>
                    <form>
                        <input type="radio" name='location' className ="radio" value='default' onClick ={this.radioButton}/>Default
                        <input type="radio" name='location' className ="radio" value='country' onClick ={this.radioButton}/>Country
                        <input type="radio" name='location' className ="radio" value='state' onClick ={this.radioButton}/>State
                        <input type="radio" name='location' className ="radio" value='city' onClick ={this.radioButton}/>City
                        <input type="radio" name='location' className ="radio" value='zip' onClick ={this.radioButton}/>Zip
                        <SimpleSelect onValueChange={this.radioButtonSearchBar} options={states} placeholder="Select a State"></SimpleSelect>
                        <input type="submit" onClick={this.submitSearch}/>
                    </form>
                </div>
            )
        } else if (this.props.courseSearch && this.state.courses.length && this.state.location.type === 'city') {
            return (
                <div className="search-courses-params" style={margin}>
                    <form>
                        <input type="radio" name='location' className ="radio" value='default' onClick ={this.radioButton}/>Default
                        <input type="radio" name='location' className ="radio" value='country' onClick ={this.radioButton}/>Country
                        <input type="radio" name='location' className ="radio" value='state' onClick ={this.radioButton}/>State
                        <input type="radio" name='location' className ="radio" value='city' onClick ={this.radioButton}/>City
                        <input type="radio" name='location' className ="radio" value='zip' onClick ={this.radioButton}/>Zip
                        <input type="text" onChange={this.radioButtonSearchBarText} placeholder={this.state.location.type}/>
                        <input type="submit" onClick={this.submitSearch}/>
                    </form>
                </div>
            )
        }else if (this.props.courseSearch && this.state.courses.length) {
            return (
                <div className="search-courses-params" style={margin}>
                    <form>
                        <input type="radio" name='location' className ="radio" value='default' onClick ={this.radioButton}/>Default
                        <input type="radio" name='location' className ="radio" value='country' onClick ={this.radioButton}/>Country
                        <input type="radio" name='location' className ="radio" value='state' onClick ={this.radioButton}/>State
                        <input type="radio" name='location' className ="radio" value='city' onClick ={this.radioButton}/>City
                        <input type="radio" name='location' className ="radio" value='zip' onClick ={this.radioButton}/>Zip
                        <SimpleSelect onValueChange={this.updateCourse} options={courses} placeholder="Select a Course"></SimpleSelect>
                        <input type="submit" onClick={this.submitSearch}/>
                    </form>
                </div>
            )
        } else if (this.state.location.type === 'zip') {
            return (
                <div style={margin}>
                    <form>
                        <input type="radio" name='location' className ="radio" value='default' onClick ={this.radioButton}/>Default
                        <input type="radio" name='location' className ="radio" value='country' onClick ={this.radioButton}/>Country
                        <input type="radio" name='location' className ="radio" value='state' onClick ={this.radioButton}/>State
                        <input type="radio" name='location' className ="radio" value='city' onClick ={this.radioButton}/>City
                        <input type="radio" name='location' className ="radio" value='zip' onClick ={this.radioButton}/>Zip
                        <input type="text" onChange={this.radioButtonSearchBarText} placeholder={this.state.location.type}/>
                        <select onChange={this.zipCodeRadius} name="distance" id="">
                            <option value="0">Select Distance</option>
                            <option value="10">10 Miles</option>
                            <option value="20">20 Miles</option>
                            <option value="30">30 Miles</option>
                        </select>
                        <input type="radio" name="sort" value='asc' onClick={this.activateSort}/>Sort Asc Price
                        <input type="radio" name="sort" value='desc' onClick={this.activateSort}/>Sort Desc Price
                        <input type="submit" onClick={this.submitSearch}/>
                    </form>
                </div>
            )
        } else if (this.state.courseData && this.state.location.type === 'country') {
            return (
                <div style={margin}>
                    <form>
                        <input type="radio" name='location' className ="radio" value='default' onClick ={this.radioButton}/>Default
                        <input type="radio" name='location' className ="radio" value='country' onClick ={this.radioButton}/>Country
                        <input type="radio" name='location' className ="radio" value='state' onClick ={this.radioButton}/>State
                        <input type="radio" name='location' className ="radio" value='city' onClick ={this.radioButton}/>City
                        <input type="radio" name='location' className ="radio" value='zip' onClick ={this.radioButton}/>Zip
                        <SimpleSelect onValueChange={this.radioButtonSearchBar} options={countries} placeholder="Select a Country"></SimpleSelect>
                        <input type="submit" onClick={this.submitSearch}/>
                    </form>
                </div>
            )
        } else if (this.state.courseData && this.state.location.type === 'state') {
            return (
                <div style={margin}>
                    <form>
                        <input type="radio" name='location' className ="radio" value='default' onClick ={this.radioButton}/>Default
                        <input type="radio" name='location' className ="radio" value='country' onClick ={this.radioButton}/>Country
                        <input type="radio" name='location' className ="radio" value='state' onClick ={this.radioButton}/>State
                        <input type="radio" name='location' className ="radio" value='city' onClick ={this.radioButton}/>City
                        <input type="radio" name='location' className ="radio" value='zip' onClick ={this.radioButton}/>Zip
                        <SimpleSelect onValueChange={this.radioButtonSearchBar} options={states} placeholder="Select a Course"></SimpleSelect>
                        <input type="submit" onClick={this.submitSearch}/>
                    </form>
                </div>
            )
        } else if (this.state.courseData && this.state.location.type === 'city') {
            return (
                <div style={margin}>
                    <form>
                        <input type="radio" name='location' className ="radio" value='default' onClick ={this.radioButton}/>Default
                        <input type="radio" name='location' className ="radio" value='country' onClick ={this.radioButton}/>Country
                        <input type="radio" name='location' className ="radio" value='state' onClick ={this.radioButton}/>State
                        <input type="radio" name='location' className ="radio" value='city' onClick ={this.radioButton}/>City
                        <input type="radio" name='location' className ="radio" value='zip' onClick ={this.radioButton}/>Zip
                        <input type="text" onChange={this.radioButtonSearchBarText} placeholder={this.state.location.type}/>
                        <input type="submit" onClick={this.submitSearch}/>
                    </form>
                </div>
            )
        } else if (!this.props.courseSearch && this.state.courseData) {
            return (
                <div style={margin}>
                    <form>
                        <input type="radio" name='location' className ="radio" value='default' onClick ={this.radioButton}/>Default
                        <input type="radio" name='location' className ="radio" value='country' onClick ={this.radioButton}/>Country
                        <input type="radio" name='location' className ="radio" value='state' onClick ={this.radioButton}/>State
                        <input type="radio" name='location' className ="radio" value='city' onClick ={this.radioButton}/>City
                        <input type="radio" name='location' className ="radio" value='zip' onClick ={this.radioButton}/>Zip
                        <SimpleSelect onValueChange={this.updateCourse} options={auctionCourses} placeholder="Select a Course"></SimpleSelect>
                        <input type="submit" onClick={this.submitSearch}/>
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
