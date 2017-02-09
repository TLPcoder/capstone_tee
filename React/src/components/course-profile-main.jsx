import React, {Component} from 'react';
import MainNav from './nav-main';
import Comments from './comments';

class CourseProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseData: []
        };
        this.getCourse = this.getCourse.bind(this);
        this.getUser = this.getUser.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.getCourse();
    }
    getCourse() {
        fetch(`http://localhost:3000/course/${this.props.params.id}/comments`).then((promise) => {
            return promise.json();
        }).then((json) => {
            console.log(json);
            this.setState({
                courseData: json
            });
        });
    }
    getUser() {
        var data = sessionStorage.getItem('golfMember');
        return data;
    }
    addToFavorites() {
        console.log(this.state);
        var user_id = this.getUser();
        var course_id = this.state.courseData[0].id;
        fetch(`http://localhost:3000/user/favorite`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({user_id: user_id, course_id: course_id})
        }).then((res) => {
            return res.json();
        }).then((resData) => {
            console.log(resData);
            alert(`${this.state.courseData[0].name} has been added to your favorites`);
            this.props.addedFavorite();
        }).catch(function(res) {
            console.log(res);
        });
    }
    render() {
        console.log("hello there", this.state.courseData);
        var margin = {
            marginTop: '100px'
        };
        var comments = this.state.courseData.map((commentInfo)=>{
            console.log("comments here", commentInfo);
            return <Comments comments={commentInfo}/>
        });
        var rating = 0;
        if (this.state.courseData.length) {
            console.log("help", this.state.courseData[0].image)
            return (
                <div>
                    <div>
                        <MainNav/>
                    </div>
                    <div style = {margin}>
                        <div>
                            <img src={this.state.courseData[0].image} alt="" height="300px" width = "300px"/>
                        </div>
                        <div>
                            <h3>{this.state.courseData[0].name}</h3>
                            <p>{this.state.courseData[0].state}</p>
                            <p>{this.state.courseData[0].city}</p>
                            <p>{this.state.courseData[0].address}</p>
                            <input type="button" value = "Add to Favorites" onClick={this.addToFavorites}/>
                        </div>
                        <div>
                            <p>{this.state.courseData[0].description}</p>
                        </div>
                        <div>{comments}</div>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}
export default CourseProfile;
