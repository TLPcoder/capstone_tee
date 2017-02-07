'use strict';
import React, {Component} from 'react';
import ReactSelectize from "react-selectize";
var SimpleSelect = ReactSelectize.SimpleSelect;

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
                date: {
                    run: false,
                    time: null
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
        this.setState({
            priceSort: {
                run: this.state.priceSort.run,
                type: this.state.priceSort.type
            },
            location: {
                run: true,
                type: event.target.value,
                radius: this.state.location.radius,
                value: this.state.location.value
            },
            date: {
                run: false,
                time: null
            },
            courseName: {
                name: this.state.courseName.name
            },
            courseData: this.state.courseData,
            courses: this.state.courses
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
            date: {
                run: false,
                time: null
            },
            courseName: {
                name: this.state.courseName.name
            },
            courseData: this.state.courseData,
            courses: this.state.courses
        });
        console.log(this.state);
        if(this.state.location.type === 'zip'){
            console.log("yes it works :)");
            this.getCourses(`http://localhost:3000/course/zip/${this.state.location.value}/${event.target.value}`);
        }
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
            courseData: this.state.courseData,
            courses: this.state.courses
        });
    }
    dateChange(event) {
        console.log("date", event.target.value);
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
            date: {
                run: false,
                time: null
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
            date: {
                run: false,
                time: null
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
                date: {
                    run: false,
                    time: null
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

        console.log("true",this.props.courseSearch && this.state.courses.length && this.state.location.type === 'zip');
        if (this.props.courseSearch && this.state.courses.length && this.state.location.type === 'zip') {
           return (
               <div style={margin}>
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
                       <SimpleSelect onValueChange={this.updateCourse} options={courses} placeholder="Select a Course"></SimpleSelect>
                       <input type="submit" onClick={this.submitSearch}/>
                   </form>
               </div>
           )
       }else if (this.props.courseSearch && this.state.courses.length) {
            return (
                <div style={margin}>
                    <form>
                        <input type="radio" name='location' value='country' onClick ={this.radioButton}/>Country
                        <input type="radio" name='location' value='state' onClick ={this.radioButton}/>State
                        <input type="radio" name='location' value='city' onClick ={this.radioButton}/>City
                        <input type="radio" name='location' value='zip' onClick ={this.radioButton}/>Zip
                        <input type="text" onChange={this.radioButtonSearchBar} placeholder={this.state.location.type}/>
                        <SimpleSelect onValueChange={this.updateCourse} options={courses} placeholder="Select a Course"></SimpleSelect>
                        <input type="submit" onClick={this.submitSearch}/>
                    </form>
                </div>
            )
        } else if (this.state.location.type === 'zip') {
            return (
                <div style={margin}>
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
                        <SimpleSelect onValueChange={this.updateCourse} options={auctionCourses} placeholder="Select a Course"></SimpleSelect>
                        <input type="submit" onClick={this.submitSearch}/>
                    </form>
                </div>
            )
        } else if (!this.props.courseSearch && this.state.courseData) {
            return (
                <div style={margin}>
                    <form>
                        <input type="radio" name='location' value='country' onClick ={this.radioButton}/>Country
                        <input type="radio" name='location' value='state' onClick ={this.radioButton}/>State
                        <input type="radio" name='location' value='city' onClick ={this.radioButton}/>City
                        <input type="radio" name='location' value='zip' onClick ={this.radioButton}/>Zip
                        <input type="text" onChange={this.radioButtonSearchBar} placeholder={this.state.location.type}/>
                        <input type="radio" name="sort" value='asc' onClick={this.activateSort}/>Sort Asce Price
                        <input type="radio" name="sort" value='desc' onClick={this.activateSort}/>Sort Desc Price
                        <input type="date" name="date" id="" onChange={this.dateChange}/>
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
